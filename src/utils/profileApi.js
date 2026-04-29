const BASE_URL = import.meta.env.VITE_API_URL

const fetchWithAuth = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token')
    
    if (!token) {
        throw new Error('Token tidak ada, silakan login kembali.')
    }

    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': `Bearer ${token}`,
        ...options.headers
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers
        })

        const result = await response.json()

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('token')
                window.location.href = '/login' 
            }
            throw new Error(result.errors || "Terjadi kesalahan pada server")
        }

        return result
    } catch (e) {
        console.error(`Error di API (${endpoint}):`, e.message)
        throw e
    }
}

// =====================================================================
// 2. KUMPULAN FUNGSI API (Sekarang jadi sangat ringkas dan rapi!)
// =====================================================================

export const getCurrentUser = async () => {
    const result = await fetchWithAuth('/users/current', { method: 'GET' })
    return result.data
}

export const updateProfile = async (formData) => {
    return await fetchWithAuth('/users/current', {
        method: 'PATCH',
        body: JSON.stringify(formData)
    })
}

export const updatePassword = async (pw) => {
    return await fetchWithAuth('/users/current/password', {
        method: 'PATCH',
        body: JSON.stringify(pw)
    })
}

export const updateEmail = async (data) => {
    return await fetchWithAuth('/users/current/email/request', {
        method: 'PATCH',
        body: JSON.stringify(data)
    })
}

export const verifyUpdateEmail = async (data) => {
    return await fetchWithAuth('/users/current/email/verify', {
        method: 'PATCH',
        body: JSON.stringify(data)
    })
}

export const logout = async () => {
    return await fetchWithAuth('/users/logout', {
        method: 'DELETE'
    })
}