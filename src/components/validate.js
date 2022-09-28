function showInputError(formElement, inputElement, errorMessage, options) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(options.errorClass);
}

function hideInputError(formElement, inputElement, options) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, options) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessageType);
    } else if
    (inputElement.validity.valueMissing) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessageEmpty);
    } else if
    (inputElement.validity.typeMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessageNolink);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, options);
    } else {
        hideInputError(formElement, inputElement, options);
    }
}


function hasInvalidInput(inputList) {
    return inputList.some(function (inputElement) {
        return !inputElement.validity.valid
    });
}

function toggleButtonState(inputList, buttonElement, options) {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(options.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(options.inactiveButtonClass);
    }
}

function setEventListeners(formElement, options) {
    const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
    const buttonElement = formElement.querySelector(options.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, options);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, options);
            toggleButtonState(inputList, buttonElement, options);
        });
    });
}

export function enableValidation(options) {
    const formList = Array.from(document.querySelectorAll(options.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(document.querySelectorAll(options.fieldsetSelector));
        fieldsetList.forEach((fieldset) => {
            setEventListeners(fieldset, options);
        })
    });
}