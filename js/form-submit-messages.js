const successSubmitMessage = document.querySelector('#success').content.querySelector('.success');
const errorSubmitMessage = document.querySelector('#error').content.querySelector('.error');
const bodyElement = document.querySelector('body');

export const getSuccessPopupMessage = () => {
  const successPopupMessageElement = successSubmitMessage.cloneNode(true);
  bodyElement.appendChild(successPopupMessageElement);

  const handleEscClick = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      successPopupMessageElement.remove();
      document.removeEventListener('keydown', handleEscClick);
    }
  };

  successPopupMessageElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    successPopupMessageElement.remove();
    document.removeEventListener('keydown', handleEscClick);
  });
  document.addEventListener('keydown', handleEscClick);
};

export const getErrorPopupMessage = () => {
  const errorPopupMessageElement = errorSubmitMessage.cloneNode(true);
  const errorButton = errorPopupMessageElement.querySelector('.error__button');
  bodyElement.appendChild(errorPopupMessageElement);

  const handleEscClick = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      errorPopupMessageElement.remove();
      document.removeEventListener('keydown', handleEscClick);
    }
  };

  errorPopupMessageElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    errorPopupMessageElement.remove();
    document.removeEventListener('keydown', handleEscClick);
  });
  document.addEventListener('keydown', handleEscClick);
  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    errorPopupMessageElement.remove();
    document.removeEventListener('keydown', handleEscClick);
  });
};
