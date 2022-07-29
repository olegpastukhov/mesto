config = {
  formSelector: '.form',
  submitButtonSelector: '.form__submit'
}

enableValidation(config);

function enableValidation({ formSelector, submitButtonSelector }) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => {
    form.addEventListener('submit', (event) => handleFormSubmit(event, form));
    form.addEventListener('input', (event) => handleFormInput(event, form, submitButtonSelector));
  });
}

function handleFormSubmit(event, form) {
  event.preventDefault();
  const isValid = form.checkValidity();
  if (isValid) {
    form.reset();
  }
}

function handleFormInput(event, form, submitButtonSelector) {
  const input = event.target;
  showFieldError(input);
  setSubmitButtonState(form, submitButtonSelector);
}

function showFieldError(input) {
  const span = input.nextElementSibling;
  span.textContent = input.validationMessage.substr(0, (input.validationMessage.indexOf('.') + 1));
}

function setSubmitButtonState(form, submitButtonSelector) {
  const button = form.querySelector(submitButtonSelector);
  const isValid = form.checkValidity();
  if (isValid) {
    button.removeAttribute('disabled');
  }
  else {
    button.setAttribute('disabled', true);
  }
}
