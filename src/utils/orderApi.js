import { fetchAPI } from "./fetcher"

export const getOrder = async () => {
    const result = await fetchAPI('/orders', {
        method: 'GET',
        requireAuth: true
    })
    return result.data
}