const profileTitle = ('.profile__title');
const profileDescription = ('.profile__description');
const addPopup = ('.popup_type_add-card');
const popupAddCardElement = document.querySelector('.popup_type_add-card');
const formAddCardElement = popupAddCardElement.querySelector('.form');
const addCardSubmitButton = formAddCardElement.querySelector('.form__submit');
const editPopup = ('.popup_type_edit-profile');
const config = {
  formSelector: '.form',
  submitButtonSelector: '.form__submit',
  formInputError: 'form__input_error'
}
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const popupProfileEditElement = document.querySelector('.popup_type_edit-profile');
const formProfileEditElement = popupProfileEditElement.querySelector('.form');
const nameInput = formProfileEditElement.querySelector('#username');
const jobInput = formProfileEditElement.querySelector('#job');

export {
  profileTitle,
  profileDescription,
  addPopup,
  formAddCardElement,
  editPopup,
  config,
  addButton,
  editButton,
  formProfileEditElement,
  nameInput,
  jobInput,
  addCardSubmitButton
}
