// Открытие модального окна
export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEsc);
}

// Закрытие модального окна
export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc);
}

// Закрытие модального окна по клику на оверлей
export const closeModalOnOverlay = (event) => {
  if (event.target === event.currentTarget) {
    closeModal(event.target);
  }
}

// Закрытие модального окна нажатием на Esc
function closeEsc(event){
    if (event.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}