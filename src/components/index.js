import '../pages/index.css';
import {initialCards} from './cards';
import {deleteCard, likeCard, newCard} from './card';
import {closeModal, closeModalOnOverlay, openModal} from './modal';
import {enableValidation, clearValidation} from './validation';

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

// Формы
const formProfileEdit = popupProfileEdit.querySelector('.popup__form');
const formCardNew = popupCardNew.querySelector('.popup__form');
const inputProfileName = formProfileEdit.querySelector('.popup__input_type_name');
const inputProfileDescription = formProfileEdit.querySelector('.popup__input_type_description');
const inputCardName = formCardNew.querySelector('.popup__input_type_card-name');
const inputCardUrl = formCardNew.querySelector('.popup__input_type_url');

// Валидация формы - классы и селекторы элементов
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// Профиль
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Функция вывода модального окна с картинкой
const enlargeCard = (event) => {
  popupImageSrc.src = event.target.src;
  popupImageSrc.alt = event.target.alt;
  popupImageCaption.textContent = event.target.alt;
  openModal(popupImage);
};

// Обработчики форм
const handleFormProfileEdit = event => {
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closeModal(popupProfileEdit);
}

const handleFormCardNew = event => {
  event.preventDefault();
  let cardItem = {};
  cardItem.name = inputCardName.value;
  cardItem.link = inputCardUrl.value;
  cardContainer.prepend(newCard(cardItem, cardCallbacks));
  closeModal(popupCardNew);
  formCardNew.reset();
}

// Обработчики для карточки
const cardCallbacks = {deleteCard, likeCard, enlargeCard};

// Вывод карточек на страницу
initialCards.forEach((cardItem) => {
  cardContainer.append(newCard(cardItem, cardCallbacks));
});

// Обработчики событий
// Открытие модальных окон
buttonProfileEdit.addEventListener('click', () => {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  openModal(popupProfileEdit);
  clearValidation(formProfileEdit, validationSettings);
});

buttonCardNew.addEventListener('click', () => {
  inputCardName.value = '';
  inputCardUrl.value = '';
  openModal(popupCardNew);
  clearValidation(formCardNew, validationSettings);
});

// Закрытие модальных окон по клику на крестик
document.querySelectorAll('.popup__close').forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', event => {
      closeModal(popup);
    })
})

// Закрытие модальных окон по клику на оверлей
document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', closeModalOnOverlay);
});

// Заполнение валидированных форм
enableValidation(validationSettings);
formProfileEdit.addEventListener('submit', handleFormProfileEdit);
formCardNew.addEventListener('submit', handleFormCardNew);