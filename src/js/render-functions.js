// src/js/render-functions.js
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader');


const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


export function createGallery(images) {
  if (!Array.isArray(images) || !galleryContainer) return;

  const markup = images.map(img => {
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = img;
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${largeImageURL}">
          <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b><br>${likes}</p>
          <p class="info-item"><b>Views</b><br>${views}</p>
          <p class="info-item"><b>Comments</b><br>${comments}</p>
          <p class="info-item"><b>Downloads</b><br>${downloads}</p>
        </div>
      </li>
    `;
  }).join('');

  // Додаємо нову розмітку одним викликом
  galleryContainer.insertAdjacentHTML('beforeend', markup);

  // Оновлюємо simplelightbox
  lightbox.refresh();
}


export function clearGallery() {
  if (!galleryContainer) return;
  galleryContainer.innerHTML = '';
}


export function showLoader() {
  if (!loaderElement) return;
  loaderElement.classList.add('is-loading');
}

export function hideLoader() {
  if (!loaderElement) return;
  loaderElement.classList.remove('is-loading');
}
