"use strict";
const quantityPhotos = 3;

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const getRandomItem = (items) => {
  const randomValue = getRandomNumber(0, items.length);
  return items[randomValue];
};

const getFeatures = () => {
  let randomValue = getRandomNumber(0, FEATURES.length);
  let features = [];

  for (let i = 0; i < randomValue; i++) {
    const featureElement = FEATURES[getRandomNumber(0, randomValue)];
    features.push(featureElement);
  }

  return features;
};

const getPhotos = () => {
  let photos = [];

  for (let i = 0; i <= getRandomNumber(0, quantityPhotos - 1); i++) {
    let photo = `http://o0.github.io/assets/images/tokyo/hotel${i + 1}.jpg`;
    photos.push(photo);
  }

  return photos;
};

const setAddress = ({valueX, valueY}) => {
  document.querySelector(`#address`).value = `${valueX}, ${valueY}`;
  document.querySelector(`#address`).readOnly = true;
};

const getAddress = () => {
  const valueX = pinMain.offsetLeft + Math.floor(SizeMainPin.WIDTH / 2);
  const valueY = pinMain.offsetTop + (!isPageActive ? Math.floor(SizeMainPin.HEIGHT / 2) : Math.floor(SizeMainPin.HEIGHT + SizeMainPin.AFTER));

  return {valueX, valueY};
};

const getPins = (count) => {
  const pins = [];

  for (let i = 0; i < count; i++) {
    const pin = getPin(i);
    pins.push(pin);
  }

  return pins;
};
