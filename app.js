// =====================
// SCROLL SUAVE
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// =====================
// NAVBAR AL HACER SCROLL
// =====================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.style.background = window.scrollY > 50
    ? "rgba(0,0,0,.97)"
    : "rgba(5,5,5,.9)";
});

// =====================
// ACORDEÓN CATEGORÍAS BATALLA
// =====================
function toggleCat(id) {
  const body  = document.getElementById('cat-' + id);
  const arrow = document.getElementById('arrow-' + id);
  const isOpen = body.classList.contains('open');

  // Cerrar todos
  document.querySelectorAll('.cat-vitrina-body').forEach(b => b.classList.remove('open'));
  document.querySelectorAll('.cat-vitrina-arrow').forEach(a => a.classList.remove('open'));

  // Abrir el clickeado si estaba cerrado
  if (!isOpen) {
    body.classList.add('open');
    arrow.classList.add('open');
  }
}

// =====================
// MI EXPERIENCIA — GALERÍA POR URL (se guarda en el navegador)
// =====================
const GALLERY_KEY = 'batallaSenaGalleryUrls';

function getSavedUrls() {
  try {
    return JSON.parse(localStorage.getItem(GALLERY_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUrls(urls) {
  localStorage.setItem(GALLERY_KEY, JSON.stringify(urls));
}

function renderGallery() {
  const grid = document.getElementById('urlGallery');
  if (!grid) return;
  const urls = getSavedUrls();
  grid.innerHTML = '';
  urls.forEach((url, index) => {
    const wrap = document.createElement('div');
    wrap.classList.add('preview-item');

    const img = document.createElement('img');
    img.src = url;
    img.classList.add('preview-img');
    img.alt = 'Foto Batalla SENA';

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.classList.add('preview-remove');
    removeBtn.textContent = '×';
    removeBtn.onclick = () => removeImageUrl(index);

    wrap.appendChild(img);
    wrap.appendChild(removeBtn);
    grid.appendChild(wrap);
  });
}

function addImageUrl() {
  const input = document.getElementById('imgUrlInput');
  const url = input?.value.trim();
  if (!url) return;

  const urls = getSavedUrls();
  urls.push(url);
  saveUrls(urls);

  input.value = '';
  renderGallery();
}

function removeImageUrl(index) {
  const urls = getSavedUrls();
  urls.splice(index, 1);
  saveUrls(urls);
  renderGallery();
}

document.addEventListener('DOMContentLoaded', renderGallery);
