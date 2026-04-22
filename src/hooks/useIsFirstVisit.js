import { useState, useEffect } from 'react';

// Variabel global di luar komponen
let isFirstMount = true; 

export default function useIsFirstVisit() {
    // 1. BACA NILAINYA DULU: Ambil nilai saat ini tanpa mengubahnya
    const [isFirst] = useState(() => isFirstMount);

    // 2. UBAH NILAINYA KEMUDIAN: Setelah komponen berhasil dirender, baru kita matikan
    useEffect(() => {
        isFirstMount = false;
    }, []);

    return isFirst;
}