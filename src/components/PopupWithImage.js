import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._element.querySelector('.popup__img');
    this._popupCaption = this._element.querySelector('.popup__caption');
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupCaption.textContent = name;
    this._popupImage.alt = name;
    super.open();
  }
}
