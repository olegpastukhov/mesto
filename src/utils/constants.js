const profileTitleSelector = ('.profile__title');
const profileDescriptionSelector = ('.profile__description');
const profileAvatarSelector = ('.profile__avatar');
const popupAvatarSelector = ('.popup_type_avatar');
const popupEditProfileSelector = ('.popup_type_edit-profile');
const avatarEditPopupElement =  document.querySelector(popupAvatarSelector);
const formEditAvatar = avatarEditPopupElement.querySelector('.form');
const profileEditButton = document.querySelector('.profile__edit-button');
const avatarEditButton= document.querySelector('.profile__avatar-button');
const popupProfileEditElement = document.querySelector(popupEditProfileSelector);
const formProfileEditElement = popupProfileEditElement.querySelector('.form');
const nameInput = formProfileEditElement.querySelector('#username');
const jobInput = formProfileEditElement.querySelector('#job');

const cardAddPopupSelector = ('.popup_type_add-card');
const popupAddCardElement = document.querySelector(cardAddPopupSelector);
const formAddCardElement = popupAddCardElement.querySelector('.form');
const cardAddSubmitButton = formAddCardElement.querySelector('.form__submit');

const validationConfig = {
  formSelector: '.form',
  submitButtonSelector: '.form__submit',
  formInputError: 'form__input_error'
}
const cardAddButton = document.querySelector('.profile__add-button');

export {
  profileTitleSelector,
  profileDescriptionSelector,
  profileAvatarSelector,
  cardAddPopupSelector,
  popupAvatarSelector,
  formAddCardElement,
  popupEditProfileSelector,
  validationConfig,
  cardAddButton,
  profileEditButton,
  avatarEditButton,
  formProfileEditElement,
  formEditAvatar,
  nameInput,
  jobInput,
  cardAddSubmitButton
}
