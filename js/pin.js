"use strict";

const SizePin = {
  WIDTH: 50,
  HEIGHT: 70
};

const template = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

let elementActive = null;

const addPinEvent = (element, pin) => {
  element.addEventListener(`click`, () => {
    window.card.renderPopup(pin);
    addActiveClass(element);
  });
};

const resetActiveElement = () => {
  if (elementActive !== null) {
    elementActive.classList.remove(`map__pin--active`);
    elementActive = null;
  }
};

const addActiveClass = (element) => {
  if (elementActive === null) {
    elementActive = element;
    elementActive.classList.add(`map__pin--active`);
  }
};

const getElement = (pin) => {
  const {location: {x, y}} = pin;
  const element = template.cloneNode(true);
  element.querySelector(`img`).src = pin.author.avatar;

  element.style.left = `${x - Math.floor(SizePin.WIDTH / 2)}px`;
  element.style.top = `${y - SizePin.HEIGHT}px`;

  addPinEvent(element, pin);

  return element;
};

window.pin = {
  getElement,
  resetActiveElement
};

