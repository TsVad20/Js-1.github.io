import {POINTS_COUNT, PRICE_FILTER_RANGES} from './data.js';
import {renderPoints} from './map.js';

export const mapFiltersForm = document.querySelector('.map__filters');
const housingTypeInput = mapFiltersForm.querySelector('#housing-type');
const housingPriceInput = mapFiltersForm.querySelector('#housing-price');
const housingRoomsInput = mapFiltersForm.querySelector('#housing-rooms');
const housingGuestsInput = mapFiltersForm.querySelector('#housing-guests');

const filterSelect = (filterValue, dataValue) => filterValue === 'any' || `${filterValue}` === `${dataValue}`;
const priceSelect = (filterValue, dataValue) => filterValue === 'any' || PRICE_FILTER_RANGES[filterValue].min <= dataValue && dataValue < PRICE_FILTER_RANGES[filterValue].max;
const selectFeatures = (filterValue, dataValue) => filterValue.every((feature) => dataValue.includes(feature));

export const filterData = (data) => {
  const checkedFeatures = Array.from(mapFiltersForm.querySelectorAll('.map__checkbox:checked')).map((element) => element.value);
  const filteredData = data.filter((item) => {

    const typeValue = item.offer.type ? item.offer.type : '';
    const priceValue = item.offer.price ? item.offer.price : '';
    const roomsValue = item.offer.rooms ? item.offer.rooms : '';
    const guestsValue = item.offer.guests ? item.offer.guests : '';
    const featuresValue = item.offer.features ? item.offer.features : [];

    return filterSelect(housingTypeInput.value, typeValue) && priceSelect(housingPriceInput.value, priceValue) && filterSelect(housingRoomsInput.value, roomsValue) && filterSelect(housingGuestsInput.value, guestsValue) && selectFeatures(checkedFeatures, featuresValue);
  });
  renderPoints(filteredData.slice(0, POINTS_COUNT));
};
