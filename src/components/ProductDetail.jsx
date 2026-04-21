import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ShoppingCart, ShoppingBag, Flame, Plus, Minus, Check } from "lucide-react"
import { getProductbyId } from "../utils/productApi.js"
import { useQuery } from "@tanstack/react-query"

const dummyProduct = [
    {
        id: 1,
        variant: "Seblak Ceker Jeletot",
        price: 25000,
        description: "Nikmati sensasi pedas nendang dari kuah kencur asli berpadu dengan ceker ayam montok yang direbus perlahan hingga lepas dari tulangnya.",
        image_url: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1000&auto=format&fit=crop",
        toppings: ["Telur Puyuh", "Ceker", "Jamur Enoki", "Ayam"],
        spiceLevels: 2
    },
    {
        id: 2,
        variant: "Seblak Ceker Jeletot",
        price: 25000,
        description: "Nikmati sensasi pedas nendang dari kuah kencur asli berpadu dengan ceker ayam montok yang direbus perlahan hingga lepas dari tulangnya. Dilengkapi dengan kerupuk aci kenyal, makaroni, sosis, dan bakso sapi pilihan.",
        image_url: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1000&auto=format&fit=crop",
        toppings: ["Telur Puyuh", "Dumpling Keju", "Enoki", "Pilus Cikur"],
        spiceLevels: 2
    }
]

const spiceLevels = [
    { level: 1, label: "Mild", color: "bg-yellow-400" },
    { level: 2, label: "Sedang", color: "bg-orange-400" },
    { level: 3, label: "Pedas", color: "bg-orange-600" },
    { level: 4, label: "Sangat Pedas", color: "bg-red-600" },
    { level: 5, label: "Hot Jeletot", color: "bg-red-700" }
]

export function useIsMobile(){
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)

        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])
    
    return isMobile
}

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isMobile = useIsMobile()

    const { data: product, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductbyId(id)
    })
    
    
    const [quantity, setQuantity] = useState(1)
    const [spiceLevel, setSpiceLevel] = useState(product?.spice_level)
    const [selectedToppings, setSelectedToppings] = useState([])
    
    const toggleTopping = (topping) => {
        setSelectedToppings(prev =>
            prev.includes(topping) ? prev.filter(t => t !== topping) : [...prev, topping]
        )
    }

    if (!product) return

    return (
        <div className="min-h-screen bg-gray-900 pt-15 md:pt-24 pb-12">
            <div className="flex justify-between md:max-w-7xl md:w-[95%] mx-auto flex-wrap">

                <motion.div
                    initial={{ opacity: 0, y: isMobile ? -20 : 0 , x: isMobile ? 0 : -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="relative md:w-[calc(50%-10px)] xl:w-[calc(50%-20px)] xl:h-162 md:rounded-3xl overflow-hidden border border-gray-800 shadow-2xl"
                >
                    <img
                        src={product.image_url}
                        alt={product.variant}
                        className="w-full object-cover h-full aspect-square"
                    />
                </motion.div>

                <div className="w-[95%] mx-auto md:mx-0 md:w-[calc(50%-10px)] xl:w-[calc(50%-20px)]">
                    <motion.div
                        initial={{ opacity: 0, y: isMobile ? 20 : 0 , x: isMobile ? 0 : 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex flex-col gap-3"
                    >
                        <div className="flex md:gap-2 flex-col">
                            <div className="text-3xl md:text-4xl py-3 text-seblak-gradient font-black">
                                Rp {product.price.toLocaleString('id-ID')}
                            </div>
                            <h1 className="text-2xl md:text-3xl font-black text-white">
                                {product.variant}
                            </h1>
                            <p className="text-gray-400 text-md leading-5">
                                {product.description}
                            </p>
                        </div>

                        <div className="border-b border-gray-800" />

                        <div className="space-y-3 md:space-y-5">
                            <h3 className="text-white font-bold flex items-center space-x-1">
                                <Flame size={20} className="text-orange-500 -translate-y-0.5" />
                                <span>Pilih Level Pedas</span>
                            </h3>
                            <div className="flex space-x-3">
                                {spiceLevels.map((level) => (
                                    <motion.button
                                        key={level.level}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSpiceLevel(level.level)}
                                        className={`w-12 h-12 rounded-xl font-bold ${spiceLevel === level.level
                                            ? 'bg-linear-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-red-500/30 border-none'
                                            : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-orange-500'
                                            }`}
                                    >
                                        {level.level}
                                    </motion.button>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500">
                                Level terpilih: <span className="font-medium text-white">{spiceLevels[spiceLevel - 1]?.label}</span>
                            </p>
                        </div>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: isMobile ? 20 : 0 , x: isMobile ? 0 : 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full hidden xl:block pt-3">
                        <div className="space-y-3 md:space-y-5">
                            <div className="space-y-3 md:space-y-5">
                                <h3 className="text-white font-bold">Topping Tambahan (Opsional)</h3>
                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                    {dummyProduct[0].toppings.map((topping) => (
                                        <motion.button
                                            key={topping}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => toggleTopping(topping)}
                                            className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${selectedToppings.includes(topping)
                                                ? 'bg-orange-500/10 border-orange-500 text-orange-500'
                                                : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500'
                                                }`}
                                        >
                                            <span className="text-sm font-medium">{topping}</span>
                                            {selectedToppings.includes(topping) && <Check size={16} />}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            <div className="border-b border-gray-800" />

                            <div className="space-y-3 md:space-y-5">
                                <div className="flex items-center space-x-4">
                                    <span className="text-white font-bold">Jumlah:</span>
                                    <div className="flex items-center bg-gray-800 rounded-xl border border-gray-700">
                                        <motion.button whileTap={{ scale: 0.8 }} onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 active:text-orange-500 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                                            <Minus size={18} />
                                        </motion.button>
                                        <span className="w-12 text-center text-white font-bold">{quantity}</span>
                                        <motion.button whileTap={{ scale: 0.8 }} onClick={() => setQuantity(quantity + 1)} className="w-10 active:text-orange-500 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                                            <Plus size={18} />
                                        </motion.button>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <motion.button whileTap={{ scale: 0.92 }} className="flex-1 bg-seblak-gradient hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 shadow-lg shadow-red-500/20">
                                        <ShoppingBag size={24} />
                                        <span>Beli</span>
                                    </motion.button>
                                    <motion.button whileTap={{ scale: 0.85 }} className="px-3 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-orange-500 text-gray-300 rounded-xl flex items-center justify-center">
                                        <ShoppingCart size={24} />
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <div className="w-[95%] mx-auto md:w-full block xl:hidden pt-3">
                    <div className="space-y-3 md:space-y-5">
                        <div className="space-y-3 md:space-y-5">
                            <h3 className="text-white font-bold">Topping Tambahan (Opsional)</h3>
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                {dummyProduct[0].toppings.map((topping) => (
                                    <motion.button
                                        key={topping}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => toggleTopping(topping)}
                                        className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${selectedToppings.includes(topping)
                                            ? 'bg-orange-500/10 border-orange-500 text-orange-500'
                                            : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500'
                                            }`}
                                    >
                                        <span className="text-sm font-medium">{topping}</span>
                                        {selectedToppings.includes(topping) && <Check size={16} />}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div className="border-b border-gray-800" />

                        <div className="space-y-3 md:space-y-5">
                            <div className="flex items-center space-x-4">
                                <span className="text-white font-bold">Jumlah:</span>
                                <div className="flex items-center bg-gray-800 rounded-xl border border-gray-700">
                                    <motion.button whileTap={{ scale: 0.8 }} onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 active:text-orange-500 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                                        <Minus size={18} />
                                    </motion.button>
                                    <span className="w-12 text-center text-white font-bold">{quantity}</span>
                                    <motion.button whileTap={{ scale: 0.8 }} onClick={() => setQuantity(quantity + 1)} className="w-10 active:text-orange-500 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                                        <Plus size={18} />
                                    </motion.button>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <motion.button whileTap={{ scale: 0.92 }} className="flex-1 bg-seblak-gradient hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 shadow-lg shadow-red-500/20">
                                    <ShoppingBag size={24} />
                                    <span>Beli</span>
                                </motion.button>
                                <motion.button whileTap={{ scale: 0.85 }} className="px-3 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-orange-500 text-gray-300 rounded-xl flex items-center justify-center">
                                    <ShoppingCart size={24} />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}