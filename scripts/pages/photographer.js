import { mediaFactory } from '../factories/mediaFactory.js';
import { globalState } from '../utils/globalState.js';

// local state variables
let mediaClickedIndex;
let media = globalState.media;

// extract photographer id from the current URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = urlParams.get('id');

// fetch and return photographer and media data based on photographer's ID
export async function getPhotographer() {
  return fetch('./data/photographers.json')
    .then((res) => res.json())
    .then((data) => {
      const photographer = data.photographers.find(
        (p) => p.id === parseInt(photographerId)
      );
      media = data.media.filter(
        (m) => m.photographerId === parseInt(photographerId)
      );
      return { photographer, media };
    });
}

// populate the header with photographer details
async function displayPhotographData(photographerData) {
  const picture = `./assets/images/photographers/00-Portraits/${photographerData.portrait}`;
  const photographPicture = document.getElementById('photographPicture');
  photographPicture.setAttribute('src', picture);
  photographPicture.setAttribute('alt', photographerData.name);
  const photographName = document.getElementById('photographName');
  photographName.textContent = photographerData.name;
  const photographCityCountry = document.getElementById(
    'photographCityCountry'
  );
  photographCityCountry.textContent = `${photographerData.city}, ${photographerData.country}`;
  const photographTagline = document.getElementById('photographTagline');
  photographTagline.textContent = photographerData.tagline;
  const nbLike = document.getElementById('nbLike');
  nbLike.textContent = 'nbLike';
  const priceBlock = document.getElementById('priceBlock');
  priceBlock.textContent = `${photographerData.price}€ / jour`;
}

// calculate and return the total likes for the displayed media
function getTotalLikesCount() {
  const pictureLikesElements = document.querySelectorAll('.nblikes');
  let totalLikesCount = 0;

  pictureLikesElements.forEach((pictureLikes) => {
    const likesCount = parseInt(pictureLikes.textContent);
    totalLikesCount += likesCount;
  });
  return totalLikesCount;
}

// display the price and total like count at the bottom of the page
async function displayPriceAndLikeData(photographerData) {
  const priceBlock = document.getElementById('priceBlock');
  priceBlock.textContent = `${photographerData.price}€ / jour`;
}

// display media gallery, update the total like count, and attach event listeners
export async function displayMediaData() {
  const mediaSection = document.getElementById('media-section');
  mediaSection.innerHTML = '';
  media.forEach((mediaItem) => {
    const mediaModel = mediaFactory(mediaItem);
    const userMediaDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(userMediaDOM);
  });
  const nbLike = document.getElementById('nbLike');
  const totalLikesCount = getTotalLikesCount();
  nbLike.textContent = totalLikesCount;

  document
    .getElementById('media-section')
    .addEventListener('click', getMediaCollectionSize);
  document
    .getElementById('media-section')
    .addEventListener('click', getMediaClickedIndex);

  document
    .getElementById('media-section')
    .addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        getMediaCollectionSize(event);
        getMediaClickedIndex(event);
      }
    });
}

// return the count of all media items in the collection
export function getMediaCollectionSize() {
  const mediaCollection = document.querySelectorAll('.photographerMedia');
  return mediaCollection.length;
}

// get the index of the media item that was clicked on
export function getMediaClickedIndex(event) {
  if (!event.target.classList.contains('photographerMedia')) return;

  const mediaCollection = document.querySelectorAll('.photographerMedia');
  const mediaClicked = event.target;
  mediaClickedIndex = Array.from(mediaCollection).indexOf(mediaClicked);

  // update the global state
  globalState.mediaClickedIndex = mediaClickedIndex;

  return mediaClickedIndex;
}

// initialize the photographer page with sorted media, display photographer details, and attach global event listeners
async function init() {
  const { photographer, media: retrievedMedia } = await getPhotographer();
  media = retrievedMedia.sort((a, b) => b.likes - a.likes);
  globalState.media = media;
  displayPhotographData(photographer);
  displayPriceAndLikeData(photographer);
  displayMediaData(media);
}

init();
