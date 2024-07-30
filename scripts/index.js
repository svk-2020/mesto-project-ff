const cardContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
const newCard = (content, deleteCallback) => {
  // клонируем содержимое тега template
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  // наполняем содержимым
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = content.link;
  cardImage.alt = `Высококачественная фотография изображающая ${content.name}`;
  cardElement.querySelector('.card__title').textContent = content.name;
  cardElement.querySelector('.card__delete-button').addEventListener(
    'click', () => {deleteCallback(cardElement)}
  );
  // возвращаем подготовленный к выводу элемент карточки
  return cardElement;
}

// Функция удаления карточки
const deleteCard = deletedItem => {
  deletedItem.remove();
}

// Вывод карточек на страницу
initialCards.forEach((cardItem) => {
  cardContainer.append(newCard(cardItem, deleteCard));
});