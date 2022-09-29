import '../styles/index.css';
import {
    closeByOverlayClick,
    openPopup,
    closePopup,
    imagePopup,
    name,
    job,
    nameInput,
    jobInput,
    profilePopup,
    cardPopup,
    profilePopupWindow,
    cardPopupWindow,
    cardNameInput,
    cardLinkInput
} from './modal';
import {initialCards, renderCard} from './card';
import {enableValidation, resetError, toggleButtonState} from './validate';

//open close buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = profilePopup.elements.closeButton;
const cardAddCloseButton = cardPopup.elements.closeButton;
const cardAddButton = document.querySelector('.profile__add-button');
const photoCloseButton = imagePopup.querySelector('.popup__close-button');
const popupOverlayList = document.querySelectorAll('.popup');

//config
export const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    errorClass: 'popup__input-error_active',
    errorBorder: 'popup__form-input_invalid'
};

//functions
function editProfileFormSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(profilePopupWindow);
}

function addCardFormSubmitHandler(evt) {
    evt.preventDefault();
    renderCard(cardNameInput.value, cardLinkInput.value);
    closePopup(cardPopupWindow);
    cardPopup.reset();
    const buttonElement = cardPopup.querySelector(config.submitButtonSelector);
    const inputList = Array.from(cardPopup.querySelectorAll(config.inputSelector));
    toggleButtonState(inputList, buttonElement, config);
}

enableValidation(config);

//event listeners
popupOverlayList.forEach(function (item) {
    item.addEventListener('mousedown', closeByOverlayClick)
});

photoCloseButton.addEventListener('click', function () {
    closePopup(imagePopup);
});

profileEditButton.addEventListener('click', function () {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    openPopup(profilePopupWindow);
    resetError(profilePopup, config);
});

profileCloseButton.addEventListener('click', function () {
    closePopup(profilePopupWindow);
});

cardAddButton.addEventListener('click', function () {
    cardPopup.reset();
    openPopup(cardPopupWindow);
    resetError(cardPopup, config);
});

cardAddCloseButton.addEventListener('click', function () {
    closePopup(cardPopupWindow);
});

profilePopup.addEventListener('submit', editProfileFormSubmitHandler);

cardPopup.addEventListener('submit', addCardFormSubmitHandler);

//render initial cards
initialCards.forEach(function (item) {
    renderCard(item.name, item.link)
});

