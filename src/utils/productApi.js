// src/utils/productApi.js
import { fetchAPI } from './fetcher.js'

// --- BEBAS DIAKSES ---
export const getProducts = async () => {
    const result = await fetchAPI('/products', { method: 'GET' })
    return result.data
}

export const getProductbyId = async (id) => {
    const result = await fetchAPI(`/products/${id}`, { method: 'GET' })
    return result.data
}

// --- WAJIB LOGIN ---
export const addToCart = async (data) => {
    return await fetchAPI('/carts', {
        method: 'POST',
        body: JSON.stringify(data),
        requireAuth: true
    })
}

export const getCart = async () => {
    return await fetchAPI('/carts', { 
        method: 'GET', 
        requireAuth: true 
    })
}

export const deleteCart = async (id) => {
    return await fetchAPI(`/carts/${id}`, { 
        method: 'DELETE', 
        requireAuth: true 
    })
}

export const updateCart = async (id, data) => {
    return await fetchAPI(`/carts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        requireAuth: true
    })
}