"use strict";

(() => {
  // const COUNT_PINS = 8;

  const pinsContainer = document.querySelector(`.map__pins`);
  const block = document.querySelector(`.map`);

  let isPageActive = false;

  const renderPins = (pins) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];
      fragment.appendChild(window.pin.getElement(pin));
    }

    pinsContainer.appendChild(fragment);
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

  const render = () => {
    window.backend.load(renderPins, errorHandler);
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

  const getIsPageActive = () => {
    return isPageActive;
  };

  window.map = {
    getIsPageActive,
    resetPage,
    activateMap,
    block
  };

})();

