// src/js/pixabay-api.js
import axios from 'axios';

const PIXABAY_API_KEY = 'YOUR_PIXABAY_API_KEY';
const perPage = 40;

const pixabayAPI = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: PIXABAY_API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
  },
});



export function getImagesByQuery(query) {
  if (typeof query !== 'string') {
    return Promise.reject(new Error('Query must be a string'));
  }


  return pixabayAPI.get('', {
    params: {
      q: query,
    },
  }).then(response => response.data);
}
