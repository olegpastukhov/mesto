import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  profileTitle,
  profileDescription,
  profileAvatar,
  addPopup,
  formAddCardElement,
  formProfileEditElement,
  formEditAvatar,
  editPopup,
  popupAvatar,
  config,
  addButton,
  editButton,
  editAvatarButton,
  nameInput,
  jobInput,
  addCardSubmitButton
} from "../utils/constants.js";

// Создание экземпляра класса Api

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-50",
  headers: {
    'Content-type': 'application/json',
    authorization: 'b1b1fe0a-a2f0-4479-8407-51b1f97bcc74'
  }
});

// Загрузка данных с сервера

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });


// Создаём экземпляр класса UserInfo

const userInfo = new UserInfo({
  username: profileTitle,
  job: profileDescription,
  avatar: profileAvatar
});

// Редактирование профиля

const editProfilePopup = new PopupWithForm({
  popupSelector: editPopup,
  handleFormSubmit: (formData) => {
    editProfilePopup.loading(true);
    api.editUserInfo(formData)
      .then((formData) => {
        userInfo.setUserInfo(formData);
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editProfilePopup.loading(false);
      });
  }
});

editProfilePopup.setEventListeners();

function fillInEditProfileFormInputs({ username, job }) {
  nameInput.value = username;
  jobInput.value = job;
}

// Редактирования аватара

const editAvatarPopup = new PopupWithForm({
  popupSelector: popupAvatar,
  handleFormSubmit: (data) => {
    editAvatarPopup.loading(true);
    api.editAvatar(data)
      .then((data) => {
        avatar.src = data.avatar;
        userInfo.setUserInfo(data);
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editAvatarPopup.loading(false);
      });
  }
});

editAvatarPopup.setEventListeners();

editAvatarButton.addEventListener('click', () => {
  formEditAvatarValidator.clearValidation();
  editAvatarPopup.open();
});

editButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  fillInEditProfileFormInputs({
    username: info.username,
    job: info.job
  });
  editProfilePopup.open();
});

// Попап лобавления карточки, функционал добавления карточки

const createCard = (data) => {
  const card = new Card({
    data: data,
    userId: userId,
    cardSelector: '.element-template',
    handleCardClick: (title, link) => {
      popupImage.open(title, link);
    },
    handleDeleteIconClick: (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.submitCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            deleteCardPopup.close();
            card.deleteElement();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handleSetLike: (cardId) => {
      api.setLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (cardId) => {
      api.deleteLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
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
    addCardPopup.loading(true);
    api.addCard(formData)
      .then((formData) => {
        cardsList.addItem(createCard(formData));
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        addCardPopup.loading(false);
      });
  }
});

addCardPopup.setEventListeners();

addButton.addEventListener('click', () => {
  addCardSubmitButton.setAttribute('disabled', true);
  formAddNewCardValidator.clearValidation();
  addCardPopup.open();
})

// Попап с картинкой

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

// Попап с подтверждением удаления карточки

const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete-card'
});
deleteCardPopup.setEventListeners();

// Валидация

const formEditProfileValidator = new FormValidator(config, formProfileEditElement);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(config, formAddCardElement);
formAddNewCardValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(config, formEditAvatar);
formEditAvatarValidator.enableValidation();
