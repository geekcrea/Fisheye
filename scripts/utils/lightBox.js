import { getMediaCollectionSize } from '../pages/photographer.js';
import { globalState } from '../utils/globalState.js';

// Variable to keep a reference to the lightbox's close button
let lightBoxModalCloseButton = null;

// open the lightbox and display content
export function showMediaInLightbox(src, title, type = 'image') {
  // creating the lightbox modal
  const lightBoxModal = document.createElement('div');
  lightBoxModal.setAttribute('role', 'modal');
  lightBoxModal.setAttribute('id', 'lightBox');
  lightBoxModal.className = 'lightBox_Modal';
  const lightBoxModalClose = document.createElement('span');
  lightBoxModalClose.className = 'lightBoxModalClose';
  lightBoxModalClose.setAttribute('id', 'lightBoxModalClose');
  lightBoxModalClose.setAttribute('role', 'button');
  lightBoxModalClose.setAttribute('aria-label', 'Fermer la lightbox');
  lightBoxModalClose.setAttribute('tabindex', '-1');
  lightBoxModalClose.classList.add('fa-solid');
  lightBoxModalClose.classList.add('fa-close');
  const lightBoxContent = document.createElement('div');
  lightBoxContent.className = 'lightBoxContent';
  const lightBoxPrev = document.createElement('span');
  lightBoxPrev.className = 'lightBoxPrev';
  lightBoxPrev.classList.add('fa-solid');
  lightBoxPrev.classList.add('fa-chevron-left');
  lightBoxPrev.setAttribute('aria-label', 'Image précédente');
  lightBoxPrev.setAttribute('role', 'button');
  lightBoxPrev.setAttribute('tabindex', '0');
  lightBoxPrev.addEventListener('click', showPreviousMediaInLightBox);
  const lightBoxPicture = document.createElement('figure');
  lightBoxPicture.className = 'lightBoxPicture';

  // display image or video depending on the type
  if (type === 'image') {
    const lightBoxPictureSource = document.createElement('img');
    lightBoxPictureSource.setAttribute('src', src);
    lightBoxPictureSource.setAttribute('alt', title);
    lightBoxPictureSource.setAttribute('aria-label', title);
    lightBoxPictureSource.className = 'lightBoxPictureSource';
    lightBoxPicture.appendChild(lightBoxPictureSource);
  } else if (type === 'video') {
    const lightBoxVideo = document.createElement('video');
    lightBoxVideo.setAttribute('controls', '');
    const lightBoxVideoSource = document.createElement('source');
    lightBoxVideoSource.setAttribute('src', src);
    lightBoxVideoSource.setAttribute('type', 'video/mp4');
    lightBoxVideo.setAttribute('aria-label', title);
    lightBoxVideo.appendChild(lightBoxVideoSource);
    lightBoxPicture.appendChild(lightBoxVideo);
  }

  const lightBoxPictureCaption = document.createElement('figcaption');
  lightBoxPictureCaption.innerHTML = title;
  lightBoxPictureCaption.className = 'lightBoxPictureCaption';
  lightBoxPictureCaption.setAttribute('tabindex', '0');
  lightBoxPictureCaption.setAttribute('role', 'button');
  const lightBoxNext = document.createElement('span');
  lightBoxNext.className = 'lightBoxNext';
  lightBoxNext.classList.add('fa-solid');
  lightBoxNext.classList.add('fa-chevron-right');
  lightBoxNext.setAttribute('aria-label', 'Image suivante');
  lightBoxNext.setAttribute('role', 'button');
  lightBoxNext.setAttribute('tabindex', '0');
  lightBoxNext.addEventListener('click', showNextMediaInLightBox);
  document.body.appendChild(lightBoxModal);
  lightBoxModal.appendChild(lightBoxContent);
  lightBoxContent.appendChild(lightBoxModalClose);
  lightBoxContent.appendChild(lightBoxPrev);
  lightBoxContent.appendChild(lightBoxPicture);
  lightBoxContent.appendChild(lightBoxNext);
  lightBoxPicture.appendChild(lightBoxPictureCaption);

  // add event listeners for keyboard navigation and focus
  lightBoxPrev.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      showPreviousMediaInLightBox();
    }
  });

  lightBoxNext.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      showNextMediaInLightBox();
    }
  });

  lightBoxPictureCaption.focus();

  // make elements outside the lightbox non-focusable and hidden from screen readers
  let elementsList = [
    'header',
    'main',
    '.footer',
    '.photographerMedia',
    '.likeHeart',
  ];

  for (let selector of elementsList) {
    let elements = document.querySelectorAll(selector);
    for (let elem of elements) {
      elem.setAttribute('tabindex', '-1');
      elem.setAttribute('aria-hidden', 'true');
    }
  }

  document.querySelector('header').setAttribute('aria-hidden', 'true');
  document.querySelector('main').setAttribute('aria-hidden', 'true');
  document.querySelector('header').setAttribute('tabindex', '-1');
  document.querySelector('main').setAttribute('tabindex', '-1');

  // add event listeners for closing the lightbox
  lightBoxModalCloseButton = lightBoxModal.querySelector('.lightBoxModalClose');
  lightBoxModalCloseButton.addEventListener('click', closeLightBox);
  document.addEventListener('keydown', handleKeyDown);
}

// event listener for keyboard navigation within the lightbox
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    showPreviousMediaInLightBox();
  } else if (e.key === 'ArrowRight') {
    showNextMediaInLightBox();
  }
});

// remove lightbox event listeners when it's closed
function removeLightBoxListeners() {
  if (lightBoxModalCloseButton) {
    lightBoxModalCloseButton.removeEventListener('click', closeLightBox);
    lightBoxModalCloseButton = null;
  }
}

// function to close the lightbox
function closeLightBox() {
  const lightBox = document.getElementById('lightBox');
  // remove the lightbox from the DOM
  if (lightBox) {
    lightBox.remove();
    removeLightBoxListeners();
    document.removeEventListener('keydown', handleKeyDown);
  }
  // refocus on the first media element
  const firstMediaElement = document.querySelector('.photographerMedia');
  if (firstMediaElement) {
    firstMediaElement.focus();
  }

  // make elements outside the lightbox focusable again
  let elementsList = [
    'header',
    'main',
    '.footer',
    '.photographerMedia',
    '.likeHeart',
  ];

  for (let selector of elementsList) {
    let elements = document.querySelectorAll(selector);
    for (let elem of elements) {
      elem.setAttribute('tabindex', '0');
      elem.setAttribute('aria-hidden', 'false');
    }
  }
  document.querySelector('header').setAttribute('aria-hidden', 'false');
  document.querySelector('main').setAttribute('aria-hidden', 'false');
}

// close lightbox by pressing Esc key
function handleKeyDown(event) {
  if (event.key === 'Escape' || event.key === 'Esc') {
    closeLightBox();
  }
}

// show next media in lightbox
function showNextMediaInLightBox() {
  // use the index of the currently displayed media to determine the next media
  if (globalState.mediaClickedIndex !== -1) {
    const nextMediaIndex =
      (globalState.mediaClickedIndex + 1) % getMediaCollectionSize();
    const nextMediaElement =
      document.querySelectorAll('.photographerMedia')[nextMediaIndex];

    let title;
    if (nextMediaElement.tagName.toLowerCase() === 'img') {
      title = nextMediaElement.getAttribute('alt');
    } else if (nextMediaElement.tagName.toLowerCase() === 'video') {
      title = nextMediaElement.getAttribute('title');
    }

    const src = nextMediaElement.getAttribute('src');
    const type =
      nextMediaElement.tagName.toLowerCase() === 'img' ? 'image' : 'video';

    // update the clicked media index
    globalState.mediaClickedIndex = nextMediaIndex;

    // close and reopen the lightbox with the new media
    closeLightBox();
    showMediaInLightbox(src, title, type, nextMediaElement);
  }
}

// show previous media in lightbox
function showPreviousMediaInLightBox() {
  // use the index of the currently displayed media to determine the previous media
  if (globalState.mediaClickedIndex !== -1) {
    const previousMediaIndex =
      (globalState.mediaClickedIndex - 1 + getMediaCollectionSize()) %
      getMediaCollectionSize();
    const previousMediaElement =
      document.querySelectorAll('.photographerMedia')[previousMediaIndex];

    let title;
    if (previousMediaElement.tagName.toLowerCase() === 'img') {
      title = previousMediaElement.getAttribute('alt');
    } else if (previousMediaElement.tagName.toLowerCase() === 'video') {
      title = previousMediaElement.getAttribute('title');
    }

    const src = previousMediaElement.getAttribute('src');
    const type =
      previousMediaElement.tagName.toLowerCase() === 'img' ? 'image' : 'video';

    // update the clicked media index
    globalState.mediaClickedIndex = previousMediaIndex;

    // close and reopen the lightbox with the new media
    closeLightBox();
    showMediaInLightbox(src, title, type, previousMediaElement);
  }
}
