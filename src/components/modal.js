
import {resetError} from "./validate";
import {config} from "./index";
//popups
export const imagePopup = document.querySelector('.popup_image');
export const profilePopupWindow = document.querySelector('#profilePopup');
export const cardPopupWindow = document.querySelector('#cardPopup');
export const avatarPopupWindow = document.querySelector('#avatarPopup');

//forms
export const profilePopup = document.forms.profilePopup;
export const cardPopup = document.forms.cardPopup;
export const avatarPopup = document.forms.avatarPopup;

//profile data
export const name = document.querySelector('.profile__name');
export const job = document.querySelector('.profile__about');
export const avatar = document.querySelector('.profile__avatar');
export let profileData = [{}];

//inputs
export const nameInput = profilePopup.elements.name;
export const jobInput = profilePopup.elements.about;
export const cardNameInput = cardPopup.elements.name;
export const cardLinkInput = cardPopup.elements.link;

//functions

export function renderLoading(isLoading, popup) {
    const buttonElement = popup.querySelector('.popup__save-button');
    if (isLoading) {
        buttonElement.classList.add('popup__save-button_loading');
    } else {
        buttonElement.classList.remove('popup__save-button_loading');
    }
}

export function writeMyData(result) {
    profileData.name = result.name;
    profileData.about = result.about;
    profileData.avatar = result.avatar;
}

export function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

export function closeByOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}