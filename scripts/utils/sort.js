import { globalState } from '../utils/globalState.js';
import { displayMediaData } from '../pages/photographer.js';

// toggle display of sort menu
function displaySortMenu() {
  const sortBlockOptions = document.querySelector('.options');
  const selectedOption = document.querySelector('.selected-option');

  // toggle visibility of sort options
  if (sortBlockOptions.style.display === 'block') {
    sortBlockOptions.style.display = 'none';
    // additional visual and accessibility settings for hiding options
    sortBlockOptions.style.visibility = 'hidden';
    sortBlockOptions.classList.remove('open');
    selectedOption.classList.remove('open');
    selectedOption.setAttribute('aria-expanded', 'false');
  } else {
    sortBlockOptions.style.display = 'block';
    sortBlockOptions.style.visibility = 'visible';
    // additional visual and accessibility settings for displaying options
    sortBlockOptions.classList.add('open');
    selectedOption.classList.add('open');
    selectedOption.setAttribute('aria-expanded', 'true');
  }
  // set focus to the selected option for accessibility
  selectedOption.focus();
}

// handle when a sort option is clicked
function handleOptionClick(event) {
  const selectedOption = document.querySelector('.selected-option');
  const clickedOption = event.target;
  // update the displayed selected option with the clicked one
  selectedOption.textContent = clickedOption.getAttribute(
    'data-original-content'
  );
  const sortingCriteria = clickedOption.dataset.value;
  // sort media based on the selected criteria
  sortAndDisplayMedia(sortingCriteria);
  displaySortMenu();
}

// event listener for displaying sort menu when selected option is clicked
document
  .querySelector('.selected-option')
  .addEventListener('click', displaySortMenu);

// get all available sorting options
const sortOptions = document.querySelectorAll('.option');

// attach an event handler to each option to handle the click
sortOptions.forEach((sortOption) => {
  sortOption.addEventListener('click', handleOptionClick);
});

// for each option, store its current content in a data attribute for later use
document.querySelectorAll('.option').forEach((option) => {
  option.setAttribute('data-original-content', option.textContent);
});

// add an event listener to handle the click on the custom select
document.querySelector('.custom-select').addEventListener('click', (event) => {
  if (event.target.classList.contains('option')) {
    processSelectedOption(event.target);
  }
});

// add an event listener to handle 'Enter' key press on the custom select
document
  .querySelector('.custom-select')
  .addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.classList.contains('option')) {
      processSelectedOption(event.target);
      event.preventDefault();
    }
  });

// process the selected sorting option
function processSelectedOption(optionElement) {
  const selectedOptionElem = document.querySelector('.selected-option');
  const selectedValue = optionElement.dataset.value;

  // update the displayed content and attributes of the selected option based on the chosen value
  switch (selectedValue) {
    // set display and attributes for "Popularity" option
    case 'popularity':
      selectedOptionElem.textContent = 'Popularité';
      selectedOptionElem.dataset.value = 'popularity';
      selectedOptionElem.setAttribute('aria-label', 'Trier par popularité');
      document.querySelector('.option[data-value="popularity"]').style.display =
        'none';
      document
        .querySelector('.option[data-value="popularity"]')
        .setAttribute('tabindex', '-1');
      document.querySelector('.option[data-value="date"]').style.display =
        'block';
      document
        .querySelector('.option[data-value="date"]')
        .setAttribute('tabindex', '0');
      document
        .querySelector('.option[data-value="date"]')
        .setAttribute('aria-label', 'Trier par date');
      document.querySelector('.option[data-value="title"]').style.display =
        'block';
      document
        .querySelector('.option[data-value="title"]')
        .setAttribute('tabindex', '0');
      document
        .querySelector('.option[data-value="title"]')
        .setAttribute('aria-label', 'Trier par titre');
      break;

    // set display and attributes for "Date" option
    case 'date':
      selectedOptionElem.textContent = 'Date';
      selectedOptionElem.dataset.value = 'date';
      selectedOptionElem.setAttribute('aria-label', 'Trier par date');
      document.querySelector('.option[data-value="date"]').style.display =
        'none';
      document
        .querySelector('.option[data-value="date"]')
        .setAttribute('tabindex', '-1');
      document.querySelector('.option[data-value="popularity"]').style.display =
        'block';
      document
        .querySelector('.option[data-value="popularity"]')
        .setAttribute('tabindex', '0');
      document
        .querySelector('.option[data-value="popularity"]')
        .setAttribute('aria-label', 'Trier par popularité');
      document.querySelector('.option[data-value="title"]').style.display =
        'block';
      document
        .querySelector('.option[data-value="title"]')
        .setAttribute('tabindex', '0');
      document
        .querySelector('.option[data-value="title"]')
        .setAttribute('aria-label', 'Trier par titre');
      break;

    // set display and attributes for "Title" option
    case 'title':
      selectedOptionElem.textContent = 'Titre';
      selectedOptionElem.dataset.value = 'title';
      selectedOptionElem.setAttribute('aria-label', 'Trier par titre');
      document.querySelector('.option[data-value="title"]').style.display =
        'none';
      document
        .querySelector('.option[data-value="title"]')
        .setAttribute('tabindex', '-1');
      document.querySelector('.option[data-value="date"]').style.display =
        'block';
      document
        .querySelector('.option[data-value="date"]')
        .setAttribute('tabindex', '0');
      document
        .querySelector('.option[data-value="date"]')
        .setAttribute('aria-label', 'Trier par date');
      document.querySelector('.option[data-value="popularity"]').style.display =
        'block';
      document
        .querySelector('.option[data-value="popularity"]')
        .setAttribute('tabindex', '0');
      document
        .querySelector('.option[data-value="popularity"]')
        .setAttribute('aria-label', 'Trier par popularité');
      break;
  }
  // sort and display media based on the selected criteria
  sortAndDisplayMedia(selectedValue);
}

// sort media based on given criteria
function sortMedia(criteria) {
  // sorting the media based on the provided criteria
  switch (criteria) {
    case 'popularity':
      return globalState.media.sort((a, b) => b.likes - a.likes);
    case 'date':
      return globalState.media.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    case 'title':
      return globalState.media.sort((a, b) => a.title.localeCompare(b.title));
    default:
      console.error('Unknown sorting criteria:', criteria);
      return globalState.media;
  }
}

// sort media based on criteria and then display the sorted media
export function sortAndDisplayMedia(criteria) {
  const sortedMedia = sortMedia(criteria);
  displayMediaData(sortedMedia);
}

// keyboard accessibility: handle 'Enter' key for selected option
document
  .querySelector('.selected-option')
  .addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      displaySortMenu();
      event.preventDefault();
      const firstVisibleOption = document.querySelector(
        '.option:not([style*="display: none"])'
      );
      if (firstVisibleOption) firstVisibleOption.focus();
    }
  });

// keyboard accessibility: handle 'Enter' and 'Escape' keys for sort options
document.querySelectorAll('.option').forEach((optionElement) => {
  optionElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleOptionClick(event);
      const sortBlockOptions = document.querySelector('.options');
      sortBlockOptions.style.display = 'none';
      const selectedOption = document.querySelector('.selected-option');
      selectedOption.focus();
      event.preventDefault();
    } else if (event.key === 'Escape') {
      displaySortMenu();
      const selectedOption = document.querySelector('.selected-option');
      selectedOption.focus();
      event.preventDefault();
    }
  });
});

// close the sort menu when clicking outside of it
document.addEventListener('click', (event) => {
  if (!document.querySelector('.custom-select').contains(event.target)) {
    const sortBlockOptions = document.querySelector('.options');
    if (sortBlockOptions.style.display === 'block') {
      displaySortMenu();
    }
  }
});

// keyboard accessibility: handle 'Escape' key to close sort menu
document
  .querySelector('.custom-select')
  .addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      displaySortMenu();
    }
  });
