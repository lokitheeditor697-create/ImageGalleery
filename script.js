const cards = Array.from(document.querySelectorAll('.card'));
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

const getVisibleCards = () => cards.filter((card) => !card.classList.contains('hidden'));

function renderLightbox(index) {
  const visibleCards = getVisibleCards();
  if (!visibleCards.length) return;

  currentIndex = (index + visibleCards.length) % visibleCards.length;
  const card = visibleCards[currentIndex];
  const image = card.querySelector('img');
  const caption = card.querySelector('figcaption');

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = caption.textContent;
}

function openLightbox(card) {
  const visibleCards = getVisibleCards();
  currentIndex = visibleCards.indexOf(card);
  renderLightbox(currentIndex);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}

cards.forEach((card) => {
  card.addEventListener('click', () => openLightbox(card));
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    cards.forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });

    if (!getVisibleCards().length) {
      closeLightbox();
    }
  });
});

nextBtn.addEventListener('click', () => renderLightbox(currentIndex + 1));
prevBtn.addEventListener('click', () => renderLightbox(currentIndex - 1));
closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('open')) return;

  if (event.key === 'ArrowRight') {
    renderLightbox(currentIndex + 1);
  } else if (event.key === 'ArrowLeft') {
    renderLightbox(currentIndex - 1);
  } else if (event.key === 'Escape') {
    closeLightbox();
  }
});
