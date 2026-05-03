const BASE_URL = import.meta.env.VITE_API_URL
export const fetchAPI = async ( endpoint, options = {} ) => {
    const { requireAuth = false, ...fetchOptions } = options

    let headers = {
        'Content-Type': 'application/json',
        ...options.headers
    }

    if (requireAuth) {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        if (!token) {
            throw new Error('Token tidak ditemukan, silahkan login kembali')
        }
        headers['x-api-key'] = `Bearer ${token}`
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...fetchOptions,
            headers
        })

        const result = await response.json().catch(() => ({}) )

        if (!response.ok) {
            if (requireAuth && response.status === 401) {
                localStorage.removeItem('token')
                sessionStorage.removeItem('token')
                window.location.href = '/login'
            }
            throw new Error(result.errors || result.message || "Terjadi kesalahan pada server")
        }
        return result
    } catch (e) {
        console.error(`🚨 Fetch Error (${endpoint}):`, e.message)
        throw e
    }
}