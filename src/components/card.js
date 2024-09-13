import {deleteCardFromServer, addLike, deleteLike} from './api';

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export const newCard = (userId, content, cardCallbacks) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  const buttonLike = cardElement.querySelector('.card__like-button');
  const counterLike = cardElement.querySelector('.card__like-counter');

  cardImage.src = content.link;
  cardImage.alt = content.name;
  cardImage.addEventListener('click', cardCallbacks.enlargeCard);
  cardElement.querySelector('.card__title').textContent = content.name;

  // кнопка удаления
  if (content.owner._id === userId) {
    buttonDelete.addEventListener('click', () => {
      cardCallbacks.deleteCard(content._id, cardElement)
    });
  } else {
    buttonDelete.classList.add('card__delete-button_is-hidden')
  }

  // лайки - кнопка и счетчик
  buttonLike.addEventListener('click', () => {
    cardCallbacks.likeCard(content._id, buttonLike, counterLike)
  });
  if (content.likes.some(user => user._id === userId)) {
    buttonLike.classList.add('card__like-button_is-active');
  }
  counterLike.textContent = content.likes.length;

  return cardElement;
}

// Функция удаления карточки
export const deleteCard = (id, deletedItem) => {
  deleteCardFromServer(id)
    .then(deletedItem.remove())
    .catch((err) => {
      console.log(err);
    });
}

// Функция проставления/снятия лайка карточки
export const likeCard = (id, likedItem, counter) => {
  const setLike = (
    likedItem.classList.contains('card__like-button_is-active') ? deleteLike : addLike
  );

  setLike(id)
    .then(cardInfo => {
      likedItem.classList.toggle('card__like-button_is-active');
      counter.textContent = cardInfo.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}