"use strict";
const formInfo = document.querySelector(`.ad-form`);

const roomNumber = formInfo.querySelector(`#room_number`);
const capacity = formInfo.querySelector(`#capacity`);

const titleInput = formInfo.querySelector(`#title`);
const timeinFormInfo = formInfo.querySelector(`#timein`);
const timeoutFormInfo = formInfo.querySelector(`#timeout`);

const typeHousing = formInfo.querySelector(`#type`);
const priceHousing = formInfo.querySelector(`#price`);

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

const MAX_PRICE_HOUSING = 1000000;

const updateAddress = () => {
  setAddress(getAddress());
};


const validateRooms = () => {
  const roomValue = parseInt(roomNumber.value, 10);
  const capacityValue = parseInt(capacity.value, 10);

  let message = ` `;
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

const addEventTitleForm = () => {
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
  timeinFormInfo.addEventListener(`click`, function (evt) {
    timeoutFormInfo.value = evt.target.value;
  });
};

const validateTimeout = () => {
  timeoutFormInfo.addEventListener(`click`, function (evt) {
    timeinFormInfo.value = evt.target.value;
  });
};

const validateHousingType = () => {
  priceHousing.max = MAX_PRICE_HOUSING;

  if (typeHousing.value === OfferType.BUNGALOW) {
    priceHousing.placeholder = MinPriceHousing.BUNGALOW;
    priceHousing.min = MinPriceHousing.BUNGALOW;
  } else if (typeHousing.value === OfferType.FLAT) {
    priceHousing.placeholder = MinPriceHousing.FLAT;
    priceHousing.min = MinPriceHousing.FLAT;
  } else if (typeHousing.value === OfferType.HOUSE) {
    priceHousing.placeholder = MinPriceHousing.HOUSE;
    priceHousing.min = MinPriceHousing.HOUSE;
  } else if (typeHousing.value === OfferType.PALACE) {
    priceHousing.placeholder = MinPriceHousing.PALACE;
    priceHousing.min = MinPriceHousing.PALACE;
  }

  priceHousing.setCustomValidity();
};

const addFormEvent = () => {
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
