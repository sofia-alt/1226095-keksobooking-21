"use strict";

(() => {
  const COUNT_PINS = 8;

  const pinsContainer = document.querySelector(`.map__pins`);
  const block = document.querySelector(`.map`);
  const pinMain = document.querySelector(`.map__pin--main`);

  let isPageActive = false;

  const renderPins = (pins) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];
      fragment.appendChild(window.pin.getElement(pin));
    }

    pinsContainer.appendChild(fragment);
  };

  const render = () => {
    const pins = window.data.getPins(COUNT_PINS);
    renderPins(pins);
  };

  const activateMap = () => {
    isPageActive = true;
    block.classList.remove(`map--faded`);
    window.form.activate();
    render();
  };

  const resetPage = () => {
    isPageActive = false;
    block.classList.add(`map--faded`);
    window.form.reset();
  };

  const addMainPinEvent = () => {
    pinMain.addEventListener(`mousedown`, function () {
      if (!isPageActive) {
        activateMap();
      }
    });
  };

  const getIsPageActive = () => {
    return isPageActive;
  };

  window.map = {
    addMainPinEvent,
    getIsPageActive,
    resetPage,
    pinMain,
    block
  };

})();

