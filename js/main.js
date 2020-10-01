"use strict";

let objCreator = function () {
  const getRandom = (min, max) => Math.round(Math.random() * (max - min) + min);
  const getAvatar = i => `img/avatars/user0${i}.png`;
  const getCheckin = () => [`12:00`, `13:00`, `14:00`][getRandom(0, 3)];
  const getType = () => [`palace`, `flat`, `house`, `bungalow`][getRandom(0, 4)];
  const getFeatures = () => [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`].filter(() => Math.random() > 0.5);
  const getPhotos = () => [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`].filter(() => Math.random() > 0.5);

  const result = [];

  for (let i = 0; i < 8; i++) {
    const obj = {
      author: {
        avatar: getAvatar(i + 1),
      },
      offer: {
        title: `some string`,
        address: `600, 350`,
        price: 1000,
        type: getType(),
        rooms: 4,
        guests: 25,
        checkin: getCheckin(),
        checkout: getCheckin(),
        features: getFeatures(),
        description: `Some description`,
        photos: getPhotos()
      },
      locations: {
        x: getRandom(130, 630),
        y: getRandom(130, 630),
      }
    };
    result.push(obj);
  }
  return result;
};

let mapBlock = document.querySelectorAll(`.map--faded`);
mapBlock.classList.remove(`map--faded`);
