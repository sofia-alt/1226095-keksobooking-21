"use strict";

const COUNT_PINS = 8;
const TITLES = [`Title1`, `Title2`, `Title3`, `Title4`, `Title5`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const PRISES = [1000, 2000, 3000, 4000];
const FEATURES = [`1wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

const quantityPhotos = 3;
const pinsContainer = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapBlock = document.querySelector(`.map--faded`);
mapBlock.classList.remove(`map--faded`);

const LocationLimit = {
  X_MIN: 0,
  X_MAX: mapBlock.offsetWidth,
  Y_MIN: 130,
  Y_MAX: 630
};

const SizePin = {
  WIDTH: 50,
  HEIGHT: 70
};

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const getRandomItem = (items) => {
  const randomValue = getRandomNumber(0, items.length);
  return items[randomValue];
};

const getPin = (index) => {
  return {
    author: {
      avatar: `img/avatars/user0${index + 1}.png`,
    },
    offer: {
      title: getRandomItem(TITLES),
      address: `600, 350`,
      price: getRandomItem(PRISES),
      type: getRandomItem(TYPES),
      checkin: getRandomItem(TIMES),
      rooms: 4,
      guests: 2,
      checkout: getRandomItem(TIMES),
      features: getFeatures(FEATURES),
      description: `Some description`,
      photos: getPhotos(),
    },
    locations: {
      x: getRandomNumber(LocationLimit.X_MIN, LocationLimit.X_MAX),
      y: getRandomNumber(LocationLimit.Y_MIN, LocationLimit.Y_MAX),
    }
  };
};

const getFeatures = (features) => {
  const randomValue = getRandomNumber(0, features.length);
  for (let i = 0; i < randomValue; i++) {
    features.push(features[Math.random(0, features.length)]);
  }

  return features;
};

const getPhotos = () => {
  let photos = [];

  for (let i = 1; i <= Math.random(0, quantityPhotos); i++) {
    let photo = `http://o0.github.io/assets/images/tokyo/hotel${i}.jpg`;
    photos.push(photo);
  }

  return photos;
};

const getPins = (count) => {
  const pins = [];

  for (let i = 0; i < count; i++) {
    const pin = getPin(i);
    pins.push(pin);
  }

  return pins;
};

const getPinsFragment = (pins) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < pins.length; i++) {
    const pin = pins[i];
    var element = pinTemplate.cloneNode(true);
    element.querySelector(`img`).src = pin.author.avatar;

    element.style.left = `${pin.locations.x - Math.floor(SizePin.WIDTH / 2)}px`;
    element.style.top = `${pin.locations.y - SizePin.HEIGHT}px`;
    fragment.appendChild(element);
  }

  return fragment;
};

const renderPins = () => {
  const pins = getPins(COUNT_PINS);
  const pinsFragment = getPinsFragment(pins);
  pinsContainer.appendChild(pinsFragment);
};

mapBlock.classList.remove(`map--faded`);
renderPins();
