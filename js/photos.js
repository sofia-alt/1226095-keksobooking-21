"use strict";

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
<<<<<<< HEAD
const DEFAULT_PICTURE = `img/muffin-grey.svg`;
=======
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89

const fileChooserAvatar = document.querySelector(`.ad-form__field input[type=file]`);
const previewAvatar = document.querySelector(`.ad-form-header__preview img`);

const fileChooserHouse = document.querySelector(`.ad-form__upload input[type=file]`);
const previewHouse = document.querySelector(`.ad-form__photo`);

const imgHouse = document.createElement(`img`);

const loadAvatar = (result) => {
  previewAvatar.src = result;
};

const loadPreviewHouse = (result) => {
  previewHouse.appendChild(imgHouse);
  imgHouse.src = result;
  imgHouse.style.width = previewHouse.offsetWidth + `px`;
  imgHouse.style.height = previewHouse.offsetHeight + `px`;
};

const reset = () => {
  imgHouse.remove();
<<<<<<< HEAD
  previewAvatar.src = DEFAULT_PICTURE;
=======
  previewAvatar.src = `img/muffin-grey.svg`;
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89
};

const onLoadChange = (evt, cb) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      cb(reader.result);
    });
    reader.readAsDataURL(file);
  }
};

const init = () => {
  fileChooserAvatar.addEventListener(`change`, (evt) => {
    onLoadChange(evt, loadAvatar);
  });

  fileChooserHouse.addEventListener(`change`, (evt) => {
    onLoadChange(evt, loadPreviewHouse);
  });
};

window.photos = {
  init,
  reset
};

