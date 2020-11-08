"use strict";

(() => {
  const pinsContainer = document.querySelector(`.map__pins`);
  const block = document.querySelector(`.map`);
  const mapFiltres = document.querySelector(`.map__filters`);
  const housingType = mapFiltres.querySelector(`#housing-type`);
  // const housingPrice = mapFiltres.querySelector(`#housing-price`);
  // const housingRooms = mapFiltres.querySelector(`#housing-rooms`);
  // const housingGuests = mapFiltres.querySelector(`#housing-guests`);
  // const housingFeatures = mapFiltres.querySelector(`#housing-features`);

  let isPageActive = false;

  let pinElements = [];

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

  const resetMainPin = () => {
    window.move.pinMain.style.left = 570 + `px`;
    window.move.pinMain.style.top = 375 + `px`;
  };

  const errorHandler = (errorMessage) => {
    let node = document.createElement(`p`);
    node.style = `z-index: 100; margin: 100px auto; text-align: center; border: 3px solid red; font-size: 30px; border-radius: 10px; width: auto; max-width: 600px; padding: 10px; background-color: white;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const onLoadSuccess = (pins) => {
    renderPins(window.filter.getFiltred(pins, housingType.value));
  };

  const render = () => {
    window.backend.load(onLoadSuccess, errorHandler);
  };

  addEventListener(`change`, function () {
    resetPins();
    window.card.closePopup();
    window.backend.load(onLoadSuccess, errorHandler);
  });

  const activateMap = () => {
    isPageActive = true;
    block.classList.remove(`map--faded`);
    window.form.activate();
    render();
  };

  const resetPage = () => {
    isPageActive = false;
    block.classList.add(`map--faded`);
  };

  const getIsPageActive = () => {
    return isPageActive;
  };

  const fullReset = () => {
    resetPins();
    resetMainPin();
    resetPage();
  };

  window.map = {
    getIsPageActive,
    resetPage,
    activateMap,
    fullReset,
    errorHandler,
    resetMainPin,
    block
  };

})();

