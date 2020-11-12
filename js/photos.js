"use strict";

(function () {
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  const fileChooserAvatar = document.querySelector(`.ad-form__field input[type=file]`);
  const previewAvatar = document.querySelector(`.ad-form-header__preview img`);

  const fileChooserHouse = document.querySelector(`.ad-form__upload input[type=file]`);
  const previewHouse = document.querySelector(`.ad-form__photo`);

  const ul = document.createElement(`ul`);
  ul.style = `list-style: none; padding: 0; margin: 0;`;
  previewHouse.appendChild(ul);
  const li = document.createElement(`li`);

  function onLoadChange(evt) {
    let fileChooser = evt.target;
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, function () {
        const result = reader.result;
        switch (fileChooser) {
          case fileChooserAvatar:
            previewAvatar.src = result;
            break;
          case fileChooserHouse:
            ul.appendChild(li);
            previewHouse.style = `width: auto;`;
            const imgElement = document.createElement(`img`);
            imgElement.style.height = previewHouse.offsetHeight + `px`;
            imgElement.style.width = `auto`;
            imgElement.src = result;
            li.appendChild(imgElement);
            break;
        }
      });
      reader.readAsDataURL(file);
    }
  }

  fileChooserAvatar.addEventListener(`change`, onLoadChange);
  fileChooserHouse.addEventListener(`change`, onLoadChange);

})();
