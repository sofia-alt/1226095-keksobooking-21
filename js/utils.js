"use strict";

const changeDisabledElemetsForm = (elements) => {
  const isPageActive = window.map.getIsPageActive();
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = !isPageActive;
  }
};

window.utils = {
  changeDisabledElemetsForm
};
