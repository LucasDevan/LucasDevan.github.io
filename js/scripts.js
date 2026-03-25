const cards = document.querySelectorAll('.skill-card');

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
  percentageEl = document.createElement('p');
  percentageEl.className = 'percentage';
  const nameElement = card.querySelector('p:not(.percentage)');
  if (nameElement) {
    nameElement.insertAdjacentElement('afterend', percentageEl);
  } else {
    card.appendChild(percentageEl);
  }
  percentageEl.textContent = `${percent}%`;
});