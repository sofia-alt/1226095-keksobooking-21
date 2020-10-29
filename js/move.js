"use strict";

(() => {
  const pin = () => {
    window.map.pinMain.addEventListener(`mousedown`, function (evt) {
      evt.preventDefault();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();

        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.map.pinMain.style.top = (window.map.pinMain.offsetTop - shift.y) + `px`;
        window.map.pinMain.style.left = (window.map.pinMain.offsetLeft - shift.x) + `px`;

      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);

        window.form.updateAddress();

        let onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          window.map.pinMain.removeEventListener(`click`, onClickPreventDefault);
        };
        window.map.pinMain.addEventListener(`click`, onClickPreventDefault);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);

      if (!window.map.getIsPageActive()) {
        window.map.activateMap();
      }
    });
  };


  window.move = {
    pin
  };
})();
