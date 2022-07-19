// Функция открытия попапа

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

// Функция закрытия попапа

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Попап редактирования профиля -----------------------------------------------------------------

// Выбираем необходимые DOM-элементы

const popupProfileEditElement = document.querySelector('.popup_type_edit-profile');
const popupProfileEditCloseButtonElement = popupProfileEditElement.querySelector('.popup__close');
const formProfileEditElement = popupProfileEditElement.querySelector('.form');
const popupProfileEditOpenButtonElement = document.querySelector('.profile__edit-button');
const nameInput = formProfileEditElement.querySelector('#name');
const jobInput = formProfileEditElement.querySelector('#job');
const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');

// Слушатели событий

popupProfileEditOpenButtonElement.addEventListener('click', function () {
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileDescriptionElement.textContent;
  openPopup(popupProfileEditElement);
});

popupProfileEditCloseButtonElement.addEventListener('click', function () { closePopup(popupProfileEditElement) });

formProfileEditElement.addEventListener('submit', formProfileEditSubmitHandler);

// Функция обработки формы

function formProfileEditSubmitHandler(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileTitleElement.textContent = name;
  profileDescriptionElement.textContent = job;
  closePopup(popupProfileEditElement);
}

// Попап просмотра изображения -----------------------------------------------------------------

// Выбираем необходимые DOM-элементы

const popupImageElement = document.querySelector('.popup_type_image');
const popupImageCloseButtonElement = popupImageElement.querySelector('.popup__close');

// Слушатели

popupImageCloseButtonElement.addEventListener('click', function () { closePopup(popupImageElement) });

// Попап добавления карточки  -----------------------------------------------------------------

// Выбираем необходимые DOM-элементы

const popupAddCardElement = document.querySelector('.popup_type_add-card');
const popupAddCardCloseButtonElement = popupAddCardElement.querySelector('.popup__close');
const formAddCardElement = popupAddCardElement.querySelector('.form');
const popupAddCardOpenButtonElement = document.querySelector('.profile__add-button');
const titleInput = formAddCardElement.querySelector('#title');
const linkInput = formAddCardElement.querySelector('#link');

const cardTemplate = document.querySelector('.element-template');
const cardsList = document.querySelector('.elements');

// Функция создания карточки, возвращает созданную карточку

function createCard(card) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const elementImg = cardElement.querySelector('.element__img');
  elementImg.src = card.link;
  elementImg.alt = card.name;
  cardElement.querySelector('.element__title').textContent = card.name;
  cardElement.querySelector('.element__likes').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__likes_active');
  });
  cardElement.querySelector('.element__delete').addEventListener('click', deleteElement);
  elementImg.addEventListener('click', function () {
    popupImageElement.querySelector('.popup__img').src = card.link;
    popupImageElement.querySelector('.popup__caption').textContent = card.name;
    openPopup(popupImageElement);
  });
  return cardElement;
}

// Функция добавленя карточки в начало списка (препенд)

function renderCard(card) {
  cardsList.prepend(card);
}

// Фунция добавления карточки на страницу

function addCard(card) {
  renderCard(createCard(card));
}

// Фунцкия удаления элемента через closest

function deleteElement(evt) {
  const card = evt.target.closest('.element');
  card.remove();
}

// Функция рендеринга начальных карточек

function renderInitialCards() {
  initialCards.forEach(addCard);
}

// Функция обработки формы добавления карточки

function formAddCardSubmitHandler(evt) {
  evt.preventDefault();
  const cardContent = {};
  cardContent.name = titleInput.value;
  cardContent.link = linkInput.value;
  addCard(cardContent);
  closePopup(popupAddCardElement);
}

// Слушатели

popupAddCardOpenButtonElement.addEventListener('click', function () {
  titleInput.value = '';
  linkInput.value = '';
  openPopup(popupAddCardElement);
});
popupAddCardCloseButtonElement.addEventListener('click', function () { closePopup(popupAddCardElement) });
formAddCardElement.addEventListener('submit', formAddCardSubmitHandler);

// Рендерим начальные карточки

renderInitialCards();
