import {addEventDelete, addEventLike, addEventOpenPopup} from "./modal";

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//card
const cardTemplate = document.querySelector('#card').content;
const cardElements = document.querySelector('.elements');

export function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__title').textContent = name;
    const elementPhoto = cardElement.querySelector('.element__photo');
    elementPhoto.src = link;
    elementPhoto.setAttribute('alt', name);
    const cardDeleteElement = cardElement.querySelector('.element__delete');
    cardDeleteElement.addEventListener('click', addEventDelete);
    const cardLikeElement = cardElement.querySelector('.element__like');
    cardLikeElement.addEventListener('click', addEventLike);
    addEventOpenPopup(elementPhoto, name, link);
    return cardElement;
}

export function renderCard(name, link) {
    const card = createCard(name, link);
    cardElements.prepend(card);
}