#include <Adafruit_PN532.h>
#include <ChainableLED.h>
#include <ArduinoBLE.h>
#include <ESP32Servo.h>
#include "FeatherShieldPinout.h"

Servo myservo;  // create servo object to control a servo

ChainableLED* led;
BLEService LockService("19B10000-E8F2-537E-4F6C-D104768A1214");  // Bluetooth® Low Energy Lock Service

// Bluetooth® Low Energy Lock Switch Characteristic - custom 128-bit UUID, read and writable by central
BLEBoolCharacteristic switchCharacteristic("19B10001-E8F2-537E-4F6C-D104768A1214", BLERead | BLEWrite | BLEWriteWithoutResponse);
BLEBoolCharacteristic movementCharacteristic("19B10002-E8F2-537E-4F6C-D104768A1214", BLERead);
BLEIntCharacteristic passwordCharacteristic("19B10003-E8F2-537E-4F6C-D104768A1214", BLEWrite | BLEWriteWithoutResponse);

int savedPassword = 0;
int givenPassword = 0;

void setup() {
  pinMode(A2, INPUT);
  pinMode(A4, INPUT);
  pinMode(D4, OUTPUT);
  pinMode(D5, OUTPUT);
  pinMode(A0, OUTPUT);
  myservo.setPeriodHertz(50);  // standard 50 hz servo
  myservo.attach(A0, 700, 2200);

  Serial.begin(9600);
  while (!Serial)
    ;

  // begin initialization
  if (!BLE.begin()) {
    Serial.println("starting Bluetooth® Low Energy module faiLock!");
    while (1)
      ;
  }

  // set advertised local name and service UUID:
  BLE.setLocalName("LOCKIN");
  BLE.setAdvertisedService(LockService);

  /*
  BLEDescriptor lockStateDescriptor("bool", "set and read lock state");
  switchCharacteristic.addDescriptor(lockStateDescriptor);
  BLEDescriptor movementDescriptor("bool", "read if lock has moved");
  movementCharacteristic.addDescriptor(movementDescriptor);
  */
  // set the initial value for the characteristics:
  switchCharacteristic.writeValue(0);
  movementCharacteristic.writeValue(0);
  passwordCharacteristic.writeValue(0);

  myservo.write(0);
  led = new ChainableLED(D4, D5, 1);
  led->setColorRGB(0, 255, 0, 0);

  // add the characteristic to the service
  LockService.addCharacteristic(switchCharacteristic);
  LockService.addCharacteristic(movementCharacteristic);
  LockService.addCharacteristic(passwordCharacteristic);

  // add service
  BLE.addService(LockService);

  // start advertising
  BLE.advertise();

  Serial.println("BLE lock Peripheral");
}

bool lock() {
  Serial.println("Lock off");
  myservo.write(0);  // unocked position
  led->setColorRGB(0, 255, 0, 0);
  return false;
}

bool unlock() {
  Serial.println("Lock on");
  myservo.write(180);  // Locked position
  led->setColorRGB(0, 0, 255, 0);
  return 1;
}

bool chooseLockState(bool locking) {
  if (locking) {
    return unlock();
  }
  return lock();
}

bool getPasswordCharacteristic() {
  if (passwordCharacteristic.written()) {
    // Récupérer la valeur envoyée
    const long val = passwordCharacteristic.value();

    // Logique d'assignation
    if (savedPassword == 0) {
      savedPassword = val;
      Serial.println("Mot de passe défini : ");
      return 0;
    } else {
      givenPassword = val;
      Serial.println("Mot de passe reçu : ");
      return 1;
    }
  }
  return 0;
}

void loop() {
  // listen for Bluetooth® Low Energy peripherals to connect:
  BLEDevice central = BLE.central();
  bool locked = 0;

  // if a central is connected to peripheral:
  if (central) {
    Serial.print("Connected to central: ");
    // print the central's MAC address:
    Serial.println(central.address());

    // while the central is still connected to peripheral:
    while (central.connected()) {
      BLE.poll();

      if (savedPassword == 0 || givenPassword != savedPassword) {
        if (getPasswordCharacteristic()) {
          Serial.println("got password");
          switchCharacteristic.writeValue(locked);
        }

        // if the remote device wrote to the characteristic,
        // use the value to control the lock:
      } else if (switchCharacteristic.written()) {
        if (switchCharacteristic.value() && !locked) {  // any value other than 0
          locked = unlock();
        } else if (locked) {  // a 0 value
          locked = lock();
        }
        delay(100);
      } else if (digitalRead(A2)) {
        Serial.println(digitalRead(A2));
      }
      movementCharacteristic.writeValue(!digitalRead(A4));
    }
  }
  // when the central disconnects, print it out:
  Serial.print("Disconnected from central: ");
  Serial.println(central.address());
  passwordCharacteristic.writeValue(0);
  givenPassword = 0;
}
