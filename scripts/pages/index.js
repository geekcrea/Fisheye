import { photographerFactory } from '../factories/photographerFactory.js';

// fetch photographer data from the 'photographers.json' file
async function getPhotographers() {
  return (
    fetch('./data/photographers.json')
      // parse the JSON response
      .then((response) => response.json())
      // return the 'photographers' array from the parsed data
      .then((data) => data.photographers)
  );
}

// create and display photographer cards based on the provided data
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    // create a photographer object using the factory
    const photographerModel = photographerFactory(photographer);
    // get the DOM representation of the photographer card
    const userCardDOM = photographerModel.getUserCardDOM();
    // append the photographer card to the designated section
    photographersSection.appendChild(userCardDOM);
  });
}

// initializes the page by fetching and displaying photographer data
async function init() {
  const photographers = await getPhotographers();
  displayData(photographers);
}

document.addEventListener('DOMContentLoaded', init);
