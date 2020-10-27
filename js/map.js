"use strict";
const pinsContainer = document.querySelector(`.map__pins`);

const SizePin = {
  WIDTH: 50,
  HEIGHT: 70
};

const addPinEvent = (element, pin) => {
  element.addEventListener(`click`, function () {
    renderPopup(pin);
  });
};

const renderPins = (pins) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < pins.length; i++) {
    const pin = pins[i];
    var element = pinTemplate.cloneNode(true);
    element.querySelector(`img`).src = pin.author.avatar;

    element.style.left = `${pin.locations.x - Math.floor(SizePin.WIDTH / 2)}px`;
    element.style.top = `${pin.locations.y - SizePin.HEIGHT}px`;

    addPinEvent(element, pin);

    fragment.appendChild(element);
  }

  pinsContainer.appendChild(fragment);
};

