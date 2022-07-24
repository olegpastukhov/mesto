const editForm = {
  form: '.popup__form[name="edit-form"]',
  button: '.form__submit'
}

const addForm = {
  form: '.popup__form[name="add-form"]',
  button: '.form__submit'
}

function enableValidation(config) {
  const form = document.querySelector(config.form);
  form.addEventListener('submit', handleFormSubmit);
  form.addEventListener('input', (event) => handleFormInput(event, config));
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const isValid = form.checkValidity();
  if (isValid) {
    form.reset();
  }
}

function handleFormInput(event, config) {
  const input = event.target;
  const form = event.currentTarget;
  input.setAttribute('required', true);
  showFieldError(input);
  setSubmitButtonState(form, config);
}

function showFieldError(input) {
  const span = input.nextElementSibling;
  span.textContent = input.validationMessage.substr(0, (input.validationMessage.indexOf('.') + 1));
}

function setSubmitButtonState(form, config) {
  const button = form.querySelector(config.button);
  const isValid = form.checkValidity();
  if (isValid) {
    button.removeAttribute('disabled');
  }
  else {
    button.setAttribute('disabled', true);
  }
}

function clearFormErrors(popap) {
  const errors = Array.from(popap.querySelectorAll('.form__error-message'));
  errors.forEach(element => element.textContent = '');
}

enableValidation(editForm);
enableValidation(addForm);
