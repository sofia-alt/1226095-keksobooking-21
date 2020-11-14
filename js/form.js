"use strict";

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

let popupMessage = null;

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
  titleInput.addEventListener(`input`, function () {
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
  formInfo.addEventListener(`change`, function (evt) {
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

