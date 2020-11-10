"use strict";
(() => {
  let popupElement = null;

  const popupTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

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

  const closePopup = () => {
    if (popupElement !== null) {
      popupElement.remove();
      popupElement = null;
    }
  };

  const renderPopup = (pin) => {
    closePopup();

    popupElement = popupTemplate.cloneNode(true);

    popupElement.querySelector(`.popup__title`).textContent = pin.offer.title;
    popupElement.querySelector(`.popup__text--address`).textContent = pin.offer.address;
    popupElement.querySelector(`.popup__text--price`).textContent = `${pin.offer.price}₽/ночь`;

    popupElement.querySelector(`.popup__type`).textContent = offerTypes[pin.offer.type];
    popupElement.querySelector(`.popup__text--capacity`).textContent = `${pin.offer.rooms} комнаты для ${pin.offer.guests} гостей`;
    popupElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${pin.offer.checkin}, выезд до ${pin.offer.checkout}`;

    popupElement.querySelector(`.popup__avatar`).src = pin.author.avatar;

    addPopupFeatures(popupElement.querySelector(`.popup__features`), pin.offer.features);
    popupElement.querySelector(`.popup__description`).textContent = pin.offer.description;

    addPopupPhotos(popupElement.querySelector(`.popup__photos`), pin.offer.photos);

    window.map.block.appendChild(popupElement);

    const popupCloseButton = popupElement.querySelector(`.popup__close`);

    popupCloseButton.addEventListener(`click`, function () {
      closePopup();
    });

    window.map.block.addEventListener(`keydown`, function (evt) {
      if (evt.keyCode === 27) {
        evt.preventDefault();
        closePopup();
      }
    });
  };

  window.card = {
    renderPopup,
    closePopup,
    OfferType
  };
})();

