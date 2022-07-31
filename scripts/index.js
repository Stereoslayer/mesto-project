//popups
const imagePopup = document.querySelector('.popup_image');
const profilePopup = document.querySelector('.popup_edit');
const cardPopup = document.querySelector('.popup_add');
const popupPhotoImage = document.querySelector('.popup__photo');
const popupPhotoTitle = document.querySelector('.popup__figcaption');

//open close buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = profilePopup.querySelector('.popup__close-button');
const cardAddCloseButton = cardPopup.querySelector('.popup__close-button');
const cardAddButton = document.querySelector('.profile__add-button');
const photoCloseButton = imagePopup.querySelector('.popup__close-button');

//forms
const profileFormElement = profilePopup.querySelector('.popup__container');
const cardFormElement = cardPopup.querySelector('.popup__container');

//inputs
const nameInput = profilePopup.querySelector('.popup__form-name');
const jobInput = profilePopup.querySelector('.popup__form-about');
const cardNameInput = cardPopup.querySelector('.popup__form-name');
const cardLinkInput = cardPopup.querySelector('.popup__form-about');

//profile text
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__about');

//card
const cardTemplate = document.querySelector('#card').content;
const cardElements = document.querySelector('.elements');
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

//functions
function togglePopup(popup) {
    popup.classList.toggle('popup_opened');
}

function editProfileFormSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    togglePopup(profilePopup);
}

function addCardFormSubmitHandler(evt) {
    evt.preventDefault();
    if (cardNameInput.value !== '' && cardLinkInput.value !== '') {
        renderCard(cardNameInput.value, cardLinkInput.value);
        togglePopup(cardPopup);
        cardNameInput.value = '';
        cardLinkInput.value = '';
    }
}

function addEventDelete(evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.element').remove();
}

function addEventLike(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__like_active');
}

function addEventOpenPopup(item, name, link) {
    item.addEventListener('click', function () {
        popupPhotoImage.src = link;
        popupPhotoImage.alt = name;
        popupPhotoTitle.textContent = name;
        imagePopup.classList.toggle('popup_opened');
    })
}

function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__title').textContent = name;
    const elementPhoto = cardElement.querySelector('.element__photo');
    elementPhoto.src = link;
    elementPhoto.setAttribute('alt', name);
    const cardDeleteElement = cardElement.querySelector('.element__delete');
    cardDeleteElement.addEventListener('click', addEventDelete);
    const cardLikeElement = cardElement.querySelector('.element__like');
    cardLikeElement.addEventListener('click', addEventLike);
    const cardPhotoElement = cardElement.querySelector('.element__photo');
    addEventOpenPopup(cardPhotoElement, name, link);
    return cardElement;
}

function renderCard(name, link) {
    const card = createCard(name, link);
    cardElements.prepend(card);
}

//event listeners
photoCloseButton.addEventListener('click', function () {
    togglePopup(imagePopup);
});

profileEditButton.addEventListener('click', function () {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    togglePopup(profilePopup);
});

profileCloseButton.addEventListener('click', function () {
    togglePopup(profilePopup);
});

cardAddButton.addEventListener('click', function () {
    togglePopup(cardPopup);
});

cardAddCloseButton.addEventListener('click', function () {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    togglePopup(cardPopup);
});

profileFormElement.addEventListener('submit', editProfileFormSubmitHandler);

cardFormElement.addEventListener('submit', addCardFormSubmitHandler);

//render initial cards
initialCards.forEach(function (item) {
    renderCard(item.name, item.link)
});
