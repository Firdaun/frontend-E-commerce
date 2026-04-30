import { fetchAPI } from "./fetcher"

export const registerUser = async (data) => {
    return await fetchAPI('/users/register', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

export const verifyEmail = async (data) => {
    return await fetchAPI('/users/verify-email', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}

export const login = async (data) => {
    return await fetchAPI('/users/login', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}