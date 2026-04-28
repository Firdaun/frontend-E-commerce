const BASE_URL = import.meta.env.VITE_API_URL
const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        'x-api-key': `Bearer ${token}`
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await fetch(`${BASE_URL}/users/current`, {
            method: 'GET',
            headers: getAuthHeaders()
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.errors || "Gagal mengambil data profil")
        }
        

        return result.data
    } catch (e) {
        console.error("Error di userApi (getCurrentUser):", e.message)
        throw e
    }
}

export const updateProfile = async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/users/current`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(formData)
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.errors)
        }

        return result
    } catch (e) {
        console.error("Error di userApi (updateProfile):", e.message)
        throw e
    }
}

export const updatePassword = async (pw) => {
    try {
        const response = await fetch(`${BASE_URL}/users/current/password`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(pw)
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.errors)
        }

        return result
    } catch (e) {
        console.error("Error di userApi (updatePassword):", e.message)
        throw e
    }
}