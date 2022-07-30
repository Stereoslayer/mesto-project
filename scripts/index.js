const editProfile = document.querySelector('#editProfile');
const addCard = document.querySelector('#addCard');
const profileEdit = document.querySelector('.profile__edit');
const profileEditClose = document.querySelector('.popup__close-button');
const addCardClose = document.querySelector('#addCardClose');
const addButton = document.querySelector('.profile__add-button');

function toggleEdit() {
    editProfile.classList.toggle('popup_opened');
}

function toggleAdd() {
    addCard.classList.toggle('popup_opened');
}

profileEdit.addEventListener('click', toggleEdit);
profileEditClose.addEventListener('click', toggleEdit);
addButton.addEventListener('click', toggleAdd);
addCardClose.addEventListener('click', toggleAdd);

const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__form-name');
const jobInput = document.querySelector('.popup__form-about');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__about');
nameInput.value = name.textContent;
jobInput.value = job.textContent;

function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    toggleEdit();
}

formElement.addEventListener('submit', formSubmitHandler);

const initialCards = [
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

const cardFormElement = document.querySelector('#cardForm');
const cardNameInput = document.querySelector('#cardName');
const cardLinkInput = document.querySelector('#cardLink');

function formSubmitHandlerAdd(evt) {
    evt.preventDefault();
    if (cardNameInput.value !== '' && cardLinkInput.value !== '') {
        createCard(cardNameInput.value, cardLinkInput.value);
        toggleAdd();
    }
}

cardFormElement.addEventListener('submit', formSubmitHandlerAdd);

function addEventDelete(item) {
    item.addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        eventTarget.closest('.element').remove();
    });
}

function addEventLike(item) {
    item.addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('element__like_active');
    });
}

const popup = document.querySelector('.photo-popup');
const popupPhotoImage = document.querySelector('.photo-popup__image');
const popupPhotoTitle = document.querySelector('.photo-popup__title');

function addEventOpenPopup(item, name) {
    item.addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        popupPhotoImage.src = eventTarget.getAttribute('src');
        popupPhotoImage.alt = name;
        popupPhotoTitle.textContent = name;
        popup.classList.toggle('photo-popup_opened');
    })
}

function createCard(name, link) {
    const cardTemplate = document.querySelector('#card').content;
    const newCard = document.querySelector('.elements');
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__title').textContent = name;
    cardElement.querySelector('.element__photo').src = link;
    cardElement.querySelector('.element__photo').setAttribute('alt', name);
    const cardDeleteElement = cardElement.querySelector('.element__delete');
    addEventDelete(cardDeleteElement);
    const cardLikeElement = cardElement.querySelector('.element__like');
    addEventLike(cardLikeElement);
    const cardPhotoElement = cardElement.querySelector('.element__photo');
    addEventOpenPopup(cardPhotoElement, name);
    newCard.prepend(cardElement);
}

initialCards.forEach(function (item) {
    createCard(item.name, item.link)
});

const photoClose = document.querySelector('#photoPopupClose');

function closePhotoPopup() {
    popup.classList.toggle('photo-popup_opened');
}

photoClose.addEventListener('click', closePhotoPopup);
