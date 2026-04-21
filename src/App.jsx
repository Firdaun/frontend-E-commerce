import { motion } from "framer-motion"
import Hero from "./components/Hero.jsx"
import Navbar from "./components/Navbar.jsx"

export default function App() {
    return (
        // Ubah container utama menjadi min-h-screen agar bisa di-scroll nantinya
        <div className="min-h-screen bg-gray-900">
            
            {/* Panggil Navbar di sini */}
            <Navbar/>
            <Hero/>

            {/* Konten Hero (Dibungkus agar posisinya pas di bawah navbar) */}
            <div className="h-screen flex items-center justify-center pt-20">
                <motion.h1 
                    className="text-5xl md:text-7xl text-orange-500 font-bold text-center px-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    Seblak Hot Jeletot
                </motion.h1>
            </div>

        </div>
    )
}