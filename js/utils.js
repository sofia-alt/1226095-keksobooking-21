"use strict";

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
