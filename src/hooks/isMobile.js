import { useEffect, useState } from "react"

export function useIsMobile(){
    // LANGSUNG CEK UKURAN LAYAR DI DALAM useState
    const [isMobile, setIsMobile] = useState(() => {
        // Pengecekan aman (jaga-jaga kalau kodenya dijalankan di server/SSR)
        if (typeof window !== 'undefined') {
            return window.innerWidth < 768
        }
        return false
    })

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        // Tidak perlu panggil checkScreenSize() di sini lagi karena sudah di useState
        window.addEventListener('resize', checkScreenSize)

        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])
    
    return isMobile
}