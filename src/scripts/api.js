const config = {
  baseUrl: "https://nomoreparties.co/v1/cohort-mag-4",
  headers: {
    authorization: "83dc7d10-651f-4d13-a548-f7dbd5637cbe",
    "Content-Type": "application/json",
  },
};

function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
}


// ПОЛУЧИТЬ МАССИВ КАРТОЧЕК
export const getCards = () => {
  return fetch(config.baseUrl + "/cards", { headers: config.headers }).then(
    (res) => getResponse(res)
  );
};

export const getUserInfo = () => {
  return fetch(config.baseUrl + "/users/me", { headers: config.headers }).then(
    (res) => getResponse(res)
  );
};

export const updateUserInfo = (name, about) => {
  return fetch(config.baseUrl + "/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => getResponse(res));
};

export const updateUserAvatar = (avatar) => {
  return fetch(config.baseUrl + "/users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then((res) => getResponse(res));
};

export const postNewCard = (name, link) => {
  return fetch(config.baseUrl + "/cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then((res) => getResponse(res));
};

export const removeCard = (cardId) => {
  return fetch(config.baseUrl + "/cards" + `/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResponse(res));
};

export const putLike = (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => getResponse(res));
};

export const deleteLike = (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResponse(res));
};
