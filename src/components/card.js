import {
    avatarPopup,
    cardDeletePopupWindow, cardPopupWindow,
    closeByEsc, closePopup,
    cardDeletePopup,
    imagePopup,
    openPopup,
    renderLoading
} from "./modal";
import {addLike, deleteLike, apiConfig, deleteCard} from "./api";

//card
const cardTemplate = document.querySelector('#card').content;
const cardElements = document.querySelector('.elements');

//popups
const popupPhotoImage = document.querySelector('.popup__photo');
const popupPhotoTitle = document.querySelector('.popup__figcaption');

//functions

function addEventOpenPopup(item, name, link) {
    item.addEventListener('click', function () {
        popupPhotoImage.src = link;
        popupPhotoImage.alt = name;
        popupPhotoTitle.textContent = name;
        openPopup(imagePopup);
        document.addEventListener('keydown', closeByEsc);
    })
}

function deleteCardSubmitHandler(evt, card, cardElement) {
    evt.preventDefault();
    renderLoading(cardDeletePopup, 'Удаление...');
    deleteCard(card._id)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
        .then((res) => {
            deleteCardElement(cardElement);
            closePopup(cardDeletePopupWindow);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(cardDeletePopup, 'Да');
        })
}

export function createCard(card) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__title').textContent = card.name;
    const elementPhoto = cardElement.querySelector('.element__photo');
    elementPhoto.src = card.link;
    elementPhoto.setAttribute('alt', card.name);
    const likeNum = cardElement.querySelector('.element__like-counter');
    const cardLikeElement = cardElement.querySelector('.element__like');
    cardLikeElement.addEventListener('click', function (evt) {
        addEventLike(evt, card, card._id, likeNum);
    });
    likeNum.textContent = card.likes.length;
    if ((card.likes.find(x => x._id === apiConfig.id))) {
        cardLikeElement.classList.add('element__like_active');
    }
    if ((card.owner._id === apiConfig.id)) {
        const cardDeleteElement = cardElement.querySelector('.element__delete');
        cardDeleteElement.addEventListener('click', function (evt) {
            openDeleteCardPopup();
        });
        cardDeleteElement.classList.add('element__delete_visible');
        cardDeletePopup.addEventListener('submit', function (evt) {
            deleteCardSubmitHandler(evt, card, cardElement);
        });
    }
    addEventOpenPopup(elementPhoto, card.name, card.link);
    return cardElement;
}

export function renderCard(card) {
    const newCard = createCard(card);
    cardElements.prepend(newCard);
}

// function addEventDelete(evt) {
//     const eventTarget = evt.target;
//     eventTarget.closest('.element').remove();
// }

function openDeleteCardPopup() {
    openPopup(cardDeletePopupWindow);
}

export function deleteCardElement(cardElement) {
    cardElement.closest('.element').remove();
}

function addEventLike(evt, card, cardId, likeNum) {
    if (!card.likes.find(x => x._id === apiConfig.id)) {
        addLike(cardId)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then((res) => {
                const eventTarget = evt.target;
                eventTarget.classList.add('element__like_active');
                likeNum.textContent = res.likes.length;
                card.likes = res.likes;
            })
    } else {
        deleteLike(cardId)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then((res) => {
                const eventTarget = evt.target;
                eventTarget.classList.remove('element__like_active');
                likeNum.textContent = res.likes.length;
                card.likes = res.likes;
            })
    }
}
