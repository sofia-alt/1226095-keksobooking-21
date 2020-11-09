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

  // const FeaturesName = {
  //   wifi: `wifi`,
  //   dishwasher: `dishwasher`,
  //   parking: `parking`,
  //   washer: `washer`,
  //   elevator: `elevator`,
  //   conditioner: `conditioner`
  // };

  const isAvaliableHouseType = (pin, housingType) => {
    return housingType === ANY_VALUE || pin.offer.type === housingType;
  };

  const isAvaliablePrice = (pin, housingPrice) => {
    if (housingPrice === PriceName.middle) {
      if (pin.offer.price >= PriceValue.middleMin && pin.offer.price <= PriceValue.middleMax) {
        return pin.offer.price;
      }
    } else if (housingPrice === PriceName.low) {
      if (pin.offer.price <= PriceValue.low) {
        return pin.offer.price;
      }
    } else if (housingPrice === PriceName.high) {
      if (pin.offer.price >= PriceValue.high) {
        return pin.offer.price;
      }
    } return housingPrice === ANY_VALUE;
  };

  const isAvaliableRooms = (pin, housingRooms) => {
    return housingRooms === ANY_VALUE || pin.offer.rooms === parseInt(housingRooms, 10);
  };

  const isAvaliableGuests = (pin, housingGuests) => {
    return housingGuests === ANY_VALUE || pin.offer.guests === parseInt(housingGuests, 10);
  };

  // const isAvaliableFeatures = (pin, housingFeatures) => {
  //   if (housingFeatures === undefined) {
  //     return;
  //   }
  // };

  const getFiltred = (pins, housingType, housingPrice, housingRooms, housingGuests) => {
    const result = [];

    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];

      const isFiltred = isAvaliableHouseType(pin, housingType) && isAvaliablePrice(pin, housingPrice) && isAvaliableRooms(pin, housingRooms) && isAvaliableGuests(pin, housingGuests);
      // && isAvaliableFeatures(pin, housingFeatures);

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
