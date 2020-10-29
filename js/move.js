"use strict";

(() => {
  const mapOverlay = document.querySelector(`.map__overlay`);

  const SizeMainPin = {
    WIDTH: 65,
    HEIGHT: 65,
    AFTER: 22
  };

  const LocationLimit = {
    X_MIN: 0,
    X_MAX: mapOverlay.offsetWidth,
    Y_MIN: 130,
    Y_MAX: 630
  };

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
        validationLocation(shift);
      };

      // const newLocation = () => {
      //   window.map.pinMain.style.left = (window.map.pinMain.offsetLeft - shift.x) + `px`;
      //   window.map.pinMain.style.top = (window.map.pinMain.offsetTop - shift.y) + `px`;
      // };

      const validationLocation = (shift) => {
        if (window.map.pinMain.offsetTop < LocationLimit.Y_MIN) {
          window.map.pinMain.style.top = LocationLimit.Y_MIN;
        } else
        if (window.map.pinMain.offsetTop > LocationLimit.Y_MAX - SizeMainPin.AFTER) {
          window.map.pinMain.style.top = LocationLimit.Y_MAX;
        } else {
          window.map.pinMain.style.top = (window.map.pinMain.offsetTop - shift.y) + `px`;
        }

        if (window.map.pinMain.offsetLeft < LocationLimit.X_MIN - Math.floor((SizeMainPin.WIDTH / 2))) {
          window.map.pinMain.style.left = LocationLimit.X_MIN - Math.floor((SizeMainPin.WIDTH / 2));
        } else
        if (window.map.pinMain.offsetLeft > LocationLimit.X_MAX - Math.floor((SizeMainPin.WIDTH / 2))) {
          window.map.pinMain.style.left = LocationLimit.X_MAX - Math.floor((SizeMainPin.WIDTH / 2));
        } else {
          window.map.pinMain.style.left = (window.map.pinMain.offsetLeft - shift.x) + `px`;
        }
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);

        updateAddress();

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

  const setAddress = ({valueX, valueY}) => {
    window.form.address.value = `${valueX}, ${valueY}`;
    window.form.address.readOnly = true;
  };


  const getAddress = () => {
    let valueX = window.map.pinMain.offsetLeft + Math.floor(SizeMainPin.WIDTH / 2);
    let valueY = window.map.pinMain.offsetTop + (!window.map.getIsPageActive() ? Math.floor(SizeMainPin.HEIGHT / 2) : Math.floor(SizeMainPin.HEIGHT + SizeMainPin.AFTER));

    // if (valueX < LocationLimit.X_MIN) {
    //   window.map.pinMain.style.left = (LocationLimit.X_MIN - Math.floor(SizeMainPin.WIDTH / 2)) + `px`;
    // }
    // if (valueY < LocationLimit.Y_MIN) {
    //   window.map.pinMain.style.top = (LocationLimit.Y_MIN - Math.floor(SizeMainPin.HEIGHT / 2)) + `px`;
    // }
    // if (valueX > LocationLimit.X_MAX) {
    //   window.map.pinMain.style.left = (LocationLimit.X_MAX - Math.floor(SizeMainPin.WIDTH / 2)) + `px`;
    // }
    // if (valueY > LocationLimit.Y_MAX) {
    //   valueY = mapOverlay.offsetHeight;
    //   window.map.pinMain.style.top = LocationLimit.Y_MAX + `px`;
    // }

    return {
      valueX, valueY
    };
  };

  const updateAddress = () => {
    setAddress(getAddress());
  };

  window.move = {
    pin,
    updateAddress
  };
})();
