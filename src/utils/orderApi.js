import { fetchAPI } from "./fetcher"

export const getOrder = async () => {
    const result = await fetchAPI('/orders', {
        method: 'GET',
        requireAuth: true
    })
    return result.data
}

export const postOrder = async (data) => {
    return await fetchAPI('/orders', {
        method: 'POST',
        body: JSON.stringify(data),
        requireAuth: true
    })
}