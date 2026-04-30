// src/utils/profileApi.js
import { fetchAPI } from './fetcher.js'

export const getCurrentUser = async () => {
    const result = await fetchAPI('/users/current', { method: 'GET', requireAuth: true })
    return result.data 
}

export const updateProfile = async (formData) => {
    return await fetchAPI('/users/current', {
        method: 'PATCH',
        body: JSON.stringify(formData),
        requireAuth: true
    })
}

export const updatePassword = async (pw) => {
    return await fetchAPI('/users/current/password', {
        method: 'PATCH',
        body: JSON.stringify(pw),
        requireAuth: true
    })
}

export const updateEmail = async (data) => {
    return await fetchAPI('/users/current/email/request', {
        method: 'PATCH',
        body: JSON.stringify(data),
        requireAuth: true
    })
}

export const verifyUpdateEmail = async (data) => {
    return await fetchAPI('/users/current/email/verify', {
        method: 'PATCH',
        body: JSON.stringify(data),
        requireAuth: true
    })
}

export const logout = async () => {
    return await fetchAPI('/users/logout', {
        method: 'DELETE',
        requireAuth: true
    })
}