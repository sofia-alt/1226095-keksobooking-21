"use strict";

(() => {
  const SizePin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const addPinEvent = (element, pin) => {
    element.addEventListener(`click`, function () {
      window.card.renderPopup(pin);
    });
  };

  const getElement = (pin) => {
    const element = pinTemplate.cloneNode(true);
    element.querySelector(`img`).src = pin.author.avatar;

    element.style.left = `${pin.locations.x - Math.floor(SizePin.WIDTH / 2)}px`;
    element.style.top = `${pin.locations.y - SizePin.HEIGHT}px`;

    addPinEvent(element, pin);

    return element;
  };

  window.pin = {
    getElement
  };

})();
