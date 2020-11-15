"use strict";

const pinsContainer = document.querySelector(`.map__pins`);
const block = document.querySelector(`.map`);
const mapFilters = document.querySelector(`.map__filters`);
const selectMapFilters = mapFilters.getElementsByTagName(`select`);
<<<<<<< HEAD
const fieldsetMapFilters = mapFilters.getElementsByTagName(`fieldset`);

let isPageActive = false;

let pinElements = [];
let items = [];

const renderPins = (pins) => {
  const fragment = document.createDocumentFragment();

  pins.forEach((pin) => {
    const pinElement = window.pin.getElement(pin);
    pinElements.push(pinElement);
    fragment.appendChild(pinElement);
  });

  pinsContainer.appendChild(fragment);
};

const resetPins = () => {
  pinElements.forEach((pin) => {
    pin.remove();
  });

=======
const housingType = mapFilters.querySelector(`#housing-type`);
const housingPrice = mapFilters.querySelector(`#housing-price`);
const housingRooms = mapFilters.querySelector(`#housing-rooms`);
const housingGuests = mapFilters.querySelector(`#housing-guests`);

let isPageActive = false;

let pinElements = [];
let items = [];

const renderPins = (pins) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < pins.length; i++) {
    const pin = pins[i];
    const pinElement = window.pin.getElement(pin);
    pinElements.push(pinElement);
    fragment.appendChild(pinElement);
  }

  pinsContainer.appendChild(fragment);
};

const resetPins = () => {
  pinElements.forEach((pin) => {
    pin.remove();
  });

>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89
  pinElements = [];
};

const onLoadError = (errorMessage) => {
  const node = document.createElement(`p`);
  node.style = `z-index: 100; margin: 100px auto; text-align: center; border: 3px solid red; font-size: 30px; border-radius: 10px; width: auto; max-width: 600px; padding: 10px; background-color: white;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

<<<<<<< HEAD
const onLoadSuccess = (pins) => {
  items = pins;
  renderPins(window.filter.getResult(items));
=======
const getHousingFeatures = () => {
  return Array.from(mapFilters.querySelectorAll(`#housing-features input:checked`)).map((item) => item.value);
};

const onLoadSuccess = (pins) => {
  items = pins;
  renderPins(window.filter.getFiltred(items, housingType.value, housingPrice.value, housingRooms.value, housingGuests.value, getHousingFeatures()));
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89
};

const render = () => {
  window.backend.load(onLoadSuccess, onLoadError);
};

<<<<<<< HEAD
const resetFilters = () => {
  window.utils.changeDisabledElemetsForm(selectMapFilters);
  window.utils.changeDisabledElemetsForm(fieldsetMapFilters);
};

const activate = () => {
  isPageActive = true;
  block.classList.remove(`map--faded`);
  window.form.activate();
  resetFilters();
=======
const activateMap = () => {
  isPageActive = true;
  block.classList.remove(`map--faded`);
  window.form.activate();
  window.utils.changeDisabledElemetsForm(selectMapFilters);
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89
  render();
};

const resetPage = () => {
  isPageActive = false;
  block.classList.add(`map--faded`);
};

const getIsPageActive = () => {
  return isPageActive;
};

const changeFilters = () => {
  mapFilters.addEventListener(`change`, window.utils.debounce(() => {
    resetPins();
    window.card.closePopup();
<<<<<<< HEAD
    renderPins(window.filter.getResult(items));
=======
    renderPins(window.filter.getFiltred(items, housingType.value, housingPrice.value, housingRooms.value, housingGuests.value, getHousingFeatures()));
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89
  }));
};

const fullReset = () => {
  resetPins();
  window.move.resetMainPin();
  resetPage();
<<<<<<< HEAD
  resetFilters();
  mapFilters.reset();
};

const init = () => {
  fullReset();
=======
  mapFilters.reset();
  window.utils.changeDisabledElemetsForm(selectMapFilters);
};

const init = () => {
  resetPage();
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89
  changeFilters();
};

window.map = {
  getIsPageActive,
  init,
<<<<<<< HEAD
  activate,
=======
  activateMap,
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89
  fullReset,
  block
};

