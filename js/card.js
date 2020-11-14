"use strict";

const popupTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const ESC_KEY = 27;

const OfferType = {
  FLAT: `flat`,
  BUNGALOW: `bungalow`,
  HOUSE: `house`,
  PALACE: `palace`
};

const offerTypesDictionary = {
  [OfferType.FLAT]: `Квартира`,
  [OfferType.BUNGALOW]: `Бунгало`,
  [OfferType.HOUSE]: `Дом`,
  [OfferType.PALACE]: `Дворец`,
};

let popupElement = null;

const addPopupFeatures = (featuresElement, features) => {
  if (!features.length) {
    featuresElement.remove();
    return;
  }

  const featureTemplate = featuresElement.querySelector(`.popup__feature`);
  featuresElement.innerHTML = ``;

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
  photosElement.innerHTML = ``;

  photos.forEach((photo) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.src = `${photo}`;
    photosElement.appendChild(photoElement);
  });
};

const onBlockKeyDown = (evt) => {
  if (evt.keyCode === ESC_KEY) {
    evt.preventDefault();
    closePopup();
  }
};

const closePopup = () => {
  if (popupElement !== null) {
    popupElement.remove();
    popupElement = null;
    window.pin.resetActiveElement();
    window.map.block.removeEventListener(`keydown`, onBlockKeyDown);
  }
};

const renderPopup = (pin) => {
  closePopup();

  const {offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}, author: {avatar}} = pin;

  popupElement = popupTemplate.cloneNode(true);

  popupElement.querySelector(`.popup__title`).textContent = title;
  popupElement.querySelector(`.popup__text--address`).textContent = address;
  popupElement.querySelector(`.popup__text--price`).textContent = `${price}₽/ночь`;

  popupElement.querySelector(`.popup__type`).textContent = offerTypesDictionary[type];
  popupElement.querySelector(`.popup__text--capacity`).textContent = `${rooms} комнаты для ${guests} гостей`;
  popupElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;

  popupElement.querySelector(`.popup__avatar`).src = avatar;

  addPopupFeatures(popupElement.querySelector(`.popup__features`), features);
  popupElement.querySelector(`.popup__description`).textContent = description;

  addPopupPhotos(popupElement.querySelector(`.popup__photos`), photos);

  window.map.block.appendChild(popupElement);

  const popupCloseButton = popupElement.querySelector(`.popup__close`);

  popupCloseButton.addEventListener(`click`, () => {
    closePopup();
  });

  window.map.block.addEventListener(`keydown`, onBlockKeyDown);
};


window.card = {
  renderPopup,
  closePopup,
  OfferType
};
