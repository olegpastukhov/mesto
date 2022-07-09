// Попап редактирования профиля -------------------------------------------------------------------

// Выборка DOM-элементов попапа редактирования профиля
let popupProfileEditElement = document.querySelector('.popup_type_edit-profile');
let popupProfileEditCloseButtonElement = popupProfileEditElement.querySelector('.popup__close');
let formProfileEditElement = popupProfileEditElement.querySelector('.form');
let popupProfileEditOpenButtonElement = document.querySelector('.profile__edit-button');
let nameInput = formProfileEditElement.querySelector('#name');
let jobInput = formProfileEditElement.querySelector('#job');
let profileTitleElement = document.querySelector('.profile__title');
let profileDescriptionElement = document.querySelector('.profile__description');

// Функции
const openProfileEditPopup = function () {
  nameInput.value = profileTitleElement.textContent
  jobInput.value = profileDescriptionElement.textContent
  popupProfileEditElement.classList.add('popup_opened');
}

const closeProfileEditPopup = function () {
  popupProfileEditElement.classList.remove('popup_opened');
}

function formProfileEditSubmitHandler(evt) {
  evt.preventDefault();
  let name = nameInput.value;
  let job = jobInput.value;
  profileTitleElement.textContent = name;
  profileDescriptionElement.textContent = job;
  closeProfileEditPopup();
}

// События
popupProfileEditOpenButtonElement.addEventListener('click', openProfileEditPopup);
popupProfileEditCloseButtonElement.addEventListener('click', closeProfileEditPopup);
formProfileEditElement.addEventListener('submit', formProfileEditSubmitHandler);

// Попап открытия картинки ------------------------------------------------------------------------

let popupImageElement = document.querySelector('.popup_type_image');
let popupImageCloseButtonElement = popupImageElement.querySelector('.popup__close');
let popupImageOpenButtonElement = document.querySelector('.element__img');

const closeImagePopup = function () {
  popupImageElement.classList.remove('popup_opened');
}
popupImageCloseButtonElement.addEventListener('click', closeImagePopup);


// Попап добавления карточки ------------------------------------------------------------------------

let popupAddCardElement = document.querySelector('.popup_type_add-card');
let popupAddCardCloseButtonElement = popupAddCardElement.querySelector('.popup__close');
let formAddCardElement = popupAddCardElement.querySelector('.form');
let popupAddCardOpenButtonElement = document.querySelector('.profile__add-button');
let titleInput = formAddCardElement.querySelector('#title');
let linkInput = formAddCardElement.querySelector('#link');

const cardTemplate = document.querySelector('.element-template').content;
const cardsList = document.querySelector('.elements');

function createCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__img').src = card.link;
  cardElement.querySelector('.element__img').alt = card.name;
  cardElement.querySelector('.element__title').textContent = card.name;
  cardElement.querySelector('.element__likes').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__likes_active');
  });
  cardElement.querySelector('.element__delete').addEventListener('click', elementDelete);
  cardElement.querySelector('.element__img').addEventListener('click', function () {
    popupImageElement.querySelector('.popup__img').src = card.link;
    popupImageElement.querySelector('.popup__caption').textContent = card.name;
    popupImageElement.classList.add('popup_opened');
  });
  cardsList.prepend(cardElement);
  // cardsList.append(cardElement);
}
function elementDelete(event) {
  const card = (event.target.parentNode).parentNode;
  card.remove();
}

function createInitialCards() {
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  initialCards.forEach(createCard);
}

createInitialCards();

const openAddCardPopup = function () {
  popupAddCardElement.classList.add('popup_opened');
}

const closeAddCardPopup = function () {
  popupAddCardElement.classList.remove('popup_opened');
}

function formAddCardSubmitHandler(evt) {
  evt.preventDefault();
  let addCard = {};
  addCard.name = titleInput.value;
  addCard.link = linkInput.value;
  console.log(titleInput.value, linkInput.value);
  createCard(addCard);
  closeAddCardPopup();
}

// События
popupAddCardOpenButtonElement.addEventListener('click', openAddCardPopup);
popupAddCardCloseButtonElement.addEventListener('click', closeAddCardPopup);
formAddCardElement.addEventListener('submit', formAddCardSubmitHandler);
