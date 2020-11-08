"use strict";

(() => {
  const ANY_VALUE = `any`;

  // const PriceValue = {
  //   middleMin: 10000,
  //   middleMax: 50000,
  //   low: 10000,
  //   high: 50000
  // };

  const isAvaliableHouseType = (pin, housingType) => {
    return housingType === ANY_VALUE || pin.offer.type === housingType;
  };

  // const isAvaliablePrice = (pin, housingPrice) => {
  //   if ()
  //   return housingPrice === ANY_VALUE
  // };

  const getFiltred = (pins, housingType) => {
    const result = [];

    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];

      const isFiltred = isAvaliableHouseType(pin, housingType);

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
