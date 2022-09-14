const profileTitle = ('.profile__title');
const profileDescription = ('.profile__description');
const profileAvatar = ('.profile__avatar');
const popupAvatar = ('.popup_type_avatar');
const editPopup = ('.popup_type_edit-profile');
const editAvatarPopupElement =  document.querySelector(popupAvatar);
const formEditAvatar = editAvatarPopupElement.querySelector('.form');
const editButton = document.querySelector('.profile__edit-button');
const editAvatarButton= document.querySelector('.profile__avatar-button');
const popupProfileEditElement = document.querySelector(editPopup);
const formProfileEditElement = popupProfileEditElement.querySelector('.form');
const nameInput = formProfileEditElement.querySelector('#username');
const jobInput = formProfileEditElement.querySelector('#job');

const addPopup = ('.popup_type_add-card');
const popupAddCardElement = document.querySelector(addPopup);
const formAddCardElement = popupAddCardElement.querySelector('.form');
const addCardSubmitButton = formAddCardElement.querySelector('.form__submit');

const config = {
  formSelector: '.form',
  submitButtonSelector: '.form__submit',
  formInputError: 'form__input_error'
}
const addButton = document.querySelector('.profile__add-button');

export {
  profileTitle,
  profileDescription,
  profileAvatar,
  addPopup,
  popupAvatar,
  formAddCardElement,
  editPopup,
  config,
  addButton,
  editButton,
  editAvatarButton,
  formProfileEditElement,
  formEditAvatar,
  nameInput,
  jobInput,
  addCardSubmitButton
}
