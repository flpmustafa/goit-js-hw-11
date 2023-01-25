import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { fetchImgPixabayAPI } from './fetchimgpixabayapi';

const searchQuery = document.querySelector('input[name="searchQuery"]');
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
btnLoadMore.style.display = 'none';

let perPage = 40;
let page = 0;
let name = searchQuery.value;



async function handligForm(event)  {
  event.preventDefault();
  gallery.innerHTML = '';
  btnLoadMore.style.display = 'none';

  page = 1;
  name = searchQuery.value;

  fetchImgPixabayAPI(name, page, perPage)
    .then(name => {
      let totalPages = name.totalHits / perPage;

      if (name.hits.length > 0) {
        Notiflix.Notify.success(`Hooray! We found ${name.totalHits} images.`);
        getGallery(name);
        new SimpleLightbox('.gallery a');

        if (page < totalPages) {
          btnLoadMore.style.display = 'block';
        } else {
          btnLoadMore.style.display = 'none';
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        gallery.innerHTML = '';
      }
    })
    .catch(error => console.log('ERROR: ' + error));
}

searchForm.addEventListener('submit', handligForm);


function getGallery(name) {
  const markup = name.hits
    .map(hit => {
      return `<div class="photo-card">
        <a class="gallery-item" href="${hit.largeImageURL}">
          <img
            class="gallery__image"
            src="${hit.webformatURL}"
            alt="${hit.tags}"
            loading="lazy"
        /></a>
        <div class="info">
          <div class="info__box">
            <p class="info-item">
              <b class="material-symbols-outlined">Likes</b>
            </p>
            <p class="info-counter">${hit.likes.toLocaleString()}</p>
          </div>
          <div class="info__box">
            <p class="info-item">
              <b class="material-symbols-outlined">views</b>
            </p>
            <p class="info-counter">${hit.views.toLocaleString()}</p>
          </div>
          <div class="info__box">
            <p class="info-item">
              <b class="material-symbols-outlined">comments</b>
            </p>
            <p class="info-counter">${hit.comments.toLocaleString()}</p>
          </div>
          <div class="info__box">
            <p class="info-item">
              <b class="material-symbols-outlined">download</b>
            </p>
            <p class="info-counter">${hit.downloads.toLocaleString()}</p>
          </div>
        </div>
      </div>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

btnLoadMore.addEventListener(
  'click',
  () => {
    name = searchQuery.value;
    page += 1;
    fetchImgPixabayAPI(name, page, perPage).then(name => {
      let totalPages = name.totalHits / perPage;
      getGallery(name);
      new SimpleLightbox('.gallery a');
      if (page >= totalPages) {
        btnLoadMore.style.display = 'none';
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    });
  },
  true
);