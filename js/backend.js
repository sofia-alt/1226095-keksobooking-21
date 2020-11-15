"use strict";

<<<<<<< HEAD
const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking`;
=======
const URLLOAD = `https://21.javascript.pages.academy/keksobooking/data`;
const URLUPLOAD = `https://21.javascript.pages.academy/keksobooking`;
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89

const TIMEOUT_IN_MS = 10000;

const StatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404
};

const HttpRequest = {
  GET: `GET`,
  POST: `POST`
};

const getInstance = (onSuccess, onError) => {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    let error;
    switch (xhr.status) {
      case StatusCode.OK:
        onSuccess(xhr.response);
        break;
      case StatusCode.BAD_REQUEST:
        error = `Неверный запрос`;
        break;
      case StatusCode.UNAUTHORIZED:
        error = `Пользователь не авторизован`;
        break;
      case StatusCode.NOT_FOUND:
        error = `Ничего не найдено`;
        break;

      default:
<<<<<<< HEAD
        error = `Cтатус ответа: : ${xhr.status} ${xhr.statusText}`;
=======
        error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89
    }

    if (error) {
      onError(error);
    }
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  return xhr;
};

const load = (onSuccess, onError) => {
  const xhr = getInstance(onSuccess, onError);

<<<<<<< HEAD
  xhr.open(HttpRequest.GET, URL_LOAD);
=======
  xhr.open(HttpRequest.GET, URLLOAD);
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89
  xhr.send();
};

const upload = (data, onSuccess, onError) => {
  const xhr = getInstance(onSuccess, onError);

<<<<<<< HEAD
  xhr.open(HttpRequest.POST, URL_UPLOAD);
=======
  xhr.open(HttpRequest.POST, URLUPLOAD);
>>>>>>> 1a389f828d715c05e26a26ce2a894bbe7d6fde89
  xhr.send(data);
};

window.backend = {
  load,
  upload
};
