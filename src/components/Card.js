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
      if (this._isCardLiked()) {
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
    return (this._likes.some((user) => {
      return this._userId === user._id;
    }));
  }

  _setDeleteBtn() {
    if (this._userId !== this._cardOwnerId) {
      this._deleteBtn.remove();
    };
  }

  _updateLikeState() {
    this._likesCount.textContent = this._likes.length;
    if (this._isCardLiked()) {
      this._likeBtn.classList.add('element__likes_active');
    }
    else {
      this._likeBtn.classList.remove('element__likes_active', true);
    }
  }

  handleLikeCard(data) {
    this._likes = data.likes;
    this._updateLikeState();
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
    this._setDeleteBtn();
    this._updateLikeState();
    this._setEventListeners();
    return this._view;
  }
}
