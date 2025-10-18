// src/js/pixabay-api.js
import axios from 'axios';

const PIXABAY_API_KEY = '52827134-53a8d98a66d236597fa2c26fa';
const PER_PAGE = 40;

const api = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: PIXABAY_API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
  },
});

/*
 * (в main.js ми обробляємо data.hits та інші перевірки)
 *
 * @param {string} query
 * @returns {Promise<Object>} response.data
 */
export function getImagesByQuery(query) {
  if (typeof query !== 'string') {
    return Promise.reject(new Error('Query must be a string'));
  }

  return api
    .get('', {
      params: {
        q: query,
      },
    })
    .then(response => response.data);
}
