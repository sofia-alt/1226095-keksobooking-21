"use strict";

(() => {
  const mapOverlay = document.querySelector(`.map__overlay`);
  const pinMain = document.querySelector(`.map__pin--main`);

  const SizeMainPin = {
    WIDTH: 65,
    HEIGHT: 65,
    FULLHEIGHT: 87
  };

  const partSizeWidth = Math.floor(SizeMainPin.WIDTH / 2);

  const LocationLimit = {
    X_MIN: 0 - partSizeWidth,
    X_MAX: mapOverlay.offsetWidth - partSizeWidth,
    Y_MIN: 130 - SizeMainPin.FULLHEIGHT,
    Y_MAX: 630 - SizeMainPin.FULLHEIGHT
  };

  const pin = () => {

    pinMain.addEventListener(`mousedown`, function (evt) {
      evt.preventDefault();

      if (!window.map.getIsPageActive()) {
        window.map.activateMap();
      }

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

        const isAddressValid = offsetTop >= LocationLimit.Y_MIN &&
          offsetTop <= LocationLimit.Y_MAX &&
          offsetLeft >= LocationLimit.X_MIN &&
          offsetLeft <= LocationLimit.X_MAX;

        const pinMove = () => {
          if (isAddressValid) {
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
    });
  };
  const setAddress = ({valueX, valueY}) => {
    window.form.address.value = `${valueX}, ${valueY}`;
    window.form.address.readOnly = true;
  };


  const getAddress = (offsetLeft, offsetTop) => {
    let valueX = offsetLeft + partSizeWidth;
    let valueY = offsetTop + (!window.map.getIsPageActive() ? Math.floor(SizeMainPin.HEIGHT / 2) : SizeMainPin.FULLHEIGHT);

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
    updateAddress
  };
})();
