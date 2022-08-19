export class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._formInputError = config.formInputError;
    this._form = form;
  }

  _handleFormSubmit = (event) => {
    event.preventDefault();
  }

  _handleFormInput = (event) => {
    const input = event.target;
    this._showFieldError(input);
    this._showInputError(input);
    this._setSubmitButtonState(this._form);
  }

  _showFieldError = (input) => {
    const span = input.nextElementSibling;
    span.textContent = input.validationMessage.substr(0, (input.validationMessage.indexOf('.') + 1));
  }

  _showInputError = (input) => {
    if (!input.validity.valid) {
      input.classList.add(this._formInputError);
    } else {
      input.classList.remove(this._formInputError);
    }
  }

  _setSubmitButtonState = () => {
    const button = this._form.querySelector(this._submitButtonSelector);
    const isValid = this._form.checkValidity();
    if (isValid) {
      button.removeAttribute('disabled');
    }
    else {
      button.setAttribute('disabled', true);
    }
  }

  enableValidation = () => {
    this._form.addEventListener('submit', (event) => this._handleFormSubmit(event));
    this._form.addEventListener('input', (event) => this._handleFormInput(event));
  }
}
