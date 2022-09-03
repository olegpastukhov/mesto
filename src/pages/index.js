import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/cards.js";
import {
  profileTitle,
  profileDescription,
  addPopup,
  formAddCardElement,
  formProfileEditElement,
  editPopup,
  config,
  addButton,
  editButton,
  nameInput,
  jobInput
} from "../utils/constants.js";

// Редактирование профиля

const userInfo = new UserInfo({
  username: profileTitle,
  job: profileDescription,
});

const editProfilePopup = new PopupWithForm({
  popupSelector: editPopup,
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    editProfilePopup.close();
  }
});
editProfilePopup.setEventListeners();

function fillInEditProfileFormInputs({ username, job }) {
  nameInput.value = username;
  jobInput.value = job;
}

// Попап с картинкой

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

// Попап лобавления карточки, функционал добавления карточки

editButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  fillInEditProfileFormInputs({
    username: info.username,
    job: info.job
  });
  formEditProfileValidator.clearValidation();
  editProfilePopup.open();
});

const createCard = (data) => {
  const card = new Card({
    data: data,
    cardSelector: '.element-template',
    handleCardClick: (title, link) => {
      popupImage.open(title, link);
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
};

const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, '.elements');

const addCardPopup = new PopupWithForm({
  popupSelector: addPopup,
  handleFormSubmit: (formData) => {
    cardsList.addItem(createCard(formData));
    addCardPopup.close();
  }
});
addCardPopup.setEventListeners();

addButton.addEventListener('click', () => {
  formAddNewCardValidator.clearValidation();
  addCardPopup.open();
})

// Функция рендера шести начальных карточек

function renderInitialCards(cards) {
  cards.forEach(card => {
    cardsList.addItem(createCard(card));
  });
}

// Рендерим начальные карточки

renderInitialCards(initialCards);

// Валидация

const formEditProfileValidator = new FormValidator(config, formProfileEditElement);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(config, formAddCardElement);
formAddNewCardValidator.enableValidation();
