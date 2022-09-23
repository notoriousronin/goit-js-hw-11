import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import axios from 'axios';

const axios = require('axios').default;

const form = document.querySelector('.search-form');
const input = document.querySelector('.input');
const gallery = document.querySelector('.gallery');
const searchBtn = document.querySelector('.search');
const loadBtn = document.querySelector('.load-more');
const APIKEY = '30111750-62c4a73e1cd4f265a4d4cd285';
const myUrl = 'https://pixabay.com/api/';

let page = 1;
let perPage = 40;

form.addEventListener('submit', subHandle);
loadBtn.addEventListener('click', subLoad);

function subHandle(event) {
  event.preventDefault();
  const inputValue = input.value.trim();
  axios.defaults.baseURL = myUrl;
  return axios
    .get(
      `https://pixabay.com/api/?key=30111750-62c4a73e1cd4f265a4d4cd285&q=${inputValue}&image_type=photo&page=1&per_page=${perPage}`
    )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      const totalHits = data.totalHits;
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      if (data.hits.length === 0) {
        Notiflix.Report.warning('No images for your search');
        loadBtn.classList.add('is-hidden');
      }
      render(data.hits);
      loadBtn.classList.remove('is-hidden');
    })
    .catch(error => {
      console.log(error);
    });
}

function render(image) {
  const newGallery = image.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>`;
    }
  );
  gallery.insertAdjacentHTML('beforeend', newGallery);
}

function subLoad(event) {
  event.preventDefault();
  const inputValue = input.value.trim();
  page += 1;
  axios.defaults.baseURL = myUrl;
  return axios
    .get(
      `https://pixabay.com/api/?key=30111750-62c4a73e1cd4f265a4d4cd285&q=${inputValue}&image_type=photo&page=2&per_page=${perPage}`
    )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      render(data.hits);
      const maxValue = Math.floor(data.totalHits / perPage);
      if (maxValue < page) {
        loadBtn.classList.add('is-hidden');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => {
      console.log(error);
    });
}
