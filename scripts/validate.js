config = {
  formSelector: '.form',
  submitButtonSelector: '.form__submit',
  formInputError: 'form__input_error'
}

enableValidation(config);

function enableValidation({ formSelector, submitButtonSelector, formInputError}) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => {
    form.addEventListener('submit', (event) => handleFormSubmit(event, form));
    form.addEventListener('input', (event) => handleFormInput(event, form, submitButtonSelector, formInputError));
  });
}

function handleFormSubmit(event, form) {
  event.preventDefault();
  const isValid = form.checkValidity();
  if (isValid) {
    form.reset();
  }
}

function handleFormInput(event, form, submitButtonSelector, formInputError) {
  const input = event.target;
  showFieldError(input);
  showInputError(input, formInputError);
  setSubmitButtonState(form, submitButtonSelector);
}

function showFieldError(input) {
  const span = input.nextElementSibling;
  span.textContent = input.validationMessage.substr(0, (input.validationMessage.indexOf('.') + 1));
}

function showInputError(input, formInputError) {
  if (!input.validity.valid) {
    input.classList.add(formInputError);
  } else {
    input.classList.remove(formInputError);
  }
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
