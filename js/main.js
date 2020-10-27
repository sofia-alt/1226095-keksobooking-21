"use strict";

let isPageActive = false;
const COUNT_PINS = 8;
const mapBlock = document.querySelector(`.map--faded`);
const fieldsetFormInfo = formInfo.getElementsByTagName(`fieldset`);

const mapFilters = document.querySelector(`.map__filters`);
const selectMapFilters = mapFilters.getElementsByTagName(`select`);

const render = () => {
  const pins = getPins(COUNT_PINS);
  renderPins(pins);
  renderPopup(pins[0]);
};

const activatePage = () => {
  isPageActive = true;
  mapBlock.classList.remove(`map--faded`);
  formInfo.classList.remove(`ad-form--disabled`);
  changeElementDisabledFormInfo(fieldsetFormInfo);
  changeElementDisabledMapFilters(selectMapFilters);
  updateAddress();
  render();
};

const resetPage = () => {
  isPageActive = false;
  mapBlock.classList.add(`map--faded`);
  formInfo.classList.add(`ad-form--disabled`);
  changeElementDisabledFormInfo(fieldsetFormInfo);
  changeElementDisabledMapFilters(selectMapFilters);
  updateAddress();
};

const addMainPinEvent = () => {
  pinMain.addEventListener(`mousedown`, function () {
    if (!isPageActive) {
      activatePage();
    }
  });
};

const changeElementDisabledMapFilters = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = !isPageActive;
  }
};

const changeElementDisabledFormInfo = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = !isPageActive;
  }
};


resetPage();
addMainPinEvent();
addFormEvent();
addEventTitleForm();
