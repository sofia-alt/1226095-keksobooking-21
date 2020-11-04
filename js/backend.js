"use strict";
(function () {
  const URLLOAD = `https://21.javascript.pages.academy/keksobooking/data`;
  const URLUPLOAD = `https://21.javascript.pages.academy/keksobooking`;

  let TIMEOUT_IN_MS = 10000;

  const load = (onSuccess, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = `Неверный запрос`;
          break;
        case 401:
          error = `Пользователь не авторизован`;
          break;
        case 404:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URLLOAD);
    xhr.send();
  };

  const upload = (data, onSuccess, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      onSuccess(xhr.response);

      let error;

      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = `Неверный запрос`;
          break;
        case 500:
          error = `Внутренняя ошибка сервера`;
          break;

        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.open(`POST`, URLUPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load,
    upload
  };
})();
