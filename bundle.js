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
        error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
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

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

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
  const element = pinTemplate.cloneNode(true);
  element.querySelector(`img`).src = pin.author.avatar;

  element.style.left = `${x - Math.floor(SizePin.WIDTH / 2)}px`;
  element.style.top = `${y - SizePin.HEIGHT}px`;

  addPinEvent(element, pin);

  return element;
};

window.pin = {
  getElement,
  resetActiveElement,
  pinTemplate
};


})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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

const ESC_KEY = 27;

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
  NOTGUEST: 0
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
  } else if (roomValue === RoomValue.THREE && capacityValue === CapacityValue.NOTGUEST) {
    message = `Неверное количество комнат`;
  } else if (roomValue === RoomValue.HUNDER && capacityValue !== CapacityValue.NOTGUEST) {
    message = `Неверное количество комнат`;
  }

  roomNumber.setCustomValidity(message);
  capacity.setCustomValidity(``);
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
  } else if (capacityValue === CapacityValue.NOTGUEST && roomValue !== RoomValue.HUNDER) {
    message = `Неверное количество гостей`;
  }
  capacity.setCustomValidity(message);
  roomNumber.setCustomValidity(``);
};

const addEventTitle = () => {
  titleInput.addEventListener(`input`, () => {
    let valueLength = titleInput.value.length;

    if (valueLength < TitleLength.MIN_LENGTH) {
      titleInput.setCustomValidity(`Ещё ` + (TitleLength.MIN_LENGTH - valueLength) + ` симв.`);
    } else if (valueLength > TitleLength.MAX_LENGTH) {
      titleInput.setCustomValidity(`Удалите лишние ` + (valueLength - TitleLength.MAX_LENGTH) + ` симв.`);
    } else {
      titleInput.setCustomValidity(``);
    }

    titleInput.reportValidity();
  });
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
};

const addEventFrom = () => {
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
      case priceHousing.id:
        validateHousingType();
        initHousingValidationInfo();
        break;
    }

    formInfo.reportValidity();
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
  window.backend.upload(new FormData(formInfo), onLoadSuccess, onLoadError);
  evt.preventDefault();
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
  addEventTitle();

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
const DEFAULT_PICTURES = `img/muffin-grey.svg`;

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
  previewAvatar.src = DEFAULT_PICTURES;
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
  let valueX = offsetLeft + partSizeWidth;
  let valueY = offsetTop + (!window.map.getIsPageActive() ? Math.floor(SizeMainPin.HEIGHT / 2) : SizeMainPin.FULL_HEIGHT);

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

const closePopup = () => {
  if (popupElement !== null) {
    popupElement.remove();
    popupElement = null;
    window.pin.resetActiveElement();
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

  window.map.block.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === ESC_KEY) {
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
//# sourceMappingURL=bundle.js.map