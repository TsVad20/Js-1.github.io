import {renameTypeOfProperty} from './data.js';

export const createPopup = (item) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);
  const {
    author,
    offer,
  } = item;
  const popupTitle = popupElement.querySelector('.popup__title');
  const popupTextAddress = popupElement.querySelector('.popup__text--address');
  const popupTextPrice = popupElement.querySelector('.popup__text--price');
  const popupType = popupElement.querySelector('.popup__type');
  const popupTextCapacity = popupElement.querySelector('.popup__text--capacity');
  const popupTextTime = popupElement.querySelector('.popup__text--time');
  const popupFeaturesList = popupElement.querySelector('.popup__features');
  const featureListElements = popupFeaturesList.querySelectorAll('.popup__feature');
  const popupDescription = popupElement.querySelector('.popup__description');
  const newAdPhotoBlock = popupElement.querySelector('.popup__photos');
  const adPhoto = popupElement.querySelector('.popup__photo');
  const popupAvatar = popupElement.querySelector('.popup__avatar');

  (!offer.title) ? popupTitle.classList.add('hidden'): popupTitle.textContent = offer.title;
  (!offer.address) ? popupTextAddress.classList.add('hidden'): popupTextAddress.textContent = offer.address;
  (!offer.price) ? popupTextPrice.classList.add('hidden'): popupTextPrice.textContent = `${offer.price} ₽/ночь`;
  (!offer.type) ? popupType.classList.add('hidden'): popupType.textContent = renameTypeOfProperty[offer.type];
  (!offer.rooms || !offer.guests) ? popupTextCapacity.classList.add('hidden'): popupTextCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  (!offer.checkin || !offer.checkout) ? popupTextTime.classList.add('hidden'): popupTextTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  (!offer.description) ? popupDescription.classList.add('hidden'): popupDescription.textContent = offer.description;

  if (!offer.features) {
    popupFeaturesList.classList.add('hidden');
  } else {

    const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);


    for (const dataFeatureItem of featureListElements) {
      const modifier = dataFeatureItem.classList[1];
      if (!modifiers.includes(modifier)) {
        dataFeatureItem.remove();
      }
    }
  }

  if (!offer.photos || offer.photos === []) {
    newAdPhotoBlock.classList.add('hidden');
  } else {
    for (let photo = 0; photo < offer.photos.length; photo++) {
      const newAdPhoto = adPhoto.cloneNode(true);
      newAdPhoto.src = offer.photos[photo];
      newAdPhotoBlock.appendChild(newAdPhoto);
    }
    adPhoto.remove();
  }

  if (!author.avatar) {
    popupAvatar.classList.add('hidden');
  } else {
    popupAvatar.src = author.avatar;
    popupAvatar.alt = 'avatar пользователя';
  }
  return popupElement;
};
