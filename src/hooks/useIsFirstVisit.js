import { useState, useEffect } from 'react'

let isFirstMount = true 

export default function useIsFirstVisit() {
    const [isFirst] = useState(() => isFirstMount)

    useEffect(() => {
        isFirstMount = false
    }, [])

    return isFirst
}