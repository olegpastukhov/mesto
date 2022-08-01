// Функция открытия попапа

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
popupProfileEditElement.addEventListener('mousedown', closePopupByClickOnOverlay);
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

// Попап просмотра изображения -----------------------------------------------------------------

// Выбираем необходимые DOM-элементы

const popupImageElement = document.querySelector('.popup_type_image');

// Слушатели

popupImageElement.addEventListener('mousedown', closePopupByClickOnOverlay);

// Попап добавления карточки  -----------------------------------------------------------------

// Выбираем необходимые DOM-элементы

const popupAddCardElement = document.querySelector('.popup_type_add-card');
const formAddCardElement = popupAddCardElement.querySelector('.form');
const popupAddCardOpenButtonElement = document.querySelector('.profile__add-button');
const titleInput = formAddCardElement.querySelector('#title');
const linkInput = formAddCardElement.querySelector('#link');
const popupAddCardSubmitButton = formAddCardElement.querySelector('.form__submit');

const popupImageElementImg = popupImageElement.querySelector('.popup__img');
const popupImageElementCaption = popupImageElement.querySelector('.popup__caption')

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
    popupImageElementImg.src = card.link;
    popupImageElementImg.alt = card.name;
    popupImageElementCaption.textContent = card.name;
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

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardContent = {};
  cardContent.name = titleInput.value;
  cardContent.link = linkInput.value;
  addCard(cardContent);
  closePopup(popupAddCardElement);
}

// Слушатели

popupAddCardElement.addEventListener('mousedown', closePopupByClickOnOverlay);
popupAddCardOpenButtonElement.addEventListener('click', function () {
  popupAddCardSubmitButton.setAttribute('disabled', true);
  clearInputValues(popupAddCardElement);
  clearInputErrors(popupAddCardElement);
  clearErrorMessages(popupAddCardElement);
  openPopup(popupAddCardElement);
});

formAddCardElement.addEventListener('submit', handleAddCardFormSubmit);

// Рендерим начальные карточки

renderInitialCards();
