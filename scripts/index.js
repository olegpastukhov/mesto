// Выборка DOM-элементов
let popupElement = document.querySelector('.popup');
let popupCloseButtonElement = popupElement.querySelector('.popup__close');
let formElement = document.querySelector('.form');
let popupOpenButtonElement = document.querySelector('.profile__edit-button');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');

// Функции
const openPopup = function () {
  popupElement.classList.add('popup_opened');
}

const closePopup = function () {
  popupElement.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  popupElement.classList.remove('popup_opened');
  // Получите значение полей jobInput и nameInput из свойства value
  let name = nameInput.value;
  let job = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  let profileTitleElement = document.querySelector('.profile__title');
  let profileDescriptionElement = document.querySelector('.profile__description');
  // Вставьте новые значения с помощью textContent
  profileTitleElement.textContent = name;
  profileDescriptionElement.textContent = job;
}

// События
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
