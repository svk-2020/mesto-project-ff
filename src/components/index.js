import '../pages/index.css';
// import {initialCards} from './cards';
import {deleteCard, likeCard, newCard} from './card';
import {closeModal, closeModalOnOverlay, openModal} from './modal';
import {enableValidation, clearValidation} from './validation';
import {
  addNewCard,
  editUserAvatar,editUserProfile,
  getCards, getUserProfile
} from './api';

const cardContainer = document.querySelector('.places__list');

// Кнопки
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAvatarEdit = document.querySelector('.profile__image-button');
const buttonCardNew = document.querySelector('.profile__add-button');

// Модальные окна
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupAvatarEdit = document.querySelector('.popup_type_edit-avatar');
const popupCardNew = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImageSrc = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

// Формы
const formProfileEdit = popupProfileEdit.querySelector('.popup__form');
const formAvatarEdit = popupAvatarEdit.querySelector('.popup__form');
const formCardNew = popupCardNew.querySelector('.popup__form');
const inputProfileName = formProfileEdit.querySelector('.popup__input_type_name');
const inputProfileDescription = formProfileEdit.querySelector('.popup__input_type_description');
const inputAvatarUrl = formAvatarEdit.querySelector('.popup__input_type_url');
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
const profileImage = document.querySelector('.profile__image');

// Функция вывода модального окна с картинкой
const enlargeCard = (event) => {
  popupImageSrc.src = event.target.src;
  popupImageSrc.alt = event.target.alt;
  popupImageCaption.textContent = event.target.alt;
  openModal(popupImage);
};

// Обработчики для карточки
const cardCallbacks = {deleteCard, likeCard, enlargeCard};

// Обработчики форм
const handleFormProfileEdit = event => {
  event.preventDefault();
  editUserProfile(inputProfileName.value, inputProfileDescription.value)
    .then((userProfile) => {
      profileName.textContent = userProfile.name;
      profileDescription.textContent = userProfile.about;
    })
    .catch((err) => {
      console.log(err);
    });
  closeModal(popupProfileEdit);
}

const handleFormAvatarEdit = event => {
  event.preventDefault();
  editUserAvatar(inputAvatarUrl.value)
    .then((userProfile) => {
      profileImage.style = `background-image: url('${userProfile.avatar}')`;
    })
    .catch((err) => {
      console.log(err);
    });
  closeModal(popupAvatarEdit);
}

const handleFormCardNew = event => {
  event.preventDefault();
  addNewCard(inputCardName.value, inputCardUrl.value)
    .then((cardInfo) => {
      let cardItem = {};
      cardItem.name = cardInfo.name;
      cardItem.link = cardInfo.link;
      cardContainer.prepend(newCard(cardItem, cardCallbacks));
    })
    .catch((err) => {
      console.log(err);
    });
  closeModal(popupCardNew);
  formCardNew.reset();
}

// Обработчики событий
// Открытие модальных окон
buttonProfileEdit.addEventListener('click', () => {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  openModal(popupProfileEdit);
  clearValidation(formProfileEdit, validationSettings);
});

buttonAvatarEdit.addEventListener('click', () => {
  inputAvatarUrl.value = '';
  openModal(popupAvatarEdit);
  clearValidation(formAvatarEdit, validationSettings);
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
formAvatarEdit.addEventListener('submit', handleFormAvatarEdit);
formCardNew.addEventListener('submit', handleFormCardNew);

// Получение данных с сервера и вывод их на страницу
Promise.all([getUserProfile(), getCards()])
  .then(([userProfile, cardsArray]) => {
    profileName.textContent = userProfile.name;
    profileDescription.textContent = userProfile.about;
    profileImage.style = `background-image: url('${userProfile.avatar}')`;
    // Вывод карточек
    cardsArray.forEach((cardItem) => {
      cardContainer.append(newCard(cardItem, cardCallbacks));
    });
  })
  .catch((err) => {
    console.log(err);
  });
