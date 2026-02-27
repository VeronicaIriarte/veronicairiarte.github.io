const gallery = document.getElementById('gallery');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCategory = document.getElementById('lightbox-category');
const lightboxDetails = document.getElementById('lightbox-details');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxThumbs = document.getElementById('lightbox-thumbs');
const lightboxContent = lightbox.querySelector('.lightbox-content');
const categoryIntro = document.getElementById('category-intro');
const categoryIntroTitle = document.getElementById('category-intro-title');
const categoryIntroText = document.getElementById('category-intro-text');

const CATEGORY_INTROS = {
  jardines: {
    title: 'Serie: Jardines y Paisajes',
    paragraphs: [
      'Esta serie forma parte de una práctica que comenzó hace más de treinta años y que he sostenido de manera constante, en paralelo al desarrollo del resto de mi obra. Pintar paisajes del natural no ha sido un episodio aislado dentro de mi producción, sino una línea profunda y persistente de investigación, una forma de volver siempre a la mirada directa y a la experiencia inmediata.',
      'Trabajo situándome físicamente frente al paisaje, entregándome a la observación atenta del color, de la luz y de las transformaciones del instante. Pintar así es, para mí, una práctica profundamente espiritual: implica presencia, silencio y una forma de escucha visual. La pintura se convierte en un registro del momento antes de que cambie, antes de que la luz se desplace o el clima se transforme.',
      'El proceso suele ser ágil e intuitivo. Tanto en óleo como en acuarela, con espátula o pincel, busco que el gesto conserve la energía del primer impulso. Me interesa que la materia mantenga la vibración de lo vivido, que el trazo no pierda frescura ni intensidad.',
      'Investigo la superposición del dibujo y la acumulación de materia. Trabajo por capas, transparencias, veladuras y empastes que generan una imagen en expansión. La sobrepoblación de líneas, formas y matices de color refleja la densidad y complejidad del entorno natural: todo convive, todo se superpone, todo está en movimiento.',
      'En mi obra el color siempre es protagonista. No busco reproducir fielmente lo que veo, sino traducir su atmósfera, su intensidad. Cada obra es el registro de una experiencia específica, de un tiempo y una luz irrepetible. Es ver a Dios.',
    ],
  },
  juegos: {
    title: 'Serie: Juegos y juguetes',
    paragraphs: [
      'La serie Juegos me acompañó durante muchos años. Nació a partir del nacimiento de mis hijos, un acontecimiento que transformó mi vida y mi mirada. Observarlos jugar, crear mundos propios, despertó en mí la necesidad de detener esos preciados instantes, detener el tiempo.',
      'Los juguetes fueron tomando vida propia y narrando pequeñas historias. Obra de gran tamaño donde estos personajes tienen entidad, presencia y vida. Los juguetes funcionan como una representación de nosotros mismos, superando la distinción sujeto-objeto. Ellos se enamoran, sufren, ríen volviéndose espejos emocionales.',
      'Los fondos que en un comienzo eran planos, casi silenciosos, gradualmente comenzaron a poblarse de líneas, rayas, círculos, unos dentro de otros. Se volvieron más complejos, más vibrantes, acompañando la intensidad emocional de los personajes. Esa sobrecarga visual dialoga con la energía del juego y con la expansión imaginativa propia de la infancia.',
      'El color, como en toda mi obra, es fuerte e intenso. Las texturas, trabajadas con minuciosidad, buscan generar una presencia casi tangible.',
      'En estas obras no hay pasado ni futuro; todo sucede en un presente absoluto, son momentos únicos e irrepetibles.',
    ],
  },
  lazos: {
    title: 'Serie: Lazos y familia',
    paragraphs: [
      'Mis afectos son mi vida y la esencia de mi obra, todo entrelazado en una única necesidad: hablar de ese mundo donde los vínculos se encadenan y, a veces, nos atraviesan. En mi trabajo exploro la amistad, el amor, la felicidad y, sobre todo, el regalo de ser madre. Reflexiono sobre el paso del tiempo como una construcción mental que nos permite recordar el pasado e imaginar el futuro, pero donde lo único que realmente existe es el presente. Esta dualidad entre lo íntimo y lo universal capta la esencia de lo humano y da forma a mi propuesta artística.',
      'Cada trazo que realizo al dibujar es como una caricia, es sentir una fuerte intensidad en el aquí y ahora, a esa persona en lo más profundo de su ser. Cada pincelada, pensada, pausada, se convierte en un acto de meditación. Mi mente se sumerge en un estado de calma, donde el ruido exterior se disipa y solo queda el momento presente. Preparar el color, elegir su matiz, pensar la paleta… cada paso tiene una relación directa con una sensación muy profunda, algo instintivo que me lleva a develar cada obra. Ese camino difícil crea mucha ansiedad, nerviosismo, frustración, enojo, incomodidad o, por el contrario, satisfacción, bienestar, alegría.',
      'La preparación de cada obra comienza mucho tiempo antes que su realización física, empieza en mi cabeza, en mi corazón, en mi alma. Es una necesidad íntima de fortalecer en la memoria un sentimiento e inmortalizarlo, de mostrar lo que creo yo es la felicidad más plena.',
      'Son muchos los elementos en los que pienso cuando armo física y mentalmente cada escena: los personajes principales y secundarios, figura y fondo, composición, paleta, texturas, clima. Cada uno juega su rol y todos conforman mi obra. Es una historia, un cuento, donde puedo leer más allá de lo que muestro. La carbonilla, el lápiz negro, el óleo, el acrílico, el esmalte, el bordado, todo vale. Cada obra necesita su material, su composición, cada trabajo requiere y pide ser tratado de manera especial. El dibujo más académico me ayuda a mostrar aquello que preciso contar con más lealtad; el juego más profundo y el disfrute más relajado aparecen en las texturas visuales, en aquellos dibujos que bailan y acompañan y me permiten soltar y jugar. La paleta acompaña al mensaje, surge, no se impone, aparece. La elección de los colores vibrantes, intensos, no solo simboliza la vida, sino que también representa la diversidad de emociones y la riqueza de las conexiones que forman parte de mi propio ser.',
      'Pareciera un enorme e inabarcable rompecabezas de esos miles de momentos o sentimientos que me suceden a diario. El hogar, mi lugar. Ese espacio poético, abstracto, esa construcción minuciosa, que jamás descansa, ni se detiene. Amor puro y verdadero que fortalece y embriaga y carga de energía, potencia y veracidad cada una de mis pinceladas. Ese deseo escondido de contagiar al mundo con este secreto.',
    ],
  },
};

let artworks = [];
let currentCategory = 'all';
let lightboxArtwork = null;
let lightboxIndex = 0;

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
    <img src="${artwork.images[0]}" alt="${artwork.title}, ${formatCategory(artwork.category)}" loading="lazy" />
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

  const intro = CATEGORY_INTROS[category];
  if (intro) {
    categoryIntroTitle.textContent = intro.title;
    categoryIntroText.innerHTML = intro.paragraphs.map((p) => `<p>${p}</p>`).join('');
    categoryIntro.hidden = false;
    categoryIntro.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    categoryIntro.hidden = true;
  }

  renderGallery();
}

function setLightboxImage(src, alt, activeThumb) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;

  lightboxThumbs.querySelectorAll('.thumb-btn').forEach((btn) => {
    btn.classList.toggle('active', btn === activeThumb);
  });
}

function renderThumbs(artwork) {
  lightboxThumbs.innerHTML = '';

  if (artwork.images.length <= 1) return;

  const alt = `${artwork.title}, ${formatCategory(artwork.category)}`;

  artwork.images.forEach((src, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'thumb-btn' + (index === 0 ? ' active' : '');
    btn.setAttribute('aria-label', `Ver imagen ${index + 1}`);

    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.loading = 'lazy';

    btn.appendChild(img);
    btn.addEventListener('click', () => { lightboxIndex = index; setLightboxImage(src, alt, btn); });
    lightboxThumbs.appendChild(btn);
  });
}

function navigateLightbox(delta) {
  if (!lightboxArtwork || lightboxArtwork.images.length <= 1) return;
  lightboxIndex = (lightboxIndex + delta + lightboxArtwork.images.length) % lightboxArtwork.images.length;
  const src = lightboxArtwork.images[lightboxIndex];
  const alt = `${lightboxArtwork.title}, ${formatCategory(lightboxArtwork.category)}`;
  const thumbs = lightboxThumbs.querySelectorAll('.thumb-btn');
  setLightboxImage(src, alt, thumbs[lightboxIndex]);
}

function openLightbox(artwork) {
  lightboxArtwork = artwork;
  lightboxIndex = 0;
  const alt = `${artwork.title}, ${formatCategory(artwork.category)}`;

  lightboxImage.src = artwork.images[0];
  lightboxImage.alt = alt;
  lightboxTitle.textContent = artwork.title;
  lightboxCategory.textContent = `Categoría: ${formatCategory(artwork.category)}`;
  lightboxDetails.textContent = buildDetails(artwork);

  renderThumbs(artwork);

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  lightboxContent.focus();
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  lightboxThumbs.innerHTML = '';
  document.body.style.overflow = '';
  lightboxArtwork = null;
  lightboxIndex = 0;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => setCategory(button.dataset.category));
});

const copyEmailLink = document.getElementById('copy-email');
copyEmailLink.addEventListener('click', (event) => {
  event.preventDefault();

  const email = copyEmailLink.dataset.email;

  function showFeedback() {
    copyEmailLink.textContent = '¡Copiado!';
    setTimeout(() => { copyEmailLink.textContent = 'Mail'; }, 1500);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(showFeedback);
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = email;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showFeedback();
  }
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target.dataset.close === 'true') {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') {
    closeLightbox();
  } else if (event.key === 'ArrowRight') {
    navigateLightbox(1);
  } else if (event.key === 'ArrowLeft') {
    navigateLightbox(-1);
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
