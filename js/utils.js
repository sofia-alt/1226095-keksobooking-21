"use strict";

const DEBOUNCE_INTERVAL = 500;

const changeDisabledElemetsForm = (elements) => {
  const isPageActive = window.map.getIsPageActive();
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = !isPageActive;
  }
};

const debounce = (cb) => {
  let lastTimeout = null;

  return function (...parameters) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};


window.utils = {
  changeDisabledElemetsForm,
  debounce
};
