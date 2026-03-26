const cards = document.querySelectorAll('.skill-card');

function loadHeader() {
  const header  = `<h1>My Developer Portfolio</h1>
                    <nav>
                      <a href="index.html">Home</a>
                      <a href="aboutMe.html">About</a>
                      <a href="projects/projectsHub.html">My Projects</a>
                      <a href="skills.html">My Skills</a>
                      <a href="miscellaneous.html">Miscellaneous</a>
                    </nav>`;
  document.getElementById("site-header").innerHTML=header;
}

function loadSubHeader() {
  const header  = `<h1>My Developer Portfolio</h1>
                    <nav>
                      <a href="../index.html">Home</a>
                      <a href="../aboutMe.html">About</a>
                      <a href="projectsHub.html">My Projects</a>
                      <a href="../skills.html">My Skills</a>
                      <a href="../miscellaneous.html">Miscellaneous</a>
                    </nav>`;
  const footer =  `<a class="btn" href="../index.html">Go back to main Page</a>
    <p>&copy; 2026 My Developer Portfolio. All rights reserved.</p>`
  document.getElementById("site-subheader").innerHTML=header;
  document.getElementById("site-subfooter").innerHTML=footer;

}

if (document.getElementById('site-header')) loadHeader();
if (document.getElementById('site-subheader')) loadSubHeader();


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

