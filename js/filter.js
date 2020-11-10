"use strict";

(() => {
  const ANY_VALUE = `any`;

  const PriceValue = {
    middleMin: 10000,
    middleMax: 50000,
    low: 10000,
    high: 50000
  };

  const PriceName = {
    middle: `middle`,
    low: `low`,
    high: `high`
  };

  const isAvaliableHouseType = (pin, housingType) => {
    return housingType === ANY_VALUE || pin.offer.type === housingType;
  };

  const isAvaliablePrice = (pin, housingPrice) => {
    switch (housingPrice) {
      case PriceName.middle: return pin.offer.price >= PriceValue.middleMin && pin.offer.price <= PriceValue.middleMax;
      case PriceName.low: return pin.offer.price < PriceValue.low;
      case PriceName.high: return pin.offer.price > PriceValue.high;
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
    const result = [];

    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];

      const isFiltred = isAvaliableHouseType(pin, housingType) && isAvaliablePrice(pin, housingPrice) && isAvaliableRooms(pin, housingRooms) && isAvaliableGuests(pin, housingGuests)
        && isAvaliableFeatures(pin, housingFeatures);

      if (isFiltred) {
        result.push(pin);

        if (result.length === 5) {
          break;
        }
      }
    }

    return result;
  };

  window.filter = {
    getFiltred
  };
})();
