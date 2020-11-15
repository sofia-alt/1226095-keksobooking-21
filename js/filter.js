"use strict";

const ANY_VALUE = `any`;
const COUNT_PIN = 5;

<<<<<<< HEAD
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
=======
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
  return housingFeatures.every((feature) => pin.offer.features.includes(feature));
};

const getFiltred = (pins, housingType, housingPrice, housingRooms, housingGuests, housingFeatures) => {
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89
  const result = [];

  for (let i = 0; i < pins.length; i++) {
    const pin = pins[i];

<<<<<<< HEAD
    const isFiltred = isAvaliableHouseType(pin, housingTypeElement.value) && isAvaliablePrice(pin, housingPriceElement.value) && isAvaliableRooms(pin, housingRoomsElement.value) && isAvaliableGuests(pin, housingGuestsElement.value)
      && isAvaliableFeatures(pin, getHousingFeatures());
=======
    const isFiltred = isAvaliableHouseType(pin, housingType) && isAvaliablePrice(pin, housingPrice) && isAvaliableRooms(pin, housingRooms) && isAvaliableGuests(pin, housingGuests)
      && isAvaliableFeatures(pin, housingFeatures);
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89

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
<<<<<<< HEAD
  getResult
=======
  getFiltred
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89
};
