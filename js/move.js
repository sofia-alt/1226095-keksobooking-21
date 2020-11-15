"use strict";

const mapOverlay = document.querySelector(`.map__overlay`);
const pinMain = document.querySelector(`.map__pin--main`);

const SizeMainPin = {
  WIDTH: 65,
  HEIGHT: 65,
<<<<<<< HEAD
  FULL_HEIGHT: 87
=======
  FULLHEIGHT: 87
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89
};

const partSizeWidth = Math.floor(SizeMainPin.WIDTH / 2);

const LocationCheckpoint = {
  X_MIN: 0,
  Y_MIN: 130,
  Y_MAX: 630
};

const LocationLimit = {
  X_MIN: LocationCheckpoint.X_MIN - partSizeWidth,
  X_MAX: mapOverlay.offsetWidth - partSizeWidth,
<<<<<<< HEAD
  Y_MIN: LocationCheckpoint.Y_MIN - SizeMainPin.FULL_HEIGHT,
  Y_MAX: LocationCheckpoint.Y_MAX - SizeMainPin.FULL_HEIGHT
};

const StartLocationMainPin = {
  LEFT: 570,
  TOP: 375
};

const pin = () => {
  pinMain.addEventListener(`keydown`, () => {
    if (!window.map.getIsPageActive()) {
      window.map.activate();
    }
  });
=======
  Y_MIN: LocationCheckpoint.Y_MIN - SizeMainPin.FULLHEIGHT,
  Y_MAX: LocationCheckpoint.Y_MAX - SizeMainPin.FULLHEIGHT
};

const StartLocationMainPin = {
  left: 570,
  top: 375
};

const pin = () => {
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89

  pinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    if (!window.map.getIsPageActive()) {
<<<<<<< HEAD
      window.map.activate();
=======
      window.map.activateMap();
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89
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
          window.form.setAddress(getAddress(offsetLeft, offsetTop));
        }
      };
      pinMove();
    };
    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      updateAddress();

      const onClickPreventDefault = (clickEvt) => {
        clickEvt.preventDefault();
        pinMain.removeEventListener(`click`, onClickPreventDefault);
      };
      pinMain.addEventListener(`click`, onClickPreventDefault);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
};

const getAddress = (offsetLeft, offsetTop) => {
<<<<<<< HEAD
  const valueX = offsetLeft + partSizeWidth;
  const valueY = offsetTop + (!window.map.getIsPageActive() ? Math.floor(SizeMainPin.HEIGHT / 2) : SizeMainPin.FULL_HEIGHT);
=======
  let valueX = offsetLeft + partSizeWidth;
  let valueY = offsetTop + (!window.map.getIsPageActive() ? Math.floor(SizeMainPin.HEIGHT / 2) : SizeMainPin.FULLHEIGHT);
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89

  return {
    valueX, valueY
  };
};

const resetMainPin = () => {
<<<<<<< HEAD
  pinMain.style.left = StartLocationMainPin.LEFT + `px`;
  pinMain.style.top = StartLocationMainPin.TOP + `px`;
=======
  pinMain.style.left = StartLocationMainPin.left + `px`;
  pinMain.style.top = StartLocationMainPin.top + `px`;
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89
};

const updateAddress = () => {
  const {offsetLeft, offsetTop} = pinMain;
  window.form.setAddress(getAddress(offsetLeft, offsetTop));
};

window.move = {
  pin,
  updateAddress,
  resetMainPin
};
