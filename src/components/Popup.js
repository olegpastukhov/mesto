export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this._closeButton = this._element.querySelector('.popup__close');
    this._escapeClose = this._handleEscClose.bind(this);
  }

  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._escapeClose);
  }

  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._escapeClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    this._element.addEventListener('mousedown', (event) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }
}
