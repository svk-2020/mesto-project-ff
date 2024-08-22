import '../pages/index.css';
import {initialCards} from "./cards";
import {deleteCard, likeCard, newCard} from "./card";
import {closeModal, closeModalOnOverlay, openModal} from "./modal";

const cardContainer = document.querySelector('.places__list');

// Кнопки
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonCardNew = document.querySelector('.profile__add-button');

// Модальные окна
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupCardNew = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImageSrc = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
let currentPopup;  // текущее открытое модальное окно

// Формы
const formProfileEdit = popupProfileEdit.querySelector('.popup__form');
const formCardNew = popupCardNew.querySelector('.popup__form');
const inputProfileName = formProfileEdit.querySelector('.popup__input_type_name');
const inputProfileDescription = formProfileEdit.querySelector('.popup__input_type_description');
const inputCardName = formCardNew.querySelector('.popup__input_type_card-name');
const inputCardUrl = formCardNew.querySelector('.popup__input_type_url');

// Профиль
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Обработчики форм
const handleFormProfileEdit = event => {
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closeModal(currentPopup);
}

const handleFormCardNew = event => {
  event.preventDefault();
  let cardItem = {};
  cardItem.name = inputCardName.value;
  cardItem.link = inputCardUrl.value;
  cardContainer.prepend(newCard(cardItem, deleteCard, likeCard, enlargeCard));
  closeModal(currentPopup);
  formCardNew.reset();
}

// Функция вывода модального окна с картинкой
const enlargeCard = (event) => {
  popupImageSrc.src = event.target.src;
  popupImageSrc.alt = event.target.alt;
  popupImageCaption.textContent = event.target.alt;
  openModal(popupImage);
  currentPopup = popupImage;
};

// Вывод карточек на страницу
initialCards.forEach((cardItem) => {
  cardContainer.append(newCard(cardItem, deleteCard, likeCard, enlargeCard));
});

// Обработчики событий
// Открытие модальных окон
buttonProfileEdit.addEventListener('click', () => {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  openModal(popupProfileEdit);
  currentPopup = popupProfileEdit;
});

buttonCardNew.addEventListener('click', () => {
  inputCardName.value = '';
  inputCardUrl.value = '';
  openModal(popupCardNew);
  currentPopup = popupCardNew;
});

// Закрытие модальных окон по клику на крестик
document.querySelectorAll('.popup__close').forEach(button => {
    button.addEventListener('click', () => closeModal(currentPopup));
})

// Закрытие модальных окон по клику на оверлей
document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', event => closeModalOnOverlay(event));
});

// Заполнение форм
formProfileEdit.addEventListener('submit', handleFormProfileEdit);
formCardNew.addEventListener('submit', handleFormCardNew);