import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './cards.js';
export { openPopup };

// // Функция открытия попапа

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

// Функция закрытия попапа

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

// Функция закрытия попапа кликом на оверлей

function closePopupByClickOnOverlay(event, popup) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

// Функция закрытия попапа клавишей Esc

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Удаление сообщений об ошибке

function clearErrorMessages(popup) {
  const errors = Array.from(popup.querySelectorAll('.form__error-message'));
  errors.forEach(element => element.textContent = '');
}

// Функция очистки полей ввода от состояния ошибки

function clearInputErrors(popup) {
  const errors = Array.from(popup.querySelectorAll('.form__input'));
  errors.forEach(element => element.classList.remove('form__input_error'));
}

// Функция очистки полей формы

function clearInputValues(popup) {
  const inputs = Array.from(popup.querySelectorAll('.form__input'));
  inputs.forEach(element => element.value = '');
}

// Навешиваем функцию закрытия попапа сразу на все крестики

const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Навешиваем функцию закрытия попапа кликом по оверлею на все попапы сразу

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => popup.addEventListener('mousedown', closePopupByClickOnOverlay));

// Попап редактирования профиля -----------------------------------------------------------------

// Выбираем необходимые DOM-элементы

const popupProfileEditElement = document.querySelector('.popup_type_edit-profile');
const formProfileEditElement = popupProfileEditElement.querySelector('.form');
const popupProfileEditOpenButtonElement = document.querySelector('.profile__edit-button');
const nameInput = formProfileEditElement.querySelector('#name');
const jobInput = formProfileEditElement.querySelector('#job');
const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
const popupProfileEditSubmitButton = formProfileEditElement.querySelector('.form__submit');

// Слушатели событий

popupProfileEditOpenButtonElement.addEventListener('click', function () {
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileDescriptionElement.textContent;
  clearInputErrors(popupProfileEditElement);
  clearErrorMessages(popupProfileEditElement);
  openPopup(popupProfileEditElement);

});

formProfileEditElement.addEventListener('submit', handleEditProfileFormSubmit);

// Функция обработки формы

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileTitleElement.textContent = name;
  profileDescriptionElement.textContent = job;
  closePopup(popupProfileEditElement);
}

// Попап добавления карточки  -----------------------------------------------------------------

// Выбираем необходимые DOM-элементы

const popupAddCardElement = document.querySelector('.popup_type_add-card');
const formAddCardElement = popupAddCardElement.querySelector('.form');
const popupAddCardOpenButtonElement = document.querySelector('.profile__add-button');
const titleInput = formAddCardElement.querySelector('#title');
const linkInput = formAddCardElement.querySelector('#link');
const popupAddCardSubmitButton = formAddCardElement.querySelector('.form__submit');
const cardsList = document.querySelector('.elements');

// Функция обработки формы добавления карточки

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardContent = {};
  cardContent.name = titleInput.value;
  cardContent.link = linkInput.value;
  addCard(cardContent);
  closePopup(popupAddCardElement);
}

// Функция добавления карточки на страницу

function addCard(card) {
  const newCard = new Card(card);
  newCard.render(cardsList);
}

// Функция рендера шести начальных карточек

function renderInitialCards(cards) {
  cards.forEach(card => {
    addCard(card);
  });
}

// Рендерим начальные карточки

renderInitialCards(initialCards);

// Слушатели

popupAddCardOpenButtonElement.addEventListener('click', function () {
  popupAddCardSubmitButton.setAttribute('disabled', true);
  clearInputValues(popupAddCardElement);
  clearInputErrors(popupAddCardElement);
  clearErrorMessages(popupAddCardElement);
  openPopup(popupAddCardElement);
});

formAddCardElement.addEventListener('submit', handleAddCardFormSubmit);

// Валидация

const config = {
  formSelector: '.form',
  submitButtonSelector: '.form__submit',
  formInputError: 'form__input_error'
}

const forms = Array.from(document.querySelectorAll('.form'));
forms.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
});
