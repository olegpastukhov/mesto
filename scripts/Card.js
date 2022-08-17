class Card {
  static _template = document.querySelector('.element-template').content;
  constructor(card) {
    this._name = card.name;
    this._link = card.link;
  }

  _deleteElement = () => {
    this._view.remove();
  }

  _showImagePopup = () => {
    const popupImageElement = document.querySelector('.popup_type_image');
    const popupImageElementImg = popupImageElement.querySelector('.popup__img');
    const popupImageElementCaption = popupImageElement.querySelector('.popup__caption');
    popupImageElementImg.src = this._link;
    popupImageElementImg.alt = this._name;
    popupImageElementCaption.textContent = this._name;
    openPopup(popupImageElement);
  }

  render = (container) => {
    this._view = Card._template.cloneNode(true).children[0];
    const elementImg = this._view.querySelector('.element__img');
    elementImg.src = this._link;
    elementImg.alt = this._name;
    this._view.querySelector('.element__title').textContent = this._name;
    this._view.querySelector('.element__delete').addEventListener('click', this._deleteElement);
    this._view.querySelector('.element__likes').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__likes_active');
    });
    elementImg.addEventListener('click', this._showImagePopup);
    container.prepend(this._view);
  }
}
