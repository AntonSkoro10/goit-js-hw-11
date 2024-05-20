import { markupItem } from './js/render-function.js';
import { fetchPhotos } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryElement = document.querySelector('.gallery-list');
const form = document.querySelector('.search-form');
const loader = document.querySelector('.js-loader');

function searchFormSubmit(event) {
  event.preventDefault();

  const searchQuery = event.target.elements.keyboardSearch.value.trim();
  if (searchQuery === '') {
    galleryElement.innerHTML = '';
    event.target.reset();
    iziToast.error({
      title: 'Error',
      message: 'Search query cannot be empty!',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }

  galleryElement.innerHTML = '';
  loader.classList.remove('is-hidden');

  fetchPhotos(searchQuery)
    .then(imagesData => {
      if (imagesData.totalHits === 0) {
        iziToast.show({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          timeout: 2000,
          color: 'red'
        });
        loader.classList.add('is-hidden');
        return;
      }
      galleryElement.innerHTML = markupItem(imagesData.hits);
      const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong, please try again later!',
        position: 'topRight',
        timeout: 2000,
      });
    })
    .finally(() => {
      event.target.reset();
      loader.classList.add('is-hidden');
    });
}

form.addEventListener('submit', searchFormSubmit);
