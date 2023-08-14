import axios from "axios";
import { createMarkupPhotos } from "./markup";


const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '38827644-52da52720fd8c4c61744e2024'

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');


form.addEventListener('submit', onFormSubmit)



function onFormSubmit(event){
    event.preventDefault()
    gallery.innerHTML = '';
  
    
    getPhotos(event.target.elements.searchQuery.value).then((responce) => gallery.innerHTML = createMarkupPhotos(responce.data.hits))
    .catch(error => { console.log(error) })
}




function getPhotos(request) {
    return axios.get(`${BASE_URL}?key=${API_KEY}`, {
        params: {
        q: `${request}`,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        page: "1",
        per_page: "40",
        
    }
})
}

    