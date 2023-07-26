import './public/scss/style.scss';
import { initAll, Accordion } from '../node_modules/govuk-frontend/govuk/all';

// eslint-disable-next-line func-names
Accordion.prototype.setInitialState = function () {};

initAll();
