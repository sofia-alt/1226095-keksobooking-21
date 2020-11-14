"use strict";

const pinsContainer = document.querySelector(`.map__pins`);
const block = document.querySelector(`.map`);
const mapFilters = document.querySelector(`.map__filters`);
const selectMapFilters = mapFilters.getElementsByTagName(`select`);
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

const getHousingFeatures = () => {
  return Array.from(mapFilters.querySelectorAll(`#housing-features input:checked`)).map((item) => item.value);
};

const onLoadSuccess = (pins) => {
  items = pins;
  renderPins(window.filter.getFiltred(items, housingType.value, housingPrice.value, housingRooms.value, housingGuests.value, getHousingFeatures()));
};

const render = () => {
  window.backend.load(onLoadSuccess, onLoadError);
};

const activateMap = () => {
  isPageActive = true;
  block.classList.remove(`map--faded`);
  window.form.activate();
  window.utils.changeDisabledElemetsForm(selectMapFilters);
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
  mapFilters.addEventListener(`change`, window.debounce(() => {
    resetPins();
    window.card.closePopup();
    renderPins(window.filter.getFiltred(items, housingType.value, housingPrice.value, housingRooms.value, housingGuests.value, getHousingFeatures()));
  }));
};

const fullReset = () => {
  resetPins();
  window.move.resetMainPin();
  resetPage();
  mapFilters.reset();
  window.utils.changeDisabledElemetsForm(selectMapFilters);
};

const init = () => {
  resetPage();
  changeFilters();
};

window.map = {
  getIsPageActive,
  init,
  activateMap,
  fullReset,
  block
};

