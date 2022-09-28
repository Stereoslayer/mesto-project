import {closeByEsc, togglePopup} from "./utils";
import {renderCard} from './card';
//popups
export const imagePopup = document.querySelector('.popup_image');
const popupPhotoImage = document.querySelector('.popup__photo');
const popupPhotoTitle = document.querySelector('.popup__figcaption');

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

export function editProfileFormSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    togglePopup(profilePopup);
}

export function addCardFormSubmitHandler(evt) {
    evt.preventDefault();
    if (cardNameInput.value !== '' && cardLinkInput.value !== '') {
        renderCard(cardNameInput.value, cardLinkInput.value);
        togglePopup(cardPopup);
        cardPopup.reset();
    }
}

export function addEventDelete(evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.element').remove();
}

export function addEventLike(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__like_active');
}

export function addEventOpenPopup(item, name, link) {
    item.addEventListener('click', function () {
        popupPhotoImage.src = link;
        popupPhotoImage.alt = name;
        popupPhotoTitle.textContent = name;
        togglePopup(imagePopup);
        window.addEventListener('keydown', closeByEsc);
    })
}