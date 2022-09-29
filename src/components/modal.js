//popups
import {resetError} from "./validate";
import {config} from "./index";

export const imagePopup = document.querySelector('.popup_image');
export const profilePopupWindow = document.querySelector('#profilePopup');
export const cardPopupWindow = document.querySelector('#cardPopup');

//forms
export const profilePopup = document.forms.profilePopup;
export const cardPopup = document.forms.cardPopup;

//profile data
export const name = document.querySelector('.profile__name');
export const job = document.querySelector('.profile__about');

//inputs
export const nameInput = profilePopup.elements.name;
export const jobInput = profilePopup.elements.about;
export const cardNameInput = cardPopup.elements.name;
export const cardLinkInput = cardPopup.elements.link;

//functions

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