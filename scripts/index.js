// Выборка DOM-элементов
let popupElement = document.querySelector('.popup');
let popupCloseButtonElement = popupElement.querySelector('.popup__close');
let formElement = document.querySelector('.form');
let popupOpenButtonElement = document.querySelector('.profile__edit-button');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');
let profileTitleElement = document.querySelector('.profile__title');
let profileDescriptionElement = document.querySelector('.profile__description');

// Функции
const openPopup = function () {
  nameInput.value = profileTitleElement.textContent
  jobInput.value = profileDescriptionElement.textContent
  popupElement.classList.add('popup_opened');
}

const closePopup = function () {
  popupElement.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  let name = nameInput.value;
  let job = jobInput.value;
  profileTitleElement.textContent = name;
  profileDescriptionElement.textContent = job;
  closePopup();
}

// События
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
