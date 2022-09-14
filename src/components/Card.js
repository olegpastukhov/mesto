export default class Card {
  constructor({ data, cardSelector, userId, handleCardClick, handleDeleteIconClick, handleSetLike, handleRemoveLike }) {
    this._title = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
  }

  _getTemplate = () => {
      this._card = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return this._card;
  }

  deleteElement = () => {
    this._view.remove();
    this._view = null;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      if (this._likeBtn.classList.contains('element__likes_active')) {
        this._handleRemoveLike(this._cardId);
      } else {
        this._handleSetLike(this._cardId);
      }
    });
    this._deleteBtn.addEventListener('click', () => {
      this._handleDeleteIconClick(this._cardId);
      });
    this._image.addEventListener('click', () => {
        this._handleCardClick(this._title, this._link);
      });
  }

  _isCardLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._likeBtn.classList.add('element__likes_active');
    }
  }

  _hasDeleteBtn() {
    if (this._userId !== this._cardOwnerId) {
      this._deleteBtn.remove();
    }
  }

  handleLikeCard() {
    this._likesCount.textContent = this._likes.length;
    this._likeBtn.classList.toggle('element__likes_active');
  }

  generateCard() {
    this._view = this._getTemplate();
    this._image = this._view.querySelector('.element__img');
    this._likeBtn = this._view.querySelector('.element__likes');
    this._likesCount = this._view.querySelector('.element__likes-count');
    this._deleteBtn = this._view.querySelector('.element__delete');
    this._image.src = this._link;
    this._image.alt = this._title;
    this._view.querySelector('.element__title').textContent = this._title;
    this._hasDeleteBtn();
    this._isCardLiked();
    this._likesCount.textContent = this._likes.length;
    this._setEventListeners();
    return this._view;
  }
}
