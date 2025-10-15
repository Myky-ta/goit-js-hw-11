 // src/js/main.js
import { getImagesByQuery } from './pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// DOM елементи
const form = document.querySelector('.form');
const input = form ? form.querySelector('input[name="search-text"]') : null;
const gallery = document.querySelector('.gallery');

// Перевірка наявності елементів
if (!form || !input || !gallery) {
  console.error('Required DOM elements not found: .form, input[name="search-text"], .gallery');
}

// Обробник сабміту
form && form.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  const query = input.value.trim();

  // Перевірка пустого рядка
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  // Перед новим пошуком очищаємо галерею та показуємо лоадер
  clearGallery();
  showLoader();

  // Виконуємо запит (getImagesByQuery повертає Promise)
  getImagesByQuery(query)
    .then(data => {

      if (!data || !Array.isArray(data.hits) || data.hits.length === 0) {
        iziToast.error({
          title: 'No results',
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }


      createGallery(data.hits);

      iziToast.success({
        title: 'Found',
        message: `Found ${data.totalHits} images.`,
        position: 'topRight',
        timeout: 2000,
      });
    })
    .catch(error => {
      console.error('Error fetching images:', error);
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
