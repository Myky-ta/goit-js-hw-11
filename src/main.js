// src/main.js
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// DOM елементи
const form = document.querySelector('.form');
const input = form ? form.querySelector('input[name="search-text"]') : null;
const gallery = document.querySelector('.gallery');

if (!form || !input || !gallery) {
  console.error(
    'Required DOM elements not found: .form, input[name="search-text"], .gallery'
  );
}

form && form.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  // Початок запиту
  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (!data || !Array.isArray(data.hits) || data.hits.length === 0) {
        iziToast.error({
          title: 'No results',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      // Додаємо всі нові елементи в DOM однією операцією
      createGallery(data.hits);

      iziToast.success({
        title: 'Found',
        message: `Found ${data.totalHits} images.`,
        position: 'topRight',
        timeout: 2000,
      });
    })
    .catch(() => {
      iziToast.error({
        title: 'Error',
        message: 'An error occurred while fetching images. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });
}
