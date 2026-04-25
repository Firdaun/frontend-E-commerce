const BASE_URL = import.meta.env.VITE_API_URL

export const getCurrentUser = async () => {
    const token = localStorage.getItem('token')
    
    if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.")
    }

    try {
        const response = await fetch(`${BASE_URL}/users/current`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': `Bearer ${token}` 
            }
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