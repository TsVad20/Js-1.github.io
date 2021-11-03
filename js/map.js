import {COORDS_OF_TOKIO, RENDER_DELAY, POINTS_COUNT} from './data.js';
import {activatePage, addressInput} from './form.js';
import {createPopup} from './popup.js';
import {filterData, mapFiltersForm} from './filters.js';
import {debounce} from './utils/debounce.js';

const adMap = 'map-canvas';
const map = L.map(adMap);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const mainMarker = L.marker(
  COORDS_OF_TOKIO, {
    draggable: true,
    icon: mainPinIcon,
  },
);

const markerGroup = L.layerGroup().addTo(map);

export const removePoints = () => {
  markerGroup.clearLayers();
};

export const renderPoints = (points) => {
  points.forEach((point) => {
    const marker = L.marker(point.location, {
      icon: pinIcon,
    });
    marker.addTo(markerGroup).bindPopup(createPopup(point));
  });
};

export const addPoints = (data) => {

  renderPoints(data.slice(0, POINTS_COUNT));

  mapFiltersForm.addEventListener('change', () => {
    debounce(() => {
      removePoints();
      filterData(data);
    }, RENDER_DELAY)();
  });
};

export const renderAdListOnMap = () => {

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker.addTo(map);

  addressInput.value = `${COORDS_OF_TOKIO.lat.toFixed(5)}, ${COORDS_OF_TOKIO.lng.toFixed(5)}`;

  mainMarker.on('moveend', (evt) => {
    const {
      lat,
      lng,
    } = evt.target.getLatLng();
    addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });
};

export const loadMap = () => {
  map.on('load', () => {
    activatePage();
  })
    .setView(COORDS_OF_TOKIO, 10);
};
