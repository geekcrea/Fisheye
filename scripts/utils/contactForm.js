// initial setup when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // get DOM elements related to the contact form
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const contactButton = document.getElementById('contactButton');
  const form = document.getElementById('contactForm');

  // attach click event listener to display the contact modal
  contactButton.addEventListener('click', displayModal);

  // asynchronously display the contact modal and populate photographer's name
  async function displayModal() {
    const modal = document.getElementById('contact_modal');

      // Réinitialise le formulaire à chaque ouverture du modal
  form.reset();

    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    firstName.focus();

    // get photographer's name and update modal's title
    const contactTitleWording = document.getElementById(
      'contact-title-wording2'
    );
    const displayedPhotographerName =
      document.getElementById('photographName').textContent;
    contactTitleWording.innerText = displayedPhotographerName;
  }

  // close the contact modal and clear the form fields
  function closeModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
    lastName.value = '';
    firstName.value = '';
    email.value = '';
    message.value = '';
    modal.setAttribute('aria-hidden', 'true');
    contactButton.focus();    
  }

  // attach click event listener to the close button of the modal
  const closeCross = document.getElementById('closeCross');
  closeCross.addEventListener('click', closeModal);

  // handle form submission
  function submitForm(event) {
      event.preventDefault();

   
  // Expression régulière pour valider l'email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Sélection du champ d'erreur pour l'email
  const emailError = document.getElementById('emailError');

  // Réinitialisation du message d'erreur
  emailError.style.display = 'none';
  emailError.textContent = '';

  
  // Validation de l'email
  if (!emailPattern.test(email.value)) {
    emailError.textContent = 'Veuillez entrer une adresse email valide.';
    emailError.style.display = 'block'; // Affiche le message d'erreur
    return;
  }

  const formResult = {
    firstname: firstName.value,
    lastname: lastName.value,
    email: email.value,
    message: message.value,
  };
  console.log(formResult);

  
  // Fermer le modal
  closeModal();

    // accessibility : Provide feedback to the user about successful form submission
    const feedbackDiv = document.createElement('div');
    feedbackDiv.innerText = 'Merci! Votre message a été envoyé.';
    feedbackDiv.style.position = 'fixed';
    feedbackDiv.style.top = '50%';
    feedbackDiv.style.left = '50%';
    feedbackDiv.style.transform = 'translate(-50%, -50%)';
    feedbackDiv.style.padding = '1rem';
    feedbackDiv.style.backgroundColor = 'var(--primary-color)';
    feedbackDiv.style.borderRadius = '5px';
    feedbackDiv.style.color = '#fff';
    feedbackDiv.setAttribute('role', 'alert');
    feedbackDiv.setAttribute('aria-label', 'Message envoyé avec succès');
    feedbackDiv.setAttribute('aria-live', 'assertive');
    document.body.appendChild(feedbackDiv);

    // remove the feedback message after  4second
    setTimeout(() => {
      feedbackDiv.remove();
    }, 4000);
  }


  // attach form submit event listener
  form.addEventListener('submit', submitForm);

  // accessibility : close the modal when the 'Escape' key is pressed
  document.addEventListener('keydown', function (event) {
    if (
      event.key === 'Escape' &&
      document.getElementById('contact_modal').style.display === 'block'
    )
      closeModal();
  });

})