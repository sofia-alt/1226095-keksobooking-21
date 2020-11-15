"use strict";

const DEBOUNCE_INTERVAL = 500;

const changeDisabledElemetsForm = (elements) => {
  const isPageActive = window.map.getIsPageActive();
<<<<<<< HEAD
  Array.from(elements).forEach((element) => {
    element.disabled = !isPageActive;
  });
=======
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = !isPageActive;
  }
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89
};

const debounce = (cb) => {
  let lastTimeout = null;

<<<<<<< HEAD
  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
=======
  return function (...parameters) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};


window.utils = {
  changeDisabledElemetsForm,
  debounce
};
