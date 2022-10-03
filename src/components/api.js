export const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
    token: '4912f186-aa3c-472a-98c3-6f2a2bb245d9',
    id: null
}

export const getProfile = () => {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        headers: {
            authorization: apiConfig.token
        }
    })
}

export const editProfile = (name, about) => {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: apiConfig.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            about
        })
    })
}

export const editProfilePic = (avatar) => {
    return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: apiConfig.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar
        })
    })
}

export const getCards = () => {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        headers: {
            authorization: apiConfig.token
        }
    })
}

export const addCard = (name, link) => {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: apiConfig.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            link
        })
    })
}

export const deleteCard = (cardId) => {
    return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: apiConfig.token,
            'Content-Type': 'application/json'
        }
    })
}

export const addLike = (cardId) => {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: apiConfig.token,
            'Content-Type': 'application/json'
        }
    })
}

export const deleteLike = (cardId) => {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: apiConfig.token,
            'Content-Type': 'application/json'
        }
    })
}