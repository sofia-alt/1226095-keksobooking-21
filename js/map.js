"use strict";

const pinsContainer = document.querySelector(`.map__pins`);
const block = document.querySelector(`.map`);
const mapFilters = document.querySelector(`.map__filters`);
const selectMapFilters = mapFilters.getElementsByTagName(`select`);
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

const onLoadSuccess = (pins) => {
  items = pins;
  renderPins(window.filter.getResult(items));
};

const render = () => {
  window.backend.load(onLoadSuccess, onLoadError);
};

const resetFilters = () => {
  window.utils.changeDisabledElemetsForm(selectMapFilters);
  window.utils.changeDisabledElemetsForm(fieldsetMapFilters);
};

const activate = () => {
  isPageActive = true;
  block.classList.remove(`map--faded`);
  window.form.activate();
  resetFilters();
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
    renderPins(window.filter.getResult(items));
  }));
};

const fullReset = () => {
  resetPins();
  window.move.resetMainPin();
  resetPage();
  resetFilters();
  mapFilters.reset();
};

const init = () => {
  fullReset();
  changeFilters();
};

window.map = {
  getIsPageActive,
  init,
  activate,
  fullReset,
  block
};

