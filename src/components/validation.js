// выводит сообщение об ошибке во вводимых данных
const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
};

// убирает сообщение об ошибке во вводимых данных
const hideInputError = (formElement, inputElement, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
  }
};

// валидация вводимых данных
const isValid = (formElement, inputElement, validationSettings) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
};

// возвращает true, если в форме хотя бы одно поле не валидно
const hasInvalidInput = inputList => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// переключение состояния кнопки - submit(сохранить)
const toggleButtonState = (inputList, buttonElement, validationSettings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
};

// включение валидации для всех полей ввода всплывающего окна - формы
const setEventListeners = (formElement, validationSettings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );
  const submitButton = formElement.querySelector(
    validationSettings.submitButtonSelector
  );

  toggleButtonState(inputList, submitButton, validationSettings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationSettings);
      toggleButtonState(inputList, submitButton, validationSettings);
    });
  });
};

// включение валидации для всех всплывающих окон документа
export const enableValidation = (validationSettings) => {
  const popupList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );

  popupList.forEach((formElement) => {
    setEventListeners(formElement, validationSettings);
  });
}

// очистка сообщений об ошибках валидации
export const clearValidation = (formElement, validationSettings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );
  const submitButton = formElement.querySelector(
    validationSettings.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSettings);
  });
  toggleButtonState(inputList, submitButton, validationSettings);
}