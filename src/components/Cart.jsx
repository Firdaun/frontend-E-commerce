import { AnimatePresence } from "framer-motion"
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ReceiptText } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

// Dummy data untuk simulasi (nanti bisa diganti dengan State Management/Context)
const initialCart = [
    {
        id: 1,
        variant: "Seblak Ceker Jeletot",
        price: 25000,
        image_url: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1000&auto=format&fit=crop",
        quantity: 1,
        level: 3,
        toppings: ["Ceker", "Telur Puyuh"]
    }
]

export default function Cart() {
    const [cartItems, setCartItems] = useState(initialCart)
    const navigate = useNavigate()

    const updateQuantity = (id, delta) => {
        setCartItems(prev => prev.map(item => 
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ))
    }

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const shipping = cartItems.length > 0 ? 10000 : 0
    const total = subtotal + shipping

    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-12">
            <div className="max-w-5xl w-[95%] mx-auto">
                
                {/* Header */}
                <div className="flex items-center space-x-4 mb-8">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-2 bg-gray-900 border border-gray-800 rounded-full text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-2xl md:text-3xl font-black text-white">Keranjang <span className="text-seblak-gradient">Kamu</span></h1>
                </div>

                {cartItems.length === 0 ? (
                    /* Tampilan Kosong */
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-900 border border-gray-800 rounded-3xl p-12 text-center"
                    >
                        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="text-gray-600 w-10 h-10" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">Keranjangmu masih kosong</h2>
                        <p className="text-gray-400 mb-8">Wah, perut keroncongan nih! Yuk isi dengan seblak pedas favoritmu.</p>
                        <Link 
                            to="/" 
                            className="inline-flex items-center space-x-2 bg-seblak-gradient px-8 py-3 rounded-xl font-bold text-white shadow-lg shadow-red-500/20"
                        >
                            <span>Cari Seblak</span>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        
                        {/* Daftar Item */}
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    <motion.div 
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="bg-gray-900 border border-gray-800 p-4 rounded-2xl flex items-center space-x-4"
                                    >
                                        <img src={item.image_url} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl shrink-0" alt={item.variant} />
                                        
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-white font-bold truncate">{item.variant}</h3>
                                            <p className="text-orange-500 text-xs font-medium mb-1">Level {item.level} • {item.toppings.join(", ")}</p>
                                            <p className="text-white font-black">Rp {item.price.toLocaleString('id-ID')}</p>
                                        </div>

                                        <div className="flex flex-col items-end justify-between self-stretch">
                                            <button 
                                                onClick={() => removeItem(item.id)}
                                                className="text-gray-500 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            
                                            <div className="flex items-center bg-gray-800 rounded-lg border border-gray-700">
                                                <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-gray-400 hover:text-white"><Minus size={14}/></button>
                                                <span className="px-2 text-sm font-bold text-white">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-gray-400 hover:text-white"><Plus size={14}/></button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Ringkasan Pesanan */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 sticky top-24">
                                <h3 className="text-white font-bold mb-6 flex items-center space-x-2">
                                    <ReceiptText size={20} className="text-orange-500" />
                                    <span>Ringkasan Pesanan</span>
                                </h3>
                                
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-400 text-sm">
                                        <span>Subtotal</span>
                                        <span className="text-white">Rp {subtotal.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 text-sm">
                                        <span>Ongkos Kirim</span>
                                        <span className="text-white">Rp {shipping.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="border-t border-gray-800 pt-4 flex justify-between">
                                        <span className="text-white font-bold">Total Harga</span>
                                        <span className="text-xl font-black text-orange-500">Rp {total.toLocaleString('id-ID')}</span>
                                    </div>
                                </div>

                                <button className="w-full bg-seblak-gradient py-4 rounded-2xl font-black text-white shadow-lg shadow-red-500/20 active:scale-95 transition-transform">
                                    Bayar Sekarang
                                </button>
                                
                                <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-widest">
                                    Pesan dadakan, sampai hangat!
                                </p>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}