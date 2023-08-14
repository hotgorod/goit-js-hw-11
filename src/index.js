import axios from "axios";
import { createMarkupPhotos } from "./markup";


const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '38827644-52da52720fd8c4c61744e2024'

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more');
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



function onFormSubmit(event){
    event.preventDefault()
    gallery.innerHTML = '';
    loadedPhotosCount = 0;
    currentPage = 1;
    loadMore.hidden = true;
    requestWord = event.target.elements.searchQuery.value;
    getPhotos(requestWord, currentPage)
        .then((responce) => updateScreen(responce))
        .catch(error => { console.log(error) })
    }

function updateScreen(responce) {
    loadedPhotosCount += responce.data.hits.length;
    console.log(loadedPhotosCount);

    if (loadedPhotosCount < responce.data.totalHits) {
        loadMore.hidden = false;
    } else {
        loadMore.hidden = true;
    }
      
    gallery.insertAdjacentHTML('beforeend', createMarkupPhotos(responce.data.hits));
}


function getPhotos(request, page = 1) {
    return axios.get(`${BASE_URL}?key=${API_KEY}`, {
        params: {
        q: `${request}`,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        page: `${page}`,
        per_page: "10",
        
    }
})
}

