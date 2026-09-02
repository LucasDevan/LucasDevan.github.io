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

function renderSkillStars(card){
  const rawValue = Number.parseInt(card.dataset.stars || '0', 10);
  const stars = Math.min(Math.max(rawValue, 0), 5);

  let starsWrap = card.querySelector('.skill-stars');
  if (!starsWrap) {
    starsWrap = document.createElement('div');
    starsWrap.className = 'skill-stars';
    const nameElement = card.querySelector('p');
    if (nameElement) {
      nameElement.insertAdjacentElement('afterend', starsWrap);
    } else {
      card.appendChild(starsWrap);
    }
  }

  starsWrap.innerHTML = '';

  for (let i = 1; i <= 5; i += 1) {
    const star = document.createElement('span');
    star.className = `skill-star${i <= stars ? '' : ' empty'}`;
    star.textContent = i <= stars ? '⭐' : '★';
    star.setAttribute('aria-label', `${i <= stars ? 'filled' : 'empty'} star`);
    starsWrap.appendChild(star);
  }
}

cards.forEach(card => {
  const canvas = card.querySelector('canvas');
  if (canvas) {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  renderSkillStars(card);
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