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
  const header  = `<h1><a href="../../index.html">My Developer Portfolio</a></h1>
                    <nav>
                      <a href="../../aboutMe.html">About</a>
                      <a href="../../projects.html">My Projects</a>
                      <a href="../../skills.html">My Skills</a>
                      <a href="../../miscellaneous.html">Miscellaneous</a>
                    </nav>`;

  const footer =  `<a class="btn" href="../../index.html">Go back to main Page</a>
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
document.querySelectorAll('.card.clickable' || '.gallery-item.clickable').forEach(card => {
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

document.addEventListener('DOMContentLoaded', () => {
  const projectPage = document.querySelector('.project-page');

  if (!projectPage) {
    return;
  }

  const projectImages = Array.from(projectPage.querySelectorAll('img'));

  if (!projectImages.length) {
    return;
  }

  const lightbox = document.createElement('div');
  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.setAttribute('hidden', 'true');
  lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close image">×</button><img alt="Expanded project view" src="" />';

  const lightboxImage = lightbox.querySelector('img');
  const closeButton = lightbox.querySelector('.lightbox-close');
  document.body.appendChild(lightbox);

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.setAttribute('hidden', 'true');
    document.body.classList.remove('lightbox-open');
  };

  closeButton.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  projectImages.forEach((image) => {
    const imageSource = image.getAttribute('src');

    if (!imageSource || imageSource.trim() === '' || imageSource.endsWith('/')) {
      return;
    }

    image.style.cursor = 'zoom-in';
    image.setAttribute('tabindex', '0');

    const openLightbox = () => {
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt || 'Project image';
      lightbox.removeAttribute('hidden');
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
    };

    image.addEventListener('click', openLightbox);
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox();
      }
    });
  });
});