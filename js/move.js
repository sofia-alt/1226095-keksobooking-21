"use strict";

(() => {
  const mapOverlay = document.querySelector(`.map__overlay`);
  const pinMain = document.querySelector(`.map__pin--main`);

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
    pinMain.addEventListener(`mousedown`, function (evt) {
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

        const offsetLeft = pinMain.offsetLeft - shift.x;
        const offsetTop = pinMain.offsetTop - shift.y;

        getAddress(offsetLeft, offsetTop);

        const isAddressValid = () => {
          let addressValid = true;
          if (offsetTop >= LocationLimit.Y_MAX) {
            addressValid = false;
          } else if (offsetTop <= LocationLimit.Y_MIN - SizeMainPin.AFTER) {
            addressValid = false;
          }
          if (offsetLeft >= (LocationLimit.X_MAX - Math.floor(SizeMainPin.WIDTH / 2))) {
            addressValid = false;
          } else if (offsetLeft <= (LocationLimit.X_MIN - Math.floor(SizeMainPin.WIDTH / 2))) {
            addressValid = false;
          }
          return addressValid;
        };

        const pinMove = () => {
          if (isAddressValid()) {
            pinMain.style.left = (offsetLeft) + `px`;
            pinMain.style.top = (offsetTop) + `px`;
            setAddress(getAddress(offsetLeft, offsetTop));
          }
        };
        pinMove();
      };
      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);

        updateAddress();

        let onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          pinMain.removeEventListener(`click`, onClickPreventDefault);
        };
        pinMain.addEventListener(`click`, onClickPreventDefault);
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


  const getAddress = (offsetLeft, offsetTop) => {
    let valueX = offsetLeft + Math.floor(SizeMainPin.WIDTH / 2);
    let valueY = offsetTop + (!window.map.getIsPageActive() ? Math.floor(SizeMainPin.HEIGHT / 2) : Math.floor(SizeMainPin.HEIGHT + SizeMainPin.AFTER));

    return {
      valueX, valueY
    };
  };

  const updateAddress = () => {
    const {offsetLeft, offsetTop} = pinMain;
    setAddress(getAddress(offsetLeft, offsetTop));
  };

  window.move = {
    pin,
    updateAddress,
    pinMain
  };
})();
