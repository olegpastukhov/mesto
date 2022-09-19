import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._form = this._element.querySelector('.popup__form');
  }

  open(callback) {
    super.open();
    this._handleSubmit = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmit();
    });
  }
}
