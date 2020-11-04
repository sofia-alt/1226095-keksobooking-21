"use strict";

(() => {
  const formInfo = document.querySelector(`.ad-form`);
  const fieldsetFormInfo = formInfo.getElementsByTagName(`fieldset`);
  const mapFilters = document.querySelector(`.map__filters`);
  const selectMapFilters = mapFilters.getElementsByTagName(`select`);

  const roomNumber = formInfo.querySelector(`#room_number`);
  const capacity = formInfo.querySelector(`#capacity`);

  const titleInput = formInfo.querySelector(`#title`);
  const timeinFormInfo = formInfo.querySelector(`#timein`);
  const timeoutFormInfo = formInfo.querySelector(`#timeout`);

  const typeHousing = formInfo.querySelector(`#type`);
  const priceHousing = formInfo.querySelector(`#price`);

  const address = formInfo.querySelector(`#address`);

  const resetForm = formInfo.querySelector(`.ad-form__reset`);

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

  const changeElementDisabledMapFilters = (elements) => {
    for (let i = 0; i < elements.length; i++) {
      elements[i].disabled = !window.map.getIsPageActive();
    }
  };

  const changeElementDisabledFormInfo = (elements) => {
    for (let i = 0; i < elements.length; i++) {
      elements[i].disabled = !window.map.getIsPageActive();
    }
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

    if (typeHousing.value === window.card.OfferType.BUNGALOW) {
      priceHousing.placeholder = MinPriceHousing.BUNGALOW;
      priceHousing.min = MinPriceHousing.BUNGALOW;
    } else if (typeHousing.value === window.card.OfferType.FLAT) {
      priceHousing.placeholder = MinPriceHousing.FLAT;
      priceHousing.min = MinPriceHousing.FLAT;
    } else if (typeHousing.value === window.card.OfferType.HOUSE) {
      priceHousing.placeholder = MinPriceHousing.HOUSE;
      priceHousing.min = MinPriceHousing.HOUSE;
    } else if (typeHousing.value === window.card.OfferType.PALACE) {
      priceHousing.placeholder = MinPriceHousing.PALACE;
      priceHousing.min = MinPriceHousing.PALACE;
    }

    priceHousing.setCustomValidity();
  };

  const addEvent = () => {
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
    changeElementDisabledFormInfo(fieldsetFormInfo);
    changeElementDisabledMapFilters(selectMapFilters);
    window.move.updateAddress();
  };

  const resetInput = () => {
    let valueNull = ``;
    titleInput.value = valueNull;
    priceHousing.value = valueNull;
    formInfo.querySelector(`#description`).value = valueNull;
    roomNumber.value = RoomValue.ONE;
    capacity.value = CapacityValue.THREE;
    timeoutFormInfo.value = `12:00`;
    timeinFormInfo.value = `12:00`;
    typeHousing.value = window.card.OfferType.HOUSE;
    priceHousing.placeholder = MinPriceHousing.HOUSE;

    const features = document.getElementsByTagName(`input`);
    for (let i = 0; i < features.length; i++) {
      features[i].checked = false;
    }
  };

  const reset = () => {
    formInfo.classList.add(`ad-form--disabled`);
    changeElementDisabledFormInfo(fieldsetFormInfo);
    changeElementDisabledMapFilters(selectMapFilters);
    window.move.updateAddress();
  };

  const fullReset = () => {
    window.map.fullReset();
    window.card.closePopup();
    reset();
    resetInput();
  };

  const submitHandler = (evt) => {
    window.backend.upload(new FormData(formInfo), function () {
      fullReset();
    }, window.map.errorHandler);
    evt.preventDefault();
  };

  resetForm.addEventListener(`click`, fullReset);

  formInfo.addEventListener(`submit`, submitHandler);

  window.form = {
    activate,
    reset,
    addEvent,
    addEventTitle,
    address
  };

})();
