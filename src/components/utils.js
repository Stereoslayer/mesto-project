export function togglePopup(popup) {
    if (popup !== null) {
        popup.classList.toggle('popup_opened');
    }
}

export function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        togglePopup(openedPopup);
    }
}

export function closeByOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
        const openedPopup = document.querySelector('.popup_opened');
        togglePopup(openedPopup);
    }
}