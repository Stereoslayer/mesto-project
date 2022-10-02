import {config, renderMyData} from "./index";
import {
    avatar,
    cardPopup,
    job,
    jobInput,
    name,
    nameInput,
    profileData,
    avatarPopup,
    writeMyData,
    renderLoading
} from "./modal";
import {renderCard} from "./card";

const token = '4912f186-aa3c-472a-98c3-6f2a2bb245d9';

// export function api() {
//     fetch('https://nomoreparties.co/v1/plus-cohort-15/cards', {
//         headers: {
//             authorization: '4912f186-aa3c-472a-98c3-6f2a2bb245d9'
//         }
//     })
//         .then(res => res.json())
//         .then((result) => {
//             console.log(result);
//         });
// }

export function getMyData() {
    fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me', {
        headers: {
            authorization: token
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
        .then((result) => {
            console.log(result);
            writeMyData(result);
            renderMyData();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading();
        })
}

export function editMyData() {
    fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me', {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: profileData.name,
            about: profileData.about
        })
    })
}

export function editMyAvatar() {
    fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarPopup.querySelector(config.inputSelector).value
        })
    })
}

export function getCards() {
    fetch('https://nomoreparties.co/v1/plus-cohort-15/cards', {
        headers: {
            authorization: token
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        })
        .then((result) => {
            console.log(result);
            result.forEach((result) => {
                renderCard(result.name, result.link);
            })
        })
}