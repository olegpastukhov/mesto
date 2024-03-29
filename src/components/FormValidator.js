export default class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._formInputError = config.formInputError;
    this._form = form;
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._messages = Array.from(this._form.querySelectorAll('.form__error-message'));
    this._errors = Array.from(this._form.querySelectorAll('.form__input'));
  }

  _handleFormInput = (event) => {
    const input = event.target;
    this._showFieldError(input);
    this._showInputError(input);
    this._setSubmitButtonState();
  }

  _showFieldError = (input) => {
    const span = document.querySelector(`#${input.name}-error`);
    span.textContent = input.validationMessage;
  }

  _showInputError = (input) => {
    if (!input.validity.valid) {
      input.classList.add(this._formInputError);
    } else {
      input.classList.remove(this._formInputError);
    }
  }

  _setSubmitButtonState = () => {
    const isValid = this._form.checkValidity();
    if (isValid) {
      this._button.removeAttribute('disabled');
    }
    else {
      this._button.setAttribute('disabled', true);
    }
  }

  enableValidation = () => {
    this._form.addEventListener('input', (event) => this._handleFormInput(event));
  }

  _clearErrorMessages = () => {
    this._messages.forEach(element => element.textContent = '');
  }

  _clearInputErrors = () => {
    this._errors.forEach(element => element.classList.remove('form__input_error'));
  }

  clearValidation = () => {
    this._clearErrorMessages();
    this._clearInputErrors();
  }
}
