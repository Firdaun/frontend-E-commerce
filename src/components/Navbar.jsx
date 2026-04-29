import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ShoppingCart, Menu, X, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import useIsFirstVisit from "../hooks/useIsFirstVisit.js"
import { useQuery } from "@tanstack/react-query"
import { getCart } from "../utils/productApi.js"
const MotionLink = motion.create(Link)
const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Menu Seblak', path: '/menu' },
    { name: 'Promo', path: '/promo' },
    { name: 'Kontak', path: '/kontak' },
]

export default function Navbar(user) {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const navRef = useRef(null)
    const isFirstVisit = useIsFirstVisit()
    const apakahUdhLogin = user.isLoggedIn
    const firstName = () => {
        if (!apakahUdhLogin) return 'login'
        return user.user?.name || 'ERROR'
    }

    const { data: cartResponse } = useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
        enabled: apakahUdhLogin
    })

    const cartCount = cartResponse?.data?.cartItems?.length

    const handleCartClick = (e) => {
        if (e) e.preventDefault()
        if (!apakahUdhLogin) {
            toast.error("Ups! Kamu harus login dulu untuk melihat keranjang 🛒")
            navigate('/login')
        } else {
            navigate('/cart')
        }
    }

    useEffect(() => {
        if (!isOpen) return
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('pointerdown', handleClickOutside)

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside)
        }
    }, [isOpen])

    return (
        <motion.nav
            ref={navRef}
            initial={isFirstVisit ? { y: -100, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-gray-950 border-b border-gray-800"
        >
            <div className="max-w-7xl w-[95%] mx-auto">
                <div className="flex justify-between items-center h-15">

                    <motion.div
                        className="flex items-center cursor-pointer"
                    >
                        <span className="text-xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">
                            SEBLAK HOT
                        </span>
                    </motion.div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <MotionLink
                                key={link.name}
                                to={link.path}
                                className="hover:text-orange-500 duration-300 text-gray-300 text-sm font-medium transition-colors"
                            >
                                {link.name}
                            </MotionLink>
                        ))}
                    </div>

                    <div className="flex gap-5">
                        <div className="hidden md:flex items-center space-x-6">
                            <motion.button
                                onClick={handleCartClick}
                                whileTap={{ scale: 0.9 }}
                                className="cursor-pointer relative text-gray-300 hover:text-orange-500 transition-colors"
                            >
                                <ShoppingCart size={24} />
                                {cartCount !== 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                                    >
                                        {cartCount}
                                    </motion.span>
                                )}
                            </motion.button>
                        </div>

                        <Link to={!apakahUdhLogin ? '/login' : '/profile'}>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="cursor-pointer flex items-center text-sm space-x-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-1.5 rounded-full font-medium transition-colors"
                            >
                                <User size={16} className="-translate-y-0.5" />
                                <span>{firstName()}</span>
                            </motion.button>
                        </Link>

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
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden"
                    >
                        <div className="pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <MotionLink
                                    onClick={() => setIsOpen(false)}
                                    key={link.name}
                                    to={link.path}
                                    className="text-gray-300 block text-sm py-2 text-center font-medium"
                                >
                                    {link.name}
                                </MotionLink>
                            ))}
                            <div className="pt-4 border-t border-gray-800 flex items-center justify-center">
                                <button
                                    onClick={() => { setIsOpen(false); handleCartClick(); }}
                                    className="flex items-center space-x-2 text-gray-300 hover:text-orange-500 transition-colors cursor-pointer"
                                >
                                    <ShoppingCart size={24} />
                                    <span>keranjang ({cartCount})</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}