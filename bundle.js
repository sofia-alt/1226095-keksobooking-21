<<<<<<< HEAD
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const DEBOUNCE_INTERVAL = 500;

const changeDisabledElemetsForm = (elements) => {
  const isPageActive = window.map.getIsPageActive();
  Array.from(elements).forEach((element) => {
    element.disabled = !isPageActive;
  });
};

const debounce = (cb) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};


window.utils = {
  changeDisabledElemetsForm,
  debounce
};

})();

(() => {
/*!***********************!*\
  !*** ./js/backend.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking`;

const TIMEOUT_IN_MS = 10000;

const StatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404
};

const HttpRequest = {
  GET: `GET`,
  POST: `POST`
};

const getInstance = (onSuccess, onError) => {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    let error;
    switch (xhr.status) {
      case StatusCode.OK:
        onSuccess(xhr.response);
        break;
      case StatusCode.BAD_REQUEST:
        error = `Неверный запрос`;
        break;
      case StatusCode.UNAUTHORIZED:
        error = `Пользователь не авторизован`;
        break;
      case StatusCode.NOT_FOUND:
        error = `Ничего не найдено`;
        break;

      default:
        error = `Cтатус ответа: : ${xhr.status} ${xhr.statusText}`;
    }

    if (error) {
      onError(error);
    }
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  return xhr;
};

const load = (onSuccess, onError) => {
  const xhr = getInstance(onSuccess, onError);

  xhr.open(HttpRequest.GET, URL_LOAD);
  xhr.send();
};

const upload = (data, onSuccess, onError) => {
  const xhr = getInstance(onSuccess, onError);

  xhr.open(HttpRequest.POST, URL_UPLOAD);
  xhr.send(data);
};

window.backend = {
  load,
  upload
};

})();

(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const ANY_VALUE = `any`;
const COUNT_PIN = 5;

const housingTypeElement = document.querySelector(`.map__filters #housing-type`);
const housingPriceElement = document.querySelector(`.map__filters #housing-price`);
const housingRoomsElement = document.querySelector(`.map__filters #housing-rooms`);
const housingGuestsElement = document.querySelector(`.map__filters #housing-guests`);

const PriceValue = {
  MIDDLE_MIN: 10000,
  MIDDLE_MAX: 50000,
  LOW: 10000,
  HIGH: 50000
};

const PriceName = {
  MIDDLE: `middle`,
  LOW: `low`,
  HIGH: `high`
};

const getHousingFeatures = () => {
  return Array.from(document.querySelectorAll(`.map__filters #housing-features input:checked`));
};

const isAvaliableHouseType = (pin, housingType) => {
  return housingType === ANY_VALUE || pin.offer.type === housingType;
};

const isAvaliablePrice = (pin, housingPrice) => {
  switch (housingPrice) {
    case PriceName.MIDDLE: return pin.offer.price >= PriceValue.MIDDLE_MIN && pin.offer.price <= PriceValue.MIDDLE_MAX;
    case PriceName.LOW: return pin.offer.price < PriceValue.LOW;
    case PriceName.HIGH: return pin.offer.price > PriceValue.HIGH;
    default: return housingPrice === ANY_VALUE;
  }
};

const isAvaliableRooms = (pin, housingRooms) => {
  return housingRooms === ANY_VALUE || pin.offer.rooms === parseInt(housingRooms, 10);
};

const isAvaliableGuests = (pin, housingGuests) => {
  return housingGuests === ANY_VALUE || pin.offer.guests === parseInt(housingGuests, 10);
};

const isAvaliableFeatures = (pin, housingFeatures) => {
  return housingFeatures.every((feature) => pin.offer.features.includes(feature.value));
};

const getResult = (pins) => {
  const result = [];

  for (let i = 0; i < pins.length; i++) {
    const pin = pins[i];

    const isFiltred = isAvaliableHouseType(pin, housingTypeElement.value) && isAvaliablePrice(pin, housingPriceElement.value) && isAvaliableRooms(pin, housingRoomsElement.value) && isAvaliableGuests(pin, housingGuestsElement.value)
      && isAvaliableFeatures(pin, getHousingFeatures());

    if (isFiltred) {
      result.push(pin);

      if (result.length === COUNT_PIN) {
        break;
      }
    }
  }

  return result;
};

window.filter = {
  getResult
};

})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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


})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const ESC_KEY = 27;

const formInfo = document.querySelector(`.ad-form`);
const fieldsetFormInfo = formInfo.getElementsByTagName(`fieldset`);
const roomNumber = formInfo.querySelector(`#room_number`);
const capacity = formInfo.querySelector(`#capacity`);

const titleInput = formInfo.querySelector(`#title`);
const timeinFormInfo = formInfo.querySelector(`#timein`);
const timeoutFormInfo = formInfo.querySelector(`#timeout`);

const typeHousing = formInfo.querySelector(`#type`);
const priceHousing = formInfo.querySelector(`#price`);

const address = formInfo.querySelector(`#address`);

const resetForm = formInfo.querySelector(`.ad-form__reset`);

const errorPopup = document.querySelector(`#error`).content.querySelector(`.error`);
const successPopup = document.querySelector(`#success`).content.querySelector(`.success`);

const submitButton = formInfo.querySelector(`.ad-form__submit`);

const RoomValue = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  HUNDER: 100
};

const CapacityValue = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  ZERO: 0
};

const TitleLength = {
  MIN_LENGTH: 30,
  MAX_LENGTH: 100
};

const MinPriceHousing = {
  FLAT: 1000,
  BUNGALOW: 0,
  HOUSE: 5000,
  PALACE: 10000
};

let housingValidationInfo;
let popupMessage = null;

const initHousingValidationInfo = () => {
  housingValidationInfo = {
    [window.card.OfferType.BUNGALOW]: {
      min: MinPriceHousing.BUNGALOW,
      placeholder: MinPriceHousing.BUNGALOW,
      message: `Значение должно быть больше или равно ${MinPriceHousing.BUNGALOW}`
    },
    [window.card.OfferType.FLAT]: {
      min: MinPriceHousing.FLAT,
      placeholder: MinPriceHousing.FLAT,
      message: `Значение должно быть больше или равно ${MinPriceHousing.FLAT}`
    },
    [window.card.OfferType.HOUSE]: {
      min: MinPriceHousing.HOUSE,
      placeholder: MinPriceHousing.HOUSE,
      message: `Значение должно быть больше или равно ${MinPriceHousing.HOUSE}`
    },
    [window.card.OfferType.PALACE]: {
      min: MinPriceHousing.PALACE,
      placeholder: MinPriceHousing.PALACE,
      message: `Значение должно быть больше или равно ${MinPriceHousing.PALACE}`
    }
  };
};

const validateRooms = () => {
  const roomValue = parseInt(roomNumber.value, 10);
  const capacityValue = parseInt(capacity.value, 10);

  let message = ``;
  if (roomValue === RoomValue.ONE && capacityValue !== CapacityValue.ONE) {
    message = `Неверное количество комнат`;
  } else if (roomValue === RoomValue.TWO && !(capacityValue === CapacityValue.ONE || capacityValue === CapacityValue.TWO)) {
    message = `Неверное количество комнат`;
  } else if (roomValue === RoomValue.THREE && capacityValue === CapacityValue.ZERO) {
    message = `Неверное количество комнат`;
  } else if (roomValue === RoomValue.HUNDER && capacityValue !== CapacityValue.ZERO) {
    message = `Неверное количество комнат`;
  }

  roomNumber.setCustomValidity(message);
  roomNumber.reportValidity();

  capacity.setCustomValidity(``);
  capacity.reportValidity();
};

const validateCapacity = () => {
  const roomValue = parseInt(roomNumber.value, 10);
  const capacityValue = parseInt(capacity.value, 10);

  let message = ``;
  if (capacityValue === CapacityValue.ONE && roomValue === RoomValue.HUNDER) {
    message = `Неверное количество гостей`;
  } else if (capacityValue === CapacityValue.TWO && !(roomValue === RoomValue.TWO || roomValue === RoomValue.THREE)) {
    message = `Неверное количество гостей`;
  } else if (capacityValue === CapacityValue.THREE && roomValue !== RoomValue.THREE) {
    message = `Неверное количество гостей`;
  } else if (capacityValue === CapacityValue.ZERO && roomValue !== RoomValue.HUNDER) {
    message = `Неверное количество гостей`;
  }
  capacity.setCustomValidity(message);
  capacity.reportValidity();

  roomNumber.setCustomValidity(``);
  roomNumber.reportValidity();
};

const validateTitle = () => {
  let valueLength = titleInput.value.length;

  if (valueLength < TitleLength.MIN_LENGTH) {
    titleInput.setCustomValidity(`Ещё ` + (TitleLength.MIN_LENGTH - valueLength) + ` симв.`);
  } else if (valueLength > TitleLength.MAX_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ` + (valueLength - TitleLength.MAX_LENGTH) + ` симв.`);
  } else {
    titleInput.setCustomValidity(``);
  }

  titleInput.reportValidity();
};

const validateTimein = () => {
  timeoutFormInfo.value = timeinFormInfo.value;
};

const validateTimeout = () => {
  timeinFormInfo.value = timeoutFormInfo.value;
};

const validateHousingType = () => {
  const {min, message, placeholder} = housingValidationInfo[typeHousing.value];
  priceHousing.placeholder = placeholder;
  const priceHousingValue = parseInt(priceHousing.value, 10);

  const errorMessage = priceHousingValue < min ? message : ``;

  priceHousing.setCustomValidity(errorMessage);
  priceHousing.reportValidity();
};

const addEventFrom = () => {

  formInfo.addEventListener(`input`, (evt) => {
    switch (evt.target.id) {
      case titleInput.id:
        validateTitle();
        break;
      case priceHousing.id:
        validateHousingType();
        break;
    }
  });

  formInfo.addEventListener(`change`, (evt) => {
    switch (evt.target.id) {
      case roomNumber.id:
        validateRooms();
        break;
      case capacity.id:
        validateCapacity();
        break;
      case timeoutFormInfo.id:
        validateTimeout();
        break;
      case timeinFormInfo.id:
        validateTimein();
        break;
      case typeHousing.id:
        validateHousingType();
        break;
    }
  });
};

const activate = () => {
  formInfo.classList.remove(`ad-form--disabled`);
  window.utils.changeDisabledElemetsForm(fieldsetFormInfo);
  window.move.updateAddress();
};

const resetInput = () => {
  formInfo.reset();
  window.move.updateAddress();
  priceHousing.placeholder = MinPriceHousing.FLAT;
};

const reset = () => {
  formInfo.classList.add(`ad-form--disabled`);
  window.utils.changeDisabledElemetsForm(fieldsetFormInfo);
  window.move.updateAddress();
};

const fullReset = () => {
  window.map.fullReset();
  window.card.closePopup();
  window.photos.reset();
  reset();
  resetInput();
};

const renderMessage = (messageType) => {
  popupMessage = messageType.cloneNode(true);
  document.body.append(popupMessage);
};

const onLoadSuccess = () => {
  fullReset();
  renderMessage(successPopup);
  addEventMessage();
};


const onLoadError = () => {
  renderMessage(errorPopup);
  addEventMessage();
};

const closePopupMessage = () => {
  if (popupMessage !== null) {
    popupMessage.remove();
    popupMessage = null;
    removeEventMessage();
  }
};

const onDocumentKeyDown = (evt) => {
  if (evt.keyCode === ESC_KEY) {
    evt.preventDefault();
    closePopupMessage();
  }
};

const onDocumentClick = () => {
  closePopupMessage();
};

const addEventMessage = () => {
  document.addEventListener(`keydown`, onDocumentKeyDown);
  document.addEventListener(`click`, onDocumentClick);
};

const removeEventMessage = () => {
  document.removeEventListener(`keydown`, onDocumentKeyDown);
  document.removeEventListener(`click`, onDocumentClick);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  resetForm.blur();
  submitButton.blur();
  window.backend.upload(new FormData(formInfo), onLoadSuccess, onLoadError);
};

resetForm.addEventListener(`click`, () => {
  fullReset();
});

const setAddress = ({valueX, valueY}) => {
  address.value = `${valueX}, ${valueY}`;
};

formInfo.addEventListener(`submit`, onFormSubmit);


const init = () => {
  initHousingValidationInfo();
  reset();
  addEventFrom();

  validateRooms();
  validateCapacity();
  validateHousingType();
};

window.form = {
  activate,
  init,
  setAddress
};


})();

(() => {
/*!**********************!*\
  !*** ./js/photos.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const DEFAULT_PICTURE = `img/muffin-grey.svg`;

const fileChooserAvatar = document.querySelector(`.ad-form__field input[type=file]`);
const previewAvatar = document.querySelector(`.ad-form-header__preview img`);

const fileChooserHouse = document.querySelector(`.ad-form__upload input[type=file]`);
const previewHouse = document.querySelector(`.ad-form__photo`);

const imgHouse = document.createElement(`img`);

const loadAvatar = (result) => {
  previewAvatar.src = result;
};

const loadPreviewHouse = (result) => {
  previewHouse.appendChild(imgHouse);
  imgHouse.src = result;
  imgHouse.style.width = previewHouse.offsetWidth + `px`;
  imgHouse.style.height = previewHouse.offsetHeight + `px`;
};

const reset = () => {
  imgHouse.remove();
  previewAvatar.src = DEFAULT_PICTURE;
};

const onLoadChange = (evt, cb) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      cb(reader.result);
    });
    reader.readAsDataURL(file);
  }
};

const init = () => {
  fileChooserAvatar.addEventListener(`change`, (evt) => {
    onLoadChange(evt, loadAvatar);
  });

  fileChooserHouse.addEventListener(`change`, (evt) => {
    onLoadChange(evt, loadPreviewHouse);
  });
};

window.photos = {
  init,
  reset
};


})();

(() => {
/*!*******************!*\
  !*** ./js/map.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const pinsContainer = document.querySelector(`.map__pins`);
const block = document.querySelector(`.map`);
const mapFilters = document.querySelector(`.map__filters`);
const selectMapFilters = mapFilters.getElementsByTagName(`select`);
const fieldsetMapFilters = mapFilters.getElementsByTagName(`fieldset`);

let isPageActive = false;

let pinElements = [];
let items = [];

const renderPins = (pins) => {
  const fragment = document.createDocumentFragment();

  pins.forEach((pin) => {
    const pinElement = window.pin.getElement(pin);
    pinElements.push(pinElement);
    fragment.appendChild(pinElement);
  });

  pinsContainer.appendChild(fragment);
};

const resetPins = () => {
  pinElements.forEach((pin) => {
    pin.remove();
  });

  pinElements = [];
};

const onLoadError = (errorMessage) => {
  const node = document.createElement(`p`);
  node.style = `z-index: 100; margin: 100px auto; text-align: center; border: 3px solid red; font-size: 30px; border-radius: 10px; width: auto; max-width: 600px; padding: 10px; background-color: white;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const onLoadSuccess = (pins) => {
  items = pins;
  renderPins(window.filter.getResult(items));
};

const render = () => {
  window.backend.load(onLoadSuccess, onLoadError);
};

const resetFilters = () => {
  window.utils.changeDisabledElemetsForm(selectMapFilters);
  window.utils.changeDisabledElemetsForm(fieldsetMapFilters);
};

const activate = () => {
  isPageActive = true;
  block.classList.remove(`map--faded`);
  window.form.activate();
  resetFilters();
  render();
};

const resetPage = () => {
  isPageActive = false;
  block.classList.add(`map--faded`);
};

const getIsPageActive = () => {
  return isPageActive;
};

const changeFilters = () => {
  mapFilters.addEventListener(`change`, window.utils.debounce(() => {
    resetPins();
    window.card.closePopup();
    renderPins(window.filter.getResult(items));
  }));
};

const fullReset = () => {
  resetPins();
  window.move.resetMainPin();
  resetPage();
  resetFilters();
  mapFilters.reset();
};

const init = () => {
  fullReset();
  changeFilters();
};

window.map = {
  getIsPageActive,
  init,
  activate,
  fullReset,
  block
};


})();

(() => {
/*!********************!*\
  !*** ./js/move.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const mapOverlay = document.querySelector(`.map__overlay`);
const pinMain = document.querySelector(`.map__pin--main`);

const SizeMainPin = {
  WIDTH: 65,
  HEIGHT: 65,
  FULL_HEIGHT: 87
};

const partSizeWidth = Math.floor(SizeMainPin.WIDTH / 2);

const LocationCheckpoint = {
  X_MIN: 0,
  Y_MIN: 130,
  Y_MAX: 630
};

const LocationLimit = {
  X_MIN: LocationCheckpoint.X_MIN - partSizeWidth,
  X_MAX: mapOverlay.offsetWidth - partSizeWidth,
  Y_MIN: LocationCheckpoint.Y_MIN - SizeMainPin.FULL_HEIGHT,
  Y_MAX: LocationCheckpoint.Y_MAX - SizeMainPin.FULL_HEIGHT
};

const StartLocationMainPin = {
  LEFT: 570,
  TOP: 375
};

const pin = () => {
  pinMain.addEventListener(`keydown`, () => {
    if (!window.map.getIsPageActive()) {
      window.map.activate();
    }
  });

  pinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    if (!window.map.getIsPageActive()) {
      window.map.activate();
    }

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const offsetLeft = pinMain.offsetLeft - shift.x;
      const offsetTop = pinMain.offsetTop - shift.y;

      getAddress(offsetLeft, offsetTop);

      const isAddressValid = offsetTop >= LocationLimit.Y_MIN &&
        offsetTop <= LocationLimit.Y_MAX &&
        offsetLeft >= LocationLimit.X_MIN &&
        offsetLeft <= LocationLimit.X_MAX;

      const pinMove = () => {
        if (isAddressValid) {
          pinMain.style.left = (offsetLeft) + `px`;
          pinMain.style.top = (offsetTop) + `px`;
          window.form.setAddress(getAddress(offsetLeft, offsetTop));
        }
      };
      pinMove();
    };
    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      updateAddress();

      const onClickPreventDefault = (clickEvt) => {
        clickEvt.preventDefault();
        pinMain.removeEventListener(`click`, onClickPreventDefault);
      };
      pinMain.addEventListener(`click`, onClickPreventDefault);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
};

const getAddress = (offsetLeft, offsetTop) => {
  const valueX = offsetLeft + partSizeWidth;
  const valueY = offsetTop + (!window.map.getIsPageActive() ? Math.floor(SizeMainPin.HEIGHT / 2) : SizeMainPin.FULL_HEIGHT);

  return {
    valueX, valueY
  };
};

const resetMainPin = () => {
  pinMain.style.left = StartLocationMainPin.LEFT + `px`;
  pinMain.style.top = StartLocationMainPin.TOP + `px`;
};

const updateAddress = () => {
  const {offsetLeft, offsetTop} = pinMain;
  window.form.setAddress(getAddress(offsetLeft, offsetTop));
};

window.move = {
  pin,
  updateAddress,
  resetMainPin
};

})();

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const ESC_KEY = 27;

const popupTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

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

})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


window.map.init();
window.move.pin();
window.form.init();
window.photos.init();


})();

/******/ })()
;
=======
(()=>{"use strict";window.utils={changeDisabledElemetsForm:e=>{const t=window.map.getIsPageActive();for(let o=0;o<e.length;o++)e[o].disabled=!t},debounce:e=>{let t=null;return function(...o){t&&window.clearTimeout(t),t=window.setTimeout((function(){e(...o)}),500)}}},(()=>{const e="GET",t="POST",o=(e,t)=>{let o=new XMLHttpRequest;return o.responseType="json",o.addEventListener("load",(()=>{let n;switch(o.status){case 200:e(o.response);break;case 400:n="Неверный запрос";break;case 401:n="Пользователь не авторизован";break;case 404:n="Ничего не найдено";break;default:n="Cтатус ответа: : "+o.status+" "+o.statusText}n&&t(n)})),o.addEventListener("error",(()=>{t("Произошла ошибка соединения")})),o.addEventListener("timeout",(()=>{t("Запрос не успел выполниться за "+o.timeout+"мс")})),o.timeout=1e4,o};window.backend={load:(t,n)=>{const r=o(t,n);r.open(e,"https://21.javascript.pages.academy/keksobooking/data"),r.send()},upload:(e,n,r)=>{const s=o(n,r);s.open(t,"https://21.javascript.pages.academy/keksobooking"),s.send(e)}}})(),(()=>{const e="any",t=(t,o)=>o===e||t.offer.type===o,o=(t,o)=>{switch(o){case"middle":return t.offer.price>=1e4&&t.offer.price<=5e4;case"low":return t.offer.price<1e4;case"high":return t.offer.price>5e4;default:return o===e}},n=(t,o)=>o===e||t.offer.rooms===parseInt(o,10),r=(t,o)=>o===e||t.offer.guests===parseInt(o,10),s=(e,t)=>t.every((t=>e.offer.features.includes(t)));window.filter={getFiltred:(e,a,i,d,l,c)=>{const u=[];for(let p=0;p<e.length;p++){const m=e[p];if(t(m,a)&&o(m,i)&&n(m,d)&&r(m,l)&&s(m,c)&&(u.push(m),5===u.length))break}return u}}})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin");window.pin={getElement:t=>{const{location:{x:o,y:n}}=t,r=e.cloneNode(!0);return r.querySelector("img").src=t.author.avatar,r.style.left=o-Math.floor(25)+"px",r.style.top=n-70+"px",((e,t)=>{e.addEventListener("click",(function(){window.card.renderPopup(t)}))})(r,t),r},pinTemplate:e}})(),(()=>{const e=document.querySelector(".ad-form"),t=e.getElementsByTagName("fieldset"),o=e.querySelector("#room_number"),n=e.querySelector("#capacity"),r=e.querySelector("#title"),s=e.querySelector("#timein"),a=e.querySelector("#timeout"),i=e.querySelector("#type"),d=e.querySelector("#price"),l=e.querySelector("#address"),c=e.querySelector(".ad-form__reset"),u=document.querySelector("#error").content.querySelector(".error"),p=document.querySelector("#success").content.querySelector(".success");let m=null;const f=1e3,w=5e3,y=1e4;let v;const g=()=>{const e=parseInt(o.value,10),t=parseInt(n.value,10);let r="";(1===e&&1!==t||2===e&&1!==t&&2!==t||3===e&&0===t||100===e&&0!==t)&&(r="Неверное количество комнат"),o.setCustomValidity(r),n.setCustomValidity("")},h=()=>{const e=parseInt(o.value,10),t=parseInt(n.value,10);let r="";(1===t&&100===e||2===t&&2!==e&&3!==e||3===t&&3!==e||0===t&&100!==e)&&(r="Неверное количество гостей"),n.setCustomValidity(r),o.setCustomValidity("")},_=()=>{const{min:e,message:t,placeholder:o}=v[i.value];d.placeholder=o;const n=parseInt(d.value,10)<e?t:"";d.setCustomValidity(n)},S=()=>{e.classList.add("ad-form--disabled"),window.utils.changeDisabledElemetsForm(t),window.move.updateAddress()},q=()=>{window.map.fullReset(),window.card.closePopup(),window.photos.reset(),S(),e.reset(),window.move.updateAddress()},E=e=>{m=e.cloneNode(!0),document.body.append(m)},L=()=>{q(),E(p),A()},b=()=>{E(u),A()},k=()=>{null!==m&&(m.remove(),m=null,T())},x=e=>{27===e.keyCode&&(e.preventDefault(),k())},C=()=>{k()},A=()=>{document.addEventListener("keydown",x),document.addEventListener("click",C)},T=()=>{document.removeEventListener("keydown",x),document.removeEventListener("click",C)};c.addEventListener("click",(()=>{q()})),e.addEventListener("submit",(t=>{window.backend.upload(new FormData(e),L,b),t.preventDefault()})),window.form={activate:()=>{e.classList.remove("ad-form--disabled"),window.utils.changeDisabledElemetsForm(t),window.move.updateAddress()},init:()=>{v={[window.card.OfferType.BUNGALOW]:{min:0,placeholder:0,message:"Значение должно быть больше или равно 0"},[window.card.OfferType.FLAT]:{min:f,placeholder:f,message:"Значение должно быть больше или равно 1000"},[window.card.OfferType.HOUSE]:{min:w,placeholder:w,message:"Значение должно быть больше или равно 5000"},[window.card.OfferType.PALACE]:{min:y,placeholder:y,message:"Значение должно быть больше или равно 10000"}},S(),e.addEventListener("change",(function(t){switch(t.target.id){case o.id:g();break;case n.id:h();break;case a.id:s.value=a.value;break;case s.id:a.value=s.value;break;case i.id:_()}e.reportValidity()})),r.addEventListener("input",(function(){let e=r.value.length;e<30?r.setCustomValidity("Ещё "+(30-e)+" симв."):e>100?r.setCustomValidity("Удалите лишние "+(e-100)+" симв."):r.setCustomValidity(""),r.reportValidity()})),g(),h(),_()},setAddress:({valueX:e,valueY:t})=>{l.value=`${e}, ${t}`}}})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector(".ad-form__field input[type=file]"),o=document.querySelector(".ad-form-header__preview img"),n=document.querySelector(".ad-form__upload input[type=file]"),r=document.querySelector(".ad-form__photo"),s=document.createElement("img"),a=e=>{o.src=e},i=e=>{r.appendChild(s),s.src=e,s.style.width=r.offsetWidth+"px",s.style.height=r.offsetHeight+"px"},d=(t,o)=>{const n=t.target.files[0],r=n.name.toLowerCase();if(e.some((e=>r.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{o(e.result)})),e.readAsDataURL(n)}};window.photos={init:()=>{t.addEventListener("change",(e=>{d(e,a)})),n.addEventListener("change",(e=>{d(e,i)}))},reset:()=>{s.remove(),o.src="img/muffin-grey.svg"}}})(),(()=>{const e=document.querySelector(".map__pins"),t=document.querySelector(".map"),o=document.querySelector(".map__filters"),n=o.getElementsByTagName("select"),r=o.querySelector("#housing-type"),s=o.querySelector("#housing-price"),a=o.querySelector("#housing-rooms"),i=o.querySelector("#housing-guests");let d=!1,l=[],c=[];const u=t=>{const o=document.createDocumentFragment();for(let e=0;e<t.length;e++){const n=t[e],r=window.pin.getElement(n);l.push(r),o.appendChild(r)}e.appendChild(o)},p=()=>{l.forEach((e=>{e.remove()})),l=[]},m=e=>{const t=document.createElement("p");t.style="z-index: 100; margin: 100px auto; text-align: center; border: 3px solid red; font-size: 30px; border-radius: 10px; width: auto; max-width: 600px; padding: 10px; background-color: white;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},f=()=>Array.from(o.querySelectorAll("#housing-features input:checked")).map((e=>e.value)),w=e=>{c=e,u(window.filter.getFiltred(c,r.value,s.value,a.value,i.value,f()))},y=()=>{d=!1,t.classList.add("map--faded")};window.map={getIsPageActive:()=>d,init:()=>{y(),o.addEventListener("change",window.utils.debounce((()=>{p(),window.card.closePopup(),u(window.filter.getFiltred(c,r.value,s.value,a.value,i.value,f()))})))},activateMap:()=>{d=!0,t.classList.remove("map--faded"),window.form.activate(),window.utils.changeDisabledElemetsForm(n),window.backend.load(w,m)},fullReset:()=>{p(),window.move.resetMainPin(),y(),o.reset(),window.utils.changeDisabledElemetsForm(n)},block:t}})(),(()=>{const e=document.querySelector(".map__overlay"),t=document.querySelector(".map__pin--main"),o=Math.floor(32.5),n=0-o,r=e.offsetWidth-o,s=(e,t)=>({valueX:e+o,valueY:t+(window.map.getIsPageActive()?87:Math.floor(32.5))}),a=()=>{const{offsetLeft:e,offsetTop:o}=t;window.form.setAddress(s(e,o))};window.move={pin:()=>{t.addEventListener("mousedown",(e=>{e.preventDefault(),window.map.getIsPageActive()||window.map.activateMap();let o={x:e.clientX,y:e.clientY};const i=e=>{e.preventDefault();let a=o.x-e.clientX,i=o.y-e.clientY;o={x:e.clientX,y:e.clientY};const d=t.offsetLeft-a,l=t.offsetTop-i;s(d,l),l>=43&&l<=543&&d>=n&&d<=r&&(t.style.left=d+"px",t.style.top=l+"px",window.form.setAddress(s(d,l)))},d=e=>{e.preventDefault(),document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",d),a();const o=e=>{e.preventDefault(),t.removeEventListener("click",o)};t.addEventListener("click",o)};document.addEventListener("mousemove",i),document.addEventListener("mouseup",d)}))},updateAddress:a,resetMainPin:()=>{t.style.left="570px",t.style.top="375px"}}})(),(()=>{let e=null;const t=document.querySelector("#card").content.querySelector(".map__card"),o={FLAT:"flat",BUNGALOW:"bungalow",HOUSE:"house",PALACE:"palace"},n={[o.FLAT]:"Квартира",[o.BUNGALOW]:"Бунгало",[o.HOUSE]:"Дом",[o.PALACE]:"Дворец"},r=()=>{null!==e&&(e.remove(),e=null)};window.card={renderPopup:o=>{r();const{offer:{title:s,address:a,price:i,type:d,rooms:l,guests:c,checkin:u,checkout:p,features:m,description:f,photos:w},author:{avatar:y}}=o;e=t.cloneNode(!0),e.querySelector(".popup__title").textContent=s,e.querySelector(".popup__text--address").textContent=a,e.querySelector(".popup__text--price").textContent=i+"₽/ночь",e.querySelector(".popup__type").textContent=n[d],e.querySelector(".popup__text--capacity").textContent=`${l} комнаты для ${c} гостей`,e.querySelector(".popup__text--time").textContent=`Заезд после ${u}, выезд до ${p}`,e.querySelector(".popup__avatar").src=y,((e,t)=>{if(!t.length)return void e.remove();const o=e.querySelector(".popup__feature");e.innerHTML="",t.forEach((t=>{const n=o.cloneNode(!0);n.className="popup__feature popup__feature--"+t,e.appendChild(n)}))})(e.querySelector(".popup__features"),m),e.querySelector(".popup__description").textContent=f,((e,t)=>{if(!t.length)return void e.remove();const o=e.querySelector(".popup__photo");e.innerHTML="",t.forEach((t=>{const n=o.cloneNode(!0);n.src=""+t,e.appendChild(n)}))})(e.querySelector(".popup__photos"),w),window.map.block.appendChild(e),e.querySelector(".popup__close").addEventListener("click",(()=>{r()})),window.map.block.addEventListener("keydown",(e=>{27===e.keyCode&&(e.preventDefault(),r())}))},closePopup:r,OfferType:o}})(),window.map.init(),window.move.pin(),window.form.init(),window.photos.init()})();
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89
