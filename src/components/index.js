import '../styles/index.css';
import {togglePopup, closeByEsc, closeByOverlayClick} from './utils';
import {
    editProfileFormSubmitHandler,
    addCardFormSubmitHandler,
    imagePopup,
    name,
    job,
    nameInput,
    jobInput,
    profilePopup,
    cardPopup
} from './modal';
import {initialCards, renderCard} from './card';
import {enableValidation} from './validate';

//open close buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = profilePopup.elements.closeButton;
const cardAddCloseButton = cardPopup.elements.closeButton;
const cardAddButton = document.querySelector('.profile__add-button');
const photoCloseButton = imagePopup.querySelector('.popup__close-button');
const popupOverlay = document.querySelectorAll('.popup');

//event listeners
popupOverlay.forEach(function (item) {
    item.addEventListener('mousedown', closeByOverlayClick)
});

photoCloseButton.addEventListener('click', function () {
    togglePopup(imagePopup);
});

profileEditButton.addEventListener('click', function () {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    togglePopup(profilePopup);
});

window.addEventListener('keydown', closeByEsc);

profileCloseButton.addEventListener('click', function () {
    togglePopup(profilePopup);
});

cardAddButton.addEventListener('click', function () {
    cardPopup.reset();
    togglePopup(cardPopup);
});

cardAddCloseButton.addEventListener('click', function () {
    togglePopup(cardPopup);
});

profilePopup.addEventListener('submit', editProfileFormSubmitHandler);

cardPopup.addEventListener('submit', addCardFormSubmitHandler);

//render initial cards
initialCards.forEach(function (item) {
    renderCard(item.name, item.link)
});

//functions
enableValidation({
    formSelector: '.popup',
    fieldsetSelector: '.popup__container',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    errorClass: 'popup__input-error_active'
});