"use strict";

const COUNT_PINS = 8;
const TITLES = [`Title1`, `Title2`, `Title3`, `Title4`, `Title5`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const PRISES = [1000, 2000, 3000, 4000];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

const quantityPhotos = 3;
const pinsContainer = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const popupTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const pinMain = document.querySelector(`.map__pin--main`);
const mapBlock = document.querySelector(`.map--faded`);
const formInfo = document.querySelector(`.ad-form`);
const adressField = document.querySelector(`#address`);

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

const OfferType = {
  FLAT: `flat`,
  BUNGALOW: `bungalow`,
  HOUSE: `house`,
  PALACE: `palace`
};

const offerTypes = {
  [OfferType.FLAT]: `Квартира`,
  [OfferType.BUNGALOW]: `Бунгало`,
  [OfferType.HOUSE]: `Дом`,
  [OfferType.PALACE]: `Дворец`,
};

const sizeMainPinInactive = {
  WIDTH: 200,
  HEIGHT: 200
};

const sizeMainPinActive = {
  WIDTH: 62,
  HEIGHT: 87
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

  for (let i = 0; i <= getRandomNumber(0, quantityPhotos); i++) {
    let photo = `http://o0.github.io/assets/images/tokyo/hotel${i + 1}.jpg`;
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

const renderPins = (pins) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < pins.length; i++) {
    const pin = pins[i];
    var element = pinTemplate.cloneNode(true);
    element.querySelector(`img`).src = pin.author.avatar;

    element.style.left = `${pin.locations.x - Math.floor(SizePin.WIDTH / 2)}px`;
    element.style.top = `${pin.locations.y - SizePin.HEIGHT}px`;
    fragment.appendChild(element);
  }

  pinsContainer.appendChild(fragment);
};

const addPopupFeatures = (featuresElement, features) => {
  if (!features.length) {
    featuresElement.remove();
    return;
  }

  const featureTemplate = featuresElement.querySelector(`.popup__feature`);
  featuresElement.innerHTML = ` `;

  features.forEach((feature) => {
    const featureElement = featureTemplate.cloneNode(true);
    featureElement.className = `popup__feature popup__feature--${feature}`;
    featuresElement.appendChild(featureElement);
  });
};

const addPopupPhotos = (photosElement, photos) => {
  if (!photos.length) {
    photosElement.remove();
    return;
  }

  const photoTemplate = photosElement.querySelector(`.popup__photo`);
  photosElement.innerHTML = ` `;

  photos.forEach((photo) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.src = `${photo}`;
    photosElement.appendChild(photoElement);
  });
};

const renderPopup = (pins) => {
  if (pins.length === 0) {
    return;
  }
  const pin = pins[0];
  var popupElement = popupTemplate.cloneNode(true);

  popupElement.querySelector(`.popup__title`).textContent = pin.offer.title;
  popupElement.querySelector(`.popup__text--address`).textContent = pin.offer.address;
  popupElement.querySelector(`.popup__text--price`).textContent = `${pin.offer.price}₽/ночь`;

  popupElement.querySelector(`.popup__type`).textContent = offerTypes[pin.offer.type];
  popupElement.querySelector(`.popup__text--capacity`).textContent = `${pin.offer.rooms} комнаты для ${pin.offer.guests} гостей`;
  popupElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${pin.offer.checkin}, выезд до ${pin.offer.checkout}`;

  addPopupFeatures(popupElement.querySelector(`.popup__features`), pin.offer.features);
  popupElement.querySelector(`.popup__description`).textContent = pin.offer.description;

  addPopupPhotos(popupElement.querySelector(`.popup__photos`), pin.offer.photos);

  mapBlock.appendChild(popupElement);
};


const render = () => {
  const pins = getPins(COUNT_PINS);
  renderPins(pins);
  renderPopup(pins);
};

pinMain.addEventListener(`mousedown`, function () {
  if (mapBlock.classList.contains(`map--faded`)) {
    mapBlock.classList.remove(`map--faded`);
    formInfo.classList.remove(`ad-form--disabled`);
    render();
  }
});
