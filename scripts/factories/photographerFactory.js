// factory function to create a photographer object based on provided data
export function photographerFactory(data) {
  // destructure relevant fields from the provided data object
  const { name, id, city, country, tagline, price, portrait } = data;

  // define the path for the portrait picture
  const picture = `./assets/images/photographers/00-Portraits/${portrait}`;

  return {
    // create a DOM representation for the photographer
    getUserCardDOM: function () {
      // create the main container for the photographer's card
      const article = document.createElement('article');
      // create a link surrounding the photographer's portrait
      const pictureLink = document.createElement('a');
      pictureLink.setAttribute('href', `./photographer.html?id=${id}`);
      pictureLink.setAttribute('aria-label', `${name}`);
      // create a wrapper for resizing and positioning the portrait
      const wrapper = document.createElement('div');
      wrapper.classList.add('wrapper');
      // create the portrait image of the photographer
      const img = document.createElement('img');
      img.setAttribute('src', picture);
      img.setAttribute('alt', `Page de ${name}`);
      img.setAttribute('aria-label', `Page de ${name}`);
      // create the block for the photographer's name
      const h2 = document.createElement('h2');
      h2.textContent = name;
      // create the block displaying the city and country of the photographer
      const h3 = document.createElement('h3');
      h3.textContent = `${city}, ${country}`;
      // create the block for the photographer's tagline
      const h4 = document.createElement('h4');
      h4.textContent = tagline;
      // create the block displaying the photographer's price per day
      const h5 = document.createElement('h5');
      h5.textContent = `${price}€/jour`;

      // assemble all elements
      wrapper.appendChild(img);
      pictureLink.appendChild(wrapper);
      article.appendChild(pictureLink);
      article.appendChild(h2);
      article.appendChild(h3);
      article.appendChild(h4);
      article.appendChild(h5);

      return article;
    },
  };
}
