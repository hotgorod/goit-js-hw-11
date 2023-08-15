export function createMarkupPhotos(arr) {
    return arr.map(({tags, likes, views, comments, downloads, webformatURL, largeImageURL}) => `<div class="photo-card">
  <a href="${largeImageURL}"><img class='gallery-img' src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`).join('')
    
}