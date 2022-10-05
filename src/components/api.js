export const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
    headers: {
        authorization: '4912f186-aa3c-472a-98c3-6f2a2bb245d9',
        'Content-Type': 'application/json'
    },
    id: null
}

// function getResponseData(res) {
//     if (res.ok) {
//         console.log(res);
//         return res.json();
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
// }

export const getProfile = () => {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        headers: apiConfig.headers
    })
        .then((profile) => {
            if (profile.ok) {
                return profile.json();
            }
            return Promise.reject(`Ошибка: ${profile.status}`);
        })
}

export const editProfile = (name, about) => {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name,
            about
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export const editProfilePic = (avatar) => {
    return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            avatar
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export const getCards = () => {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        headers: apiConfig.headers
    })
        .then((cards) => {
            if (cards.ok) {
                return cards.json();
            }
            return Promise.reject(`Ошибка: ${cards.status}`);
        })
}

export const addCard = (name, link) => {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name,
            link
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export const deleteCard = (cardId) => {
    return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export const addLike = (cardId) => {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: apiConfig.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export const deleteLike = (cardId) => {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}