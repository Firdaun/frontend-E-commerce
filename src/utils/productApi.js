const BASE_URL = import.meta.env.VITE_API_URL
const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    if (!token) {
        throw new Error('token tidak ada')
    }
    return {
        'Content-Type': 'application/json',
        'x-api-key': `Bearer ${token}`
    }
}

export const getProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products`)
        const result = await response.json().catch(() => ({}))
        if (!response.ok) {
            throw new Error(result.errors || result.message || 'Gagal mengambil data produk')
        }
        return result.data
    } catch (e) {
        console.error("Error di productApi (getProducts):", e.message)
        throw e
    }
}

export const getProductbyId = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`)
        const result = await response.json().catch(() => ({}))
        if (!response.ok) {
            throw new Error(result.errors || result.message || 'Gagal mengambil data produk')
        }

        return result.data
    } catch (e) {
        console.error("Error di productApi (getProductbyId):", e.message)
        throw e
    }
}

export const addToCart = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/carts`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })

        const result = await response.json().catch(() => ({}))
        if (!response.ok) {
            throw new Error(result.errors || result.message || 'Gagal menambahkan ke keranjang')
        }
        return result
    } catch (e) {
        console.error("Error di productApi (addToCart):", e.message)
        throw e
    }
}

export const getCart = async () => {
    try {
        const response = await fetch(`${BASE_URL}/carts`, {
            method: 'GET',
            headers: getAuthHeaders()
        })

        const result = await response.json().catch(() => ({}))
        if (!response.ok) {
            throw new Error(result.errors || result.message || 'Gagal mengambil keranjang')
        }
        return result
    } catch (e) {
        console.error("Error di productApi (getCart):", e.message)
        throw e
    }
}

export const deleteCart = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/carts/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        })

        const result = await response.json().catch(() => ({}))
        if (!response.ok) {
            throw new Error(result.errors || result.message || 'Gagal menghapus item')
        }
        return result
    } catch (e) {
        console.error("Error di productApi (deleteCart):", e.message)
        throw e
    }
}

export const updateCart = async (id, data) => {
    try {
        const response = await fetch(`${BASE_URL}/carts/${id}`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })

        const result = await response.json().catch(() => ({}))
        if (!response.ok) {
            throw new Error(result.errors || result.message || 'Gagal mengupdate keranjang')
        }
        return result
    } catch (e) {
        console.error("Error di productApi (deleteCart):", e.message)
        throw e
    }
}