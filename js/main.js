import './popup.js';
import {unactivatePage, unactivateFilters} from './form.js';
import {loadMap} from './map.js';

unactivatePage(unactivateFilters);
loadMap();
