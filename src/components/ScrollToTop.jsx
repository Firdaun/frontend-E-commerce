import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Memaksa browser kembali ke koordinat 0 (paling atas) dan 0 (paling kiri)
    window.scrollTo(0, 0);
  }, [pathname]); // Kode ini akan jalan setiap kali 'pathname' (URL) berubah

  return null; // Komponen ini tidak perlu menampilkan apa-apa di layar
}