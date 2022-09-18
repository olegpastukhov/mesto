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
  profileTitleSelector,
  profileDescriptionSelector,
  profileAvatarSelector,
  cardAddPopupSelector,
  formAddCardElement,
  formProfileEditElement,
  formEditAvatar,
  popupEditProfileSelector,
  popupAvatarSelector,
  validationConfig,
  cardAddButton,
  profileEditButton,
  avatarEditButton,
  nameInput,
  jobInput,
  cardAddSubmitButton
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
    cardsList.renderItems(initialCards.reverse());
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });


// Создаём экземпляр класса UserInfo

const userInfo = new UserInfo({
  username: profileTitleSelector,
  job: profileDescriptionSelector,
  avatar: profileAvatarSelector
});

// Редактирование профиля

const popupEditProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleFormSubmit: (formData) => {
    popupEditProfile.loading(true);
    api.editUserInfo(formData)
      .then((formData) => {
        userInfo.setUserInfo(formData);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupEditProfile.loading(false);
      });
  }
});

popupEditProfile.setEventListeners();

function fillInEditProfileFormInputs({ username, job }) {
  nameInput.value = username;
  jobInput.value = job;
}

// Редактирования аватара

const avatarEditPopup = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  handleFormSubmit: (data) => {
    avatarEditPopup.loading(true);
    api.editAvatar(data)
      .then((data) => {
        // avatar.src = data.avatar;
        userInfo.setUserInfo(data);
        avatarEditPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        avatarEditPopup.loading(false);
      });
  }
});

avatarEditPopup.setEventListeners();

avatarEditButton.addEventListener('click', () => {
  formEditAvatarValidator.clearValidation();
  avatarEditPopup.open();
});

profileEditButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  fillInEditProfileFormInputs(info);
  formEditProfileValidator.clearValidation();
  popupEditProfile.open();
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
      cardDeletePopup.open(() => {
        api.deleteCard(cardId)
          .then(() => {
            cardDeletePopup.close();
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

const cardAddPopup = new PopupWithForm({
  popupSelector: cardAddPopupSelector,
  handleFormSubmit: (formData) => {
    cardAddPopup.loading(true);
    api.addCard(formData)
      .then((formData) => {
        cardsList.addItem(createCard(formData));
        cardAddPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        cardAddPopup.loading(false);
      });
  }
});

cardAddPopup.setEventListeners();

cardAddButton.addEventListener('click', () => {
  cardAddSubmitButton.setAttribute('disabled', true);
  formAddNewCardValidator.clearValidation();
  cardAddPopup.open();
})

// Попап с картинкой

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

// Попап с подтверждением удаления карточки

const cardDeletePopup = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete-card'
});
cardDeletePopup.setEventListeners();

// Валидация

const formEditProfileValidator = new FormValidator(validationConfig, formProfileEditElement);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(validationConfig, formAddCardElement);
formAddNewCardValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(validationConfig, formEditAvatar);
formEditAvatarValidator.enableValidation();
