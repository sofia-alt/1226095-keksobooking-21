"use strict";

(() => {
  const TITLES = [`Title1`, `Title2`, `Title3`, `Title4`, `Title5`];
  const TIMES = [`12:00`, `13:00`, `14:00`];
  const TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const PRISES = [1000, 2000, 3000, 4000];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

  const LocationLimit = {
    X_MIN: 0,
    X_MAX: 1200,
    Y_MIN: 130,
    Y_MAX: 630
  };

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

  const getPins = (count) => {
    const pins = [];

    for (let i = 0; i < count; i++) {
      const pin = getPin(i);
      pins.push(pin);
    }

    return pins;
  };

  window.data = {
    getPins
  };


})();
