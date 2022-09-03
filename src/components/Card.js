export default class Card {
  constructor({ data, cardSelector, handleCardClick }) {
    this._title = data.title;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate = () => {
      this._card = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return this._card;
  }

  _deleteElement = () => {
    this._view.remove();
    this._view = null;
  }

  _toggleLikesActive = (evt) => {
    evt.target.classList.toggle('element__likes_active');
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', this._toggleLikesActive);
    this._deleteBtn.addEventListener('click', () => {
        this._deleteElement();
      });
    this._image.addEventListener('click', () => {
        this._handleCardClick(this._title, this._link);
      });
  }

  generateCard() {
    this._view = this._getTemplate();
    this._image = this._view.querySelector('.element__img');
    this._likeBtn = this._view.querySelector('.element__likes');
    this._deleteBtn = this._view.querySelector('.element__delete');
    this._image.src = this._link;
    this._image.alt = this._title;
    this._view.querySelector('.element__title').textContent = this._title;
    this._setEventListeners();
    return this._view;
  }
}
