// src/js/render-functions.js
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// DOM-елементи (мають бути в index.html)
const galleryContainer = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader');

// Ініціалізуємо SimpleLightbox на селекторі .gallery a
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

/**
 * Створює та додає розмітку gallery за одну операцію.
 * Після додавання викликає lightbox.refresh()
 * @param {Array} images - масив об'єктів з API (webformatURL, largeImageURL, tags, likes, views, comments, downloads)
 */
export function createGallery(images) {
  if (!galleryContainer || !Array.isArray(images) || images.length === 0) return;

  const markup = images
    .map(img => {
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
    })
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

/**
 * Очищає вміст галереї
 */
export function clearGallery() {
  if (!galleryContainer) return;
  galleryContainer.innerHTML = '';
}

/**
 * Показує лоадер (додає клас is-loading)
 */
export function showLoader() {
  if (!loaderElement) return;
  loaderElement.classList.add('is-loading');
}

/**
 * Приховує лоадер (прибирає клас is-loading)
 */
export function hideLoader() {
  if (!loaderElement) return;
  loaderElement.classList.remove('is-loading');
}
