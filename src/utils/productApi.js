const BASE_URL = import.meta.env.VITE_API_URL

export const getProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products`)
        if (!response.ok) {
            throw new Error("Gagal mengambil data produk")
        }
        const result = await response.json()
        return result.data
    } catch (e) {
        console.error("Error di productApi:", e.message)
        throw e
    }
}

export const getProductbyId = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`)
        if (!response.ok) {
            throw new Error("Gagal mengambil data produk")
        }
        const result = await response.json()

        return result.data
    } catch (e) {
        console.error("Error di productApi:", e.message)
        throw e
    }
}
