const activities = [
    "Lire",
    "Écrire",
    "Dessiner",
    "Faire du sport",
    "Jouer d'un instrument",
    "Cuisiner",
    "Jouer à un jeu vidéo",
    "Trouver de meilleur activité pour cette liste"
];

const challenges = [
    "Sans ta main gauche",
    "Avec un oeil fermé",
];

const activity = document.getElementById("activity");
const challenge = document.getElementById("challenge");

const completedCountEl = document.getElementById("completedCount");
const failedCountEl = document.getElementById("failedCount");
const skipsCountEl = document.getElementById("skipsCount");

const counterElement = document.getElementById("counters");

const hardModeTitle = document.getElementById("hardModeTitle");
const hardModeButton = document.getElementById("hardModeButton");
const generateButton = document.getElementById("generateButton")
const successButton = document.getElementById("successButton");
const failButton = document.getElementById("failButton");
const skipButton = document.getElementById("skipButton")

let completed, failed, skips;
let currentChallenge = "", currentActivity = "";
let skipsMax = 999; //default value to be changed
let hardmode;

readFromFile();

console.log(currentChallenge);


function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function saveInfo() {
    if (skips === undefined || skips === null) {
        skips = 0;
    }
    const data = {
        completed: completed,
        failed: failed,
        skips: skips,
        currentChallenge: currentChallenge,
        currentActivity: currentActivity,
        hardmode: hardmode
    };

    localStorage.setItem("challengeData", JSON.stringify(data));
}

function readFromFile() {
    let data;
    try {
        data = localStorage.getItem("challengeData");
    } catch (error) {
        data = false;
        console.error("No data found in localStorage:", error);
    }

    if (data) {
        console.log("not first time");
        const parsed = JSON.parse(data);

        completed = parsed.completed || 0;
        failed = parsed.failed || 0;
        skips = parsed.skips;
        if (skips === undefined || skips === null) {
            skips = 5;
        }
        currentChallenge = parsed.currentChallenge || "";
        currentActivity = parsed.currentActivity || "";
        hardmode = parsed.hardmode || false;
        updateDisplay(0);

    } else {
        console.log("first time");
        completed = 0;
        failed = 0;
        skips = 5;
        currentChallenge = "";
        currentActivity = "";
        hardmode = false;
        updateDisplay(1);
    }

    completedCountEl.textContent = completed;
    failedCountEl.textContent = failed;
    skipsCountEl.textContent = skips;
    challenge.textContent = currentChallenge;
    activity.textContent = currentActivity;
}

function updateDisplay(firstTime = false) {
    if (firstTime) {
        generateButton.style.display = "block";
        hardModeButton.style.display = "none";
        hardModeTitle.style.display = "none";
        successButton.style.display = "none";
        failButton.style.display = "none";
        skipButton.style.display = "none";
        counterElement.style.display = "none";
    } else {
        generateButton.style.display = "none";
        hardModeButton.style.display = "inline-flex";
        hardModeTitle.style.display = "block";
        counterElement.style.display = "inline-flex";
        successButton.style.display = "block";
        failButton.style.display = "block";
        skipButton.style.display = "block";
    }
}

function incrementSkippsCounter() {
    if (hardmode) {
        if (skips <= skipsMax) {
            skips++;
            skipsCountEl.textContent = skips;
        }
    }
}

function generateActivity() {
    const act = randomItem(activities);
    activity.textContent = act;
    currentActivity = act;
    currentChallenge = "";
    if (hardmode) {
        generateChallenge()
    }
    console.log("generated");
}

function generateChallenge() {
    if (currentChallenge == "") {
        const chal = randomItem(challenges);
        challenge.textContent = chal;
        currentChallenge = chal;
    } else {
        challenge.textContent = currentChallenge;
        currentChallenge = currentChallenge;
    }
}

function resetData() {
    localStorage.removeItem("challengeData");
}

hardModeButton.addEventListener("click", () => {
    console.log("added changed");
    hardmode = !hardmode;
    if (hardmode) {
        hardModeButton.textContent = "ON";
        challenge.style.display = "block";
        if (challenge.textContent == "") {
            generateChallenge();
        }
    } else {
        hardModeButton.textContent = "OFF";
        challenge.style.display = "none";
        challenge.textContent = "";

    }
});

generateButton.addEventListener("click", () => {
    updateDisplay(0);
    generateActivity();
    saveInfo();
});

successButton.addEventListener("click", () => {
    completed++;
    completedCountEl.textContent = completed;
    generateActivity();
    incrementSkippsCounter();
    saveInfo();
});

failButton.addEventListener("click", () => {
    failed++;
    failedCountEl.textContent = failed;
    generateActivity();
    saveInfo();
});

skipButton.addEventListener("click", () => {
    if (skips > 0) {
        skips--;
        skipsCountEl.textContent = skips;
        generateActivity();
        saveInfo();
    }
});