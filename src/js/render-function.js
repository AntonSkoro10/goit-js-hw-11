import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export const markupItem = images => {
    return images
        .map(
            ({
                webformatURL,
                largeImageURL,
                tags,
                likes,
                coments,
                views,
                downloads,  
            }) => {
                return 
                `<li class="gallery-item">
    <a href="${largeImageURL}" class="gallery-link">
      <img src="${webformatURL}" alt="${tags}" class="gallery-img">
    </a>
    <div class="small-content">
      <small class="text-likes">Likes:${likes} </small>
      <small class="text-views">Views:${views}</small>
      <small class="text-coments">Coments:${coments}</small>
      <small class="text-downloads">Downloads:${downloads}</small>
    </div>
    </li>`
            }
        
    )
    .join('')
}

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
})