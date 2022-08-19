import { openPopup } from "./index.js";

export class Card {
  constructor(card, selector) {
    this._name = card.name;
    this._link = card.link;
    this._selector = selector;
  }

  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _deleteElement = () => {
    this._view.remove();
    this._view = null;
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

  _toggleLikesActive = (evt) => {
    evt.target.classList.toggle('element__likes_active');
  }

  render = (container) => {
    this._view = this._getTemplate();
    const elementImg = this._view.querySelector('.element__img');
    elementImg.src = this._link;
    elementImg.alt = this._name;
    this._view.querySelector('.element__title').textContent = this._name;
    this._view.querySelector('.element__delete').addEventListener('click', this._deleteElement);
    this._view.querySelector('.element__likes').addEventListener('click', this._toggleLikesActive);
    elementImg.addEventListener('click', this._showImagePopup);
    return this._view;
  }
}
