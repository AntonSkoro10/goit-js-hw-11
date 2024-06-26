import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const API_KEY = '43933435-35fbbd09623d667ed19d4c9fb'; 
const BASE_URL = 'https://pixabay.com/api/';

export function fetchPhotos(query) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  })

  return fetch(`${BASE_URL}?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json()
  })
}
