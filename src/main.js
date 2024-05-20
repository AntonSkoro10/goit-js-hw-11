import { markupItem } from './js/render-function.js'
import { fetchPhotosByQuery } from './js/pixabay-api.js'
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const galleryElement = document.querySelector('.gallery-list')
const form = document.querySelector('.search-form')
const loader = document.querySelector('.loader')

function searchFormSubmit(event) {
    event.preventDefault

    const searchQuery = event.target.elements.searchKeyboard.value.trim()
    if (searchQuery === '') {
        galleryElement.innerHTML = ''
        event.target.reset()
        iziToast.error({
            title: 'Error',
            message: 'Illegal operation',
            position: 'topRight',
            timeout: 2000,
        })
        return
    }
    
    galleryElement.innerHTML = ''
    loader.classList.remove('is-hidden')

    fetchPhotosByQuery(searchQuery)
        .then(imagesData => {
            if (imagesData.totalHits === 0) {
                iziToast.show({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                    timeout: 2000,
                    color: 'red'
                })
            
            }
            galleryElement.innerHTML = markupItem(imagesData.hits)
        })
        .catch(error => console.log(error))
        .finally(() => {
            event.target.reset()
            loader.classList.add('is-hiden')
        })
}

form.addEventListener('submit', searchFormSubmit)
