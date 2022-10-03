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
    cardLinkInput,
    avatar, avatarPopupWindow, avatarPopup, avatarUrlInput, renderLoading, cardDeletePopup, cardDeletePopupWindow,
} from './modal';
import {deleteCardElement, renderCard} from './card';
import {enableValidation, resetError, toggleButtonState} from './validate';
import {getProfile, getCards, editProfile, editProfilePic, addCard, deleteCard, apiConfig} from './api';

//open close buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = profilePopup.elements.closeButton;
const cardAddCloseButton = cardPopup.elements.closeButton;
const avatarCloseButton = avatarPopup.elements.closeButton;
const deleteCardCloseButton = cardDeletePopup.elements.closeButton;
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
export function updateProfile(data) {
    name.textContent = data.name;
    job.textContent = data.about;
    avatar.src = data.avatar;
}

function editProfileFormSubmitHandler(evt) {
    evt.preventDefault();
    renderLoading(profilePopup, 'Сохранение...');
    editProfile(nameInput.value, jobInput.value)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
        .then((res) => {
            updateProfile(res);
            closePopup(profilePopupWindow);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(profilePopup, 'Сохранить');
        })
}

function addCardFormSubmitHandler(evt) {
    evt.preventDefault();
    renderLoading(cardPopup, 'Сохранение...');
    addCard(cardNameInput.value, cardLinkInput.value)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
        .then((res) => {
            renderCard(res);
            closePopup(cardPopupWindow);
            cardPopup.reset();
            const buttonElement = cardPopup.querySelector(config.submitButtonSelector);
            const inputList = Array.from(cardPopup.querySelectorAll(config.inputSelector));
            toggleButtonState(inputList, buttonElement, config);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(cardPopup, 'Создать');
        })
}

function editAvatarFormSubmitHandler(evt) {
    evt.preventDefault();
    renderLoading(avatarPopup, 'Сохранение...');
    editProfilePic(avatarUrlInput.value)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
        .then((res) => {
            updateProfile(res);
            closePopup(avatarPopupWindow);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(avatarPopup, 'Сохранить');
        })
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

avatarButton.addEventListener('click', function () {
    avatarPopup.reset();
    openPopup(avatarPopupWindow);
    resetError(avatarPopupWindow, config);
})

avatarCloseButton.addEventListener('click', function () {
    closePopup(avatarPopupWindow);
})

deleteCardCloseButton.addEventListener('click', function () {
    closePopup(cardDeletePopupWindow);
})

profilePopup.addEventListener('submit', editProfileFormSubmitHandler);

cardPopup.addEventListener('submit', addCardFormSubmitHandler);

avatarPopup.addEventListener('submit', editAvatarFormSubmitHandler);

getProfile()
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .then((res) => {
        updateProfile(res);
        apiConfig.id = res._id;
        getCards()
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then((res) => {
                res.reverse().forEach((res) => {
                    renderCard(res);
                })
            })
            .catch((err) => {
                console.log(err);
            })
    })
    .catch((err) => {
        console.log(err);
    })


