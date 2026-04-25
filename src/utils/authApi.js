const BASE_URL = import.meta.env.VITE_API_URL

export const registerUser = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.errors || "Terjadi kesalahan pada server");
        }

        return result

    } catch (e) {
        console.log('Error di authApi (register):', e.message)
        throw e
    }
}

export const verifyEmail = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/users/verify-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.errors || "Terjadi kesalahan pada server");
        }

        return result
    } catch (e) {
        console.log('Error di authApi (verifyEmail):', e.message)
        throw e
    }
}

export const login = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.errors || "Terjadi kesalahan pada server");
        }

        return result
    } catch (e) {
        console.error("Error di authApi (login):", e.message)
        throw e
    }
}