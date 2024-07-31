import { showMediaInLightbox } from '../utils/lightBox.js';
import { likeMedia } from '../utils/likes.js';

// factory function to create media objects based on provided data
export function mediaFactory(data) {
  // destructure relevant fields from the provided data object
  const { photographerId, title, image, video, likes, index } = data;

  // define media paths
  const picture = `./assets/images/photographers/${photographerId}/${image}`;
  const film = `./assets/images/photographers/${photographerId}/${video}`;

  return {
    // creates a DOM representation for the media (image or video)
    getMediaCardDOM: function () {
      const article = document.createElement('figure');

      // check if the media is a video
      if (video) {
        // video related DOM operations
        const vid = document.createElement('video');
        vid.setAttribute('src', film);
        vid.setAttribute('title', title);
        vid.setAttribute('tabindex', '0');
        vid.setAttribute(
          'aria-label',
          `Ouvrir la video ${title} dans une lightbox`
        );
        vid.style.maxHeight = '100%';
        vid.style.maxWidth = '350px';
        vid.className = 'photographerMedia';
        vid.addEventListener('click', () =>
          showMediaInLightbox(film, title, 'video', index)
        );
        vid.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === 'Space') {
            showMediaInLightbox(film, title, 'video', index);
            event.preventDefault();
          }
        });
        article.appendChild(vid);
      } else {
        // image related DOM operations
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', title);
        img.setAttribute('tabindex', '0');
        img.setAttribute(
          'aria-label',
          `Ouvrir l'image ${title} dans une lightbox`
        );
        img.className = 'photographerMedia';
        img.addEventListener('click', () =>
          showMediaInLightbox(picture, title, 'image', index)
        );
        img.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === 'Space') {
            showMediaInLightbox(picture, title, 'image', index);
            event.preventDefault();
          }
        });
        article.appendChild(img);
      }

      // create the title and likes section beneath the media
      const divTitleLikes = document.createElement('div');
      divTitleLikes.className = 'div-title-likes';
      divTitleLikes.style.display = 'flex';
      divTitleLikes.style.justifyContent = 'space-between';
      divTitleLikes.style.maxWidth = '350px';
      divTitleLikes.style.whiteSpace = 'pre';
      divTitleLikes.style.paddingRight = '2px';
      const pictureTitle = document.createElement('figcaption');
      pictureTitle.textContent = title;
      pictureTitle.style.whiteSpace = 'nowrap';
      pictureTitle.style.overflow = 'hidden';
      pictureTitle.style.textOverflow = 'ellipsis';
      const likesAndHeart = document.createElement('span');
      likesAndHeart.className = 'likeContainer';
      likesAndHeart.style.display = 'flex';
      const pictureLikes = document.createElement('h2');
      pictureLikes.className = 'nblikes';
      pictureLikes.textContent = likes;
      pictureLikes.style.marginLeft = '10px';
      const heart = document.createElement('span');
      heart.classList.add('fa-solid', 'fa-heart', 'likeHeart');
      heart.style.fontSize = '22px';
      heart.style.margin = '4px 0 0 5px';
      heart.setAttribute('role', 'button');
      heart.setAttribute('aria-label', "J'aime");
      heart.setAttribute('tabindex', '0');
      heart.style.cursor = 'pointer';
      heart.addEventListener('click', likeMedia);
      heart.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          likeMedia(event);
        }
      });

      // assemble the elements
      divTitleLikes.appendChild(pictureTitle);
      likesAndHeart.appendChild(pictureLikes);
      likesAndHeart.appendChild(heart);
      divTitleLikes.appendChild(likesAndHeart);
      article.appendChild(divTitleLikes);
      return article;
    },
  };
}
