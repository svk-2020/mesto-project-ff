const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export const newCard = (content, cardCallbacks) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  const buttonLike = cardElement.querySelector('.card__like-button');

  cardImage.src = content.link;
  cardImage.alt = content.name;
  cardImage.addEventListener('click', cardCallbacks.enlargeCard);
  cardElement.querySelector('.card__title').textContent = content.name;
  buttonDelete.addEventListener('click', () => {cardCallbacks.deleteCard(cardElement)});
  buttonLike.addEventListener('click', () => {cardCallbacks.likeCard(buttonLike)});
  // возвращаем подготовленный к выводу элемент карточки
  return cardElement;
}

// Функция удаления карточки
export const deleteCard = deletedItem => {
  deletedItem.remove();
}

// Функция проставления лайка карточки
export const likeCard = likedItem => {
  likedItem.classList.toggle('card__like-button_is-active');
}