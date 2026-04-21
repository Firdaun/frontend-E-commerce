import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ShoppingCart, Menu, X, User } from "lucide-react"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const cartCount = 3

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800"
        >
            <div className="max-w-7xl w-[95%] mx-auto">
                <div className="flex justify-between items-center h-15">

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center cursor-pointer"
                    >
                        <span className="text-xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">
                            SEBLAK HOT
                        </span>
                    </motion.div>

                    <div className="hidden md:flex items-center space-x-8">
                        {['Beranda', 'Menu Seblak', 'Promo', 'Kontak'].map((item) => (
                            <motion.a
                                key={item}
                                href="#"
                                whileHover={{ scale: 1.1, color: "#f97316" }}
                                className="text-gray-300 font-medium transition-colors"
                            >
                                {item}
                            </motion.a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative text-gray-300 hover:text-orange-500 transition-colors"
                        >
                            <ShoppingCart size={24} />
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                            >
                                {cartCount}
                            </motion.span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full font-medium transition-colors"
                        >
                            <User size={18} />
                            <span>Login</span>
                        </motion.button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-orange-500"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-gray-900 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {['Beranda', 'Menu Seblak', 'Promo', 'Kontak'].map((item) => (
                                <a key={item} href="#" className="block text-gray-300 hover:text-orange-500 py-2 font-medium">
                                    {item}
                                </a>
                            ))}
                            <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                                <button className="flex items-center space-x-2 text-gray-300">
                                    <ShoppingCart size={24} />
                                    <span>Keranjang ({cartCount})</span>
                                </button>
                                <button className="bg-orange-600 text-white px-4 py-2 rounded-full font-medium">
                                    Login
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}