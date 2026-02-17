const gallery = document.getElementById('gallery');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCategory = document.getElementById('lightbox-category');
const lightboxDetails = document.getElementById('lightbox-details');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxContent = lightbox.querySelector('.lightbox-content');

let artworks = [];
let currentCategory = 'all';

function formatCategory(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildDetails(artwork) {
  const details = [];

  if (artwork.year) details.push(artwork.year);
  if (artwork.medium) details.push(artwork.medium);
  if (artwork.size) details.push(artwork.size);

  return details.length > 0 ? details.join(' · ') : 'Sin detalles adicionales';
}

function createArtworkCard(artwork) {
  const card = document.createElement('button');
  card.className = 'artwork-card';
  card.type = 'button';
  card.setAttribute('aria-label', `Abrir obra ${artwork.title}`);

  card.innerHTML = `
    <img src="${artwork.image}" alt="${artwork.title}, ${formatCategory(artwork.category)}" loading="lazy" />
    <div class="artwork-info">
      <h3>${artwork.title}</h3>
      <p>${formatCategory(artwork.category)}</p>
    </div>
  `;

  card.addEventListener('click', () => openLightbox(artwork));

  return card;
}

function renderGallery() {
  gallery.innerHTML = '';

  const filtered = currentCategory === 'all'
    ? artworks
    : artworks.filter((artwork) => artwork.category === currentCategory);

  filtered.forEach((artwork) => {
    gallery.appendChild(createArtworkCard(artwork));
  });
}

function setCategory(category) {
  currentCategory = category;

  filterButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.category === category);
  });

  renderGallery();
}

function openLightbox(artwork) {
  lightboxImage.src = artwork.image;
  lightboxImage.alt = `${artwork.title}, ${formatCategory(artwork.category)}`;
  lightboxTitle.textContent = artwork.title;
  lightboxCategory.textContent = `Categoría: ${formatCategory(artwork.category)}`;
  lightboxDetails.textContent = buildDetails(artwork);

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  lightboxContent.focus();
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  document.body.style.overflow = '';
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => setCategory(button.dataset.category));
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target.dataset.close === 'true') {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});

fetch('./data.json')
  .then((response) => response.json())
  .then((data) => {
    artworks = data;
    renderGallery();
  })
  .catch(() => {
    gallery.innerHTML = '<p>No se pudieron cargar las obras en este momento.</p>';
  });
