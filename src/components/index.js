import '../styles/index.css';
import {
    closeByOverlayClick,
    openPopup,
    closePopup,
    renderLoading,
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
    cardLinkInput,
    avatar, profileData, avatarPopupWindow, avatarPopup
} from './modal';
import {initialCards, renderCard} from './card';
import {enableValidation, resetError, toggleButtonState} from './validate';
import {getMyData, getCards, editMyData, editMyAvatar} from './api';

//open close buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = profilePopup.elements.closeButton;
const cardAddCloseButton = cardPopup.elements.closeButton;
const avatarCloseButton = avatarPopup.elements.closeButton;
const cardAddButton = document.querySelector('.profile__add-button');
const photoCloseButton = imagePopup.querySelector('.popup__close-button');
const popupOverlayList = document.querySelectorAll('.popup');
const avatarButton = document.querySelector('.profile__avatar-overlay');


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
export function renderMyData() {
    name.textContent = profileData.name;
    job.textContent = profileData.about;
    avatar.src = profileData.avatar;
}

function editProfileFormSubmitHandler(evt) {
    evt.preventDefault();
    renderLoading(true, profilePopup);
    // name.textContent = nameInput.value;
    // job.textContent = jobInput.value;
    profileData.name = nameInput.value;
    profileData.about = jobInput.value;
    editMyData();
    getMyData();
    renderMyData();
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

function editAvatarFormSubmitHandler(evt) {
    evt.preventDefault();
    editMyAvatar();
    getMyData();
    renderMyData();
    closePopup(avatarPopupWindow);
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
    nameInput.value = profileData.name;
    jobInput.value = profileData.about;
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

avatarButton.addEventListener('click', function () {
    avatarPopup.reset();
    openPopup(avatarPopupWindow);
    resetError(avatarPopupWindow, config);
})

avatarCloseButton.addEventListener('click', function () {
    closePopup(avatarPopupWindow);
})

profilePopup.addEventListener('submit', editProfileFormSubmitHandler);

cardPopup.addEventListener('submit', addCardFormSubmitHandler);

avatarPopup.addEventListener('submit', editAvatarFormSubmitHandler);

//render initial cards
// initialCards.forEach(function (item) {
//     renderCard(item.name, item.link)
// });

getMyData();
getCards();
