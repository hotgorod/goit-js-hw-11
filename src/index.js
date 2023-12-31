import axios from "axios";
import { createMarkupPhotos } from "./markup";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '38827644-52da52720fd8c4c61744e2024'

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a', { /* options */ });
let currentPage = 1;
let loadedPhotosCount = 0;
let requestWord = '';

loadMore.addEventListener('click', onLoad);

function onLoad() {
    currentPage += 1;
    getPhotos(requestWord, currentPage)
        .then((responce) => updateScreen(responce))
        .catch(error => { console.log(error) })
}

form.addEventListener('submit', onFormSubmit)

async function onFormSubmit(event) {
    event.preventDefault()
    gallery.innerHTML = '';
    loadedPhotosCount = 0;
    currentPage = 1;
    loadMore.hidden = true;
    requestWord = event.target.elements.searchQuery.value.trim();

    try
    {
        const responce = await getPhotos(requestWord, currentPage);
        Notify.info(`Hooray! We found ${responce.data.totalHits} images.`);
        updateScreen(responce);
    }
    catch (error) {
        console.log(error);
    }
    
}

function updateScreen(responce) {
    loadedPhotosCount += responce.data.hits.length;
    
    if (loadedPhotosCount < responce.data.totalHits) {
        loadMore.hidden = false;
    } else {
        loadMore.hidden = true;
        Notify.warning("We're sorry, but you've reached the end of search results.");
    }
      
    gallery.insertAdjacentHTML('beforeend', createMarkupPhotos(responce.data.hits));
    
    lightbox.refresh();
}

function getPhotos(request, page = 1) {
    return axios.get(`${BASE_URL}?key=${API_KEY}`, {
        params: {
        q: `${request}`,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        page: `${page}`,
        per_page: "40",
        
    }
})
}

// =======================================
// left it for myself

// async function onFormSubmit(event) {
//     event.preventDefault()
//     gallery.innerHTML = '';
//     loadedPhotosCount = 0;
//     currentPage = 1;
//     loadMore.hidden = true;
//     requestWord = event.target.elements.searchQuery.value;

//     getPhotos(requestWord, currentPage)
//     .then((responce) => {
//         Notify.info(`Hooray! We found ${responce.data.totalHits} images.`);
//         updateScreen(responce)
//     })
//     .catch(error => { console.log(error) })
// }