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
            throw new Error(result.message)
        }

        return result

    } catch (e) {
        console.log('Error di authApi (register):', e)
        throw e
    }
}