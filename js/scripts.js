const cards = document.querySelectorAll('.skill-card');

/*
function loadHeader() {
  var xhttp, elmnt;
  elmnt = document.getElementById("site-header");
  const file  = 'componants/header.html';
  if (file) {
      // Make an HTTP request using the attribute value as the file name: 
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          // Remove the attribute, and call this function once more: /
          elmnt.removeAttribute("site-header");
          loadHeader();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      // Exit the function: /
      return;
    }
}
if (document.getElementById('site-header')) loadHeader();
*/

cards.forEach(card => {
  const canvas = card.querySelector('canvas');
  const context = canvas.getContext('2d');
  const percent = parseInt(card.getAttribute('data-percent'), 10) || 0;

  const center = 50;
  const radius = 40;

  context.lineWidth = 8;

  // background circle
  context.strokeStyle = '#334155';
  context.beginPath();
  context.arc(center, center, radius, 0, 2 * Math.PI);
  context.stroke();

  // progress circle
  context.strokeStyle = '#38bdf8';
  context.beginPath();
  context.arc(center, center, radius, -Math.PI / 2, (2 * Math.PI * percent / 100) - Math.PI / 2);
  context.stroke();

  // percentage text underneath logo and name
  let percentageEl = card.querySelector('.percentage');
  if (!percentageEl) {
    percentageEl = document.createElement('p');
    percentageEl.className = 'percentage';
    const nameElement = card.querySelector('p:not(.percentage)');
    if (nameElement) {
      nameElement.insertAdjacentElement('afterend', percentageEl);
    } else {
      card.appendChild(percentageEl);
    }
  }
  percentageEl.textContent = `${percent}%`;
});

