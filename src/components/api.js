const apiSettings = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-23',
  headers: {
    authorization: 'f0d04aa8-0c67-4883-96e9-c2fbbeeb1541',
    'Content-Type': 'application/json',
  },
};

// Возвращает ответ от API
const getResponse = response => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

// Получение профиля пользователя
export const getUserProfile = () => {
  return fetch(`${apiSettings.baseUrl}/users/me`, {
    headers: apiSettings.headers,
  })
    .then(getResponse);
};

// Получение карточек
export const getCards = () => {
  return fetch(`${apiSettings.baseUrl}/cards`, {
    headers: apiSettings.headers,
  })
    .then(getResponse);
};

// Редактирование профиля пользователя
export const editUserProfile = (userName, userAbout) => {
  return fetch(`${apiSettings.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiSettings.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    })
  })
    .then(getResponse);
};

// Редактирование аватара пользователя
export const editUserAvatar = userAvatar => {
  return fetch(`${apiSettings.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiSettings.headers,
    body: JSON.stringify({
      avatar: userAvatar,
    })
  })
    .then(getResponse);
};

// Добавление новой карточки
export const addNewCard = (cardName, cardLink) => {
  return fetch(`${apiSettings.baseUrl}/cards`, {
    method: 'POST',
    headers: apiSettings.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    })
  })
    .then(getResponse);
};

// Удаление карточки
export const deleteCardFromServer = cardId => {
  return fetch(`${apiSettings.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiSettings.headers,
  })
    .then(getResponse);
};

// Постановка лайка
export const addLike = cardId => {
  return fetch(`${apiSettings.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiSettings.headers,
  })
    .then(getResponse);
};

// Снятие лайка
export const deleteLike = cardId => {
  return fetch(`${apiSettings.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiSettings.headers,
  })
    .then(getResponse);
};