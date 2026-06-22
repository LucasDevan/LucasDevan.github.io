const cards = document.querySelectorAll('.skill-card');

function loadHeaderFooter() {
  const header  = `<h1><a href="index.html">My Developer Portfolio</a></h1>
                    <nav>
                      <a href="aboutMe.html">About</a>
                      <a href="projects.html">My Projects</a>
                      <a href="skills.html">My Skills</a>
                      <a href="miscellaneous.html">Miscellaneous</a>
                    </nav>`;

const footer = `<a class="btn" href="index.html">Go back to main Page</a>
    <p>&copy; 2026 My Developer Portfolio. All rights reserved.</p>`;

  document.getElementById("site-header").innerHTML=header;
document.getElementById("site-footer").innerHTML=footer;
}

function loadSubHeaderFooter() {
  const header  = `<h1><a href="../index.html">My Developer Portfolio</a></h1>
                    <nav>
                      <a href="../aboutMe.html">About</a>
                      <a href="../projects.html">My Projects</a>
                      <a href="../skills.html">My Skills</a>
                      <a href="../miscellaneous.html">Miscellaneous</a>
                    </nav>`;

  const footer =  `<a class="btn" href="../index.html">Go back to main Page</a>
    <p>&copy; 2026 My Developer Portfolio. All rights reserved.</p>`;

  document.getElementById("site-subheader").innerHTML=header;
  document.getElementById("site-subfooter").innerHTML=footer;
}

if (document.getElementById('site-header')) loadHeaderFooter();
if (document.getElementById('site-subheader')) loadSubHeaderFooter();


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

// Clickable project cards (works with cards tagged .clickable)
document.querySelectorAll('.card.clickable').forEach(card => {
  const href = card.dataset.href;
  if (!href) return;

  card.addEventListener('click', () => {
    window.location.href = href;
  });

  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.location.href = href;
    }
  });
});

document.querySelectorAll('.gallery-item').forEach(card => {
  const href = card.dataset.href;
  if (!href) return;

  card.addEventListener('click', () => {
    window.location.href = href;
  });

  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.location.href = href;
    }
  });
});