"use strict";

(() => {
  const ANY_VALUE = `any`;

  const isAvaliableHouseType = (pin, housingType) => {
    return housingType === ANY_VALUE || pin.offer.type === housingType;
  };

  const isAvaliableHouseType1 = (pin, housingType) => {
    return housingType === ANY_VALUE || pin.offer.type === housingType;
  };

  const getFiltred = (pins, housingType) => {
    debugger;
    const result = [];

    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];

      const isFiltred = isAvaliableHouseType(pin, housingType) && isAvaliableHouseType1(pin, housingType);

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
