import {COORDS_OF_TOKIO} from './data.js';
import {getErrorPopupMessage, getSuccessPopupMessage} from './form-submit-messages.js';
import {addPoints, mainMarker, removePoints, renderAdListOnMap} from './map.js';
import {mapFiltersForm} from './filters.js';
import {getAdList} from './create-fetch.js';

export const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('.ad-form>fieldset');
export const addressInput = adForm.querySelector('#address');
const mapFiltersFormFieldsets = mapFiltersForm.querySelectorAll('.map__filters>fieldset');
const mapFiltersFormSelects = mapFiltersForm.querySelectorAll('.map__filter');
export const titleInput = document.querySelector('#title');
export const priceInput = adForm.querySelector('#price');
export const typeOfProperty = adForm.querySelector('#type');
const typeOfPropertyOptions = typeOfProperty.querySelectorAll('option');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const capacitySelect = adForm.querySelector('#capacity');
const capacityOptions = capacitySelect.querySelectorAll('option');

const roomNumberSelect = adForm.querySelector('#room_number');

export const minPriceOfPropertyType = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000',
};

const guestsCapacity = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

export const activatePage = () => {

  adForm.classList.remove('ad-form--disabled');

  for (let index = 0; index < adFormFieldsets.length; index++) {
    adFormFieldsets[index].removeAttribute('disabled');
  }
  getAdList(addPoints).then(()=>{
    renderAdListOnMap();});
};

export const activateFilters = () => {

  mapFiltersForm.classList.remove('ad-form--disabled');

  for (let index = 0; index < mapFiltersFormFieldsets.length; index++) {
    mapFiltersFormFieldsets[index].removeAttribute('disabled');
  }
  for (let index = 0; index < mapFiltersFormSelects.length; index++) {
    mapFiltersFormSelects[index].removeAttribute('disabled');
  }
};

export const unactivatePage = (filtersUnactivator) => {

  adForm.classList.add('ad-form--disabled');

  for (let index = 0; index < adFormFieldsets.length; index++) {
    adFormFieldsets[index].setAttribute('disabled', 'disabled');
  }
  filtersUnactivator();
};

export const unactivateFilters = () => {

  mapFiltersForm.classList.add('ad-form--disabled');

  for (let index = 0; index < mapFiltersFormFieldsets.length; index++) {
    mapFiltersFormFieldsets[index].setAttribute('disabled', 'disabled');
  }
  for (let index = 0; index < mapFiltersFormSelects.length; index++) {
    mapFiltersFormSelects[index].setAttribute('disabled', 'disabled');
  }
};

titleInput.addEventListener('input', () => {
  if (titleInput.value.length < titleInput.minlength) {
    titleInput.setCustomValidity(`Минимальная длина заголовка ${titleInput.minlength} символов. Осталось ${titleInput.minlength - titleInput.value.length}.`);
  } else if (titleInput.value.length > titleInput.maxlength) {
    titleInput.setCustomValidity(`Максимальная длина заголовка ${titleInput.maxlength} символов.`);
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
});

priceInput.addEventListener('input', () => {

  if (+priceInput.value > +priceInput.max) {
    priceInput.setCustomValidity(`Цена не должна превышать ${priceInput.max}.`);
  } else if (+priceInput.value < +priceInput.min) {
    priceInput.setCustomValidity(`Цена не должна быть меньше ${priceInput.min}.`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
});

typeOfProperty.addEventListener('change', (evt) => {
  priceInput.min = `${minPriceOfPropertyType[evt.target.value]}`;
  priceInput.placeholder = `${minPriceOfPropertyType[evt.target.value]}`;
});

timeIn.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
});
timeOut.addEventListener('change', (evt) => {
  timeIn.value = evt.target.value;
});

const setGuestCapacity = (rooms) => {
  capacityOptions.forEach((item) => {
    if (item.value === guestsCapacity[rooms][0]) {
      item.selected = true;
    }
  });
};

export const switchGuestsCapacity = (rooms) => {
  setGuestCapacity(rooms);
  capacityOptions.forEach((item) => {
    item.disabled = !guestsCapacity[rooms].includes(`${item.value}`);
  });
};

switchGuestsCapacity('1');

roomNumberSelect.addEventListener('change', (evt) => {
  switchGuestsCapacity(evt.target.value);
});

export const setFormSubmit = (onSuccess, onError) => {

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    fetch('https://23.javascript.pages.academy/keksobooking', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          onSuccess();
        } else {
          throw new Error(`${response.status} ${response.statusText}`);
        }
      })
      .then(() => getSuccessPopupMessage())
      .catch(() => onError());
  });
};

const setDefaultPriceValue = () => {
  typeOfPropertyOptions.forEach((item) => {
    if (item.selected) {
      priceInput.min = '1000';
      priceInput.placeholder = '1000';
    }
  });
};

const setDefaultMapParameters = () => {
  mainMarker.setLatLng(COORDS_OF_TOKIO);
  setTimeout(() => {
    addressInput.value = `${COORDS_OF_TOKIO.lat.toFixed(5)}, ${COORDS_OF_TOKIO.lng.toFixed(5)}`;
  }, 0);
};

export const setDefaultFormParameters = () => {
  adForm.reset();
  mapFiltersForm.reset();
  removePoints();
  getAdList(addPoints);
  setDefaultMapParameters();
  setDefaultPriceValue();
  switchGuestsCapacity('1');
};

setFormSubmit(setDefaultFormParameters, getErrorPopupMessage);

adForm.addEventListener('reset', () => {
  setDefaultFormParameters();
});
