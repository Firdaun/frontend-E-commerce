import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, MapPin, User, Phone, Calendar, ShoppingBag, CreditCard, ChevronRight, CheckCircle2, Clock, Truck, UtensilsCrossed, XCircle } from "lucide-react"

// Helper functions for status
const getStatusStyles = (status) => {
    switch (status) {
        case "Selesai": return "bg-green-500/10 text-green-500 border-green-500/20"
        case "Sedang Dimasak": return "bg-orange-500/10 text-orange-500 border-orange-500/20"
        case "Menunggu": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
        case "Dikirim": return "bg-blue-500/10 text-blue-500 border-blue-500/20"
        case "Dibatalkan": return "bg-red-500/10 text-red-500 border-red-500/20"
        default: return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
}

const getStatusIcon = (status) => {
    switch (status) {
        case "Selesai": return <CheckCircle2 size={18} />
        case "Sedang Dimasak": return <UtensilsCrossed size={18} />
        case "Menunggu": return <Clock size={18} />
        case "Dikirim": return <Truck size={18} />
        case "Dibatalkan": return <XCircle size={18} />
        default: return <ShoppingBag size={18} />
    }
}

// Dummy data based on the provided JSON structure
const dummyOrderDetail = {
    id: 2,
    userId: 136,
    username: "joko",
    no_wa: "085943251649",
    address: "Jalan rajapolah",
    total_price: 20000,
    status: "Menunggu",
    createdAt: "2026-04-29T08:25:37.146Z",
    updatedAt: "2026-04-29T08:25:37.146Z",
    orderItems: [
        {
            id: 3,
            orderId: 2,
            productId: 105,
            quantity: 1,
            spice_level: 4,
            price_at_purchase: 10000,
            product: {
                id: 105,
                variant: "Seblak ceker",
                price: 10000,
                spice_level: 5,
                description: "Seblak ceker dengan kaldu kental dan ada manisnya",
                image_url: "https://images.unsplash.com/photo-1653666322609-df808a84bc0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
                is_available: true,
                createdAt: "2026-04-28T22:26:24.788Z",
                updatedAt: "2026-04-28T22:26:24.788Z"
            }
        },
        {
            id: 4,
            orderId: 2,
            productId: 106,
            quantity: 2,
            spice_level: 2,
            price_at_purchase: 5000,
            product: {
                id: 106,
                variant: "Es Teh Manis",
                price: 5000,
                description: "Segar dan manis",
                image_url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600&auto=format&fit=crop",
            }
        }
    ]
}

export default function OrderDetail() {
    const { id } = useParams()
    const order = dummyOrderDetail // Use dummy for now

    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-12">
            <div className="max-w-7xl w-[95%] mx-auto">
                {/* Back Button & Title */}
                <div className="flex flex-col gap-6 mb-8">
                    <Link 
                        to="/orders" 
                        className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors w-fit group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold">Kembali ke Daftar Pesanan</span>
                    </Link>
                    
                    <div className="flex flex-wrap justify-between items-end gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl md:text-4xl font-black text-white">Detail Pesanan</h1>
                            <p className="text-gray-400 flex items-center gap-2">
                                <span className="font-mono bg-gray-900 px-3 py-1 rounded-lg text-white">#ORD-{order.id}</span>
                                <span className="text-gray-600">•</span>
                                <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </p>
                        </div>
                        <div className={`px-4 py-2 rounded-xl border text-sm font-bold flex items-center gap-2 ${getStatusStyles(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Items */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-900/40 border border-gray-800 rounded-3xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-800 bg-gray-900/20">
                                <h2 className="text-white font-bold flex items-center gap-2">
                                    <ShoppingBag size={20} className="text-orange-500" />
                                    Daftar Menu yang Dipesan
                                </h2>
                            </div>
                            <div className="divide-y divide-gray-800">
                                {order.orderItems.map((item) => (
                                    <div key={item.id} className="p-6 flex gap-6 items-center group">
                                        <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-gray-800 relative">
                                            <img 
                                                src={item.product.image_url} 
                                                alt={item.product.variant} 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col gap-1">
                                            <h3 className="text-white font-bold text-lg">{item.product.variant}</h3>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                                                <p className="text-gray-400">Qty: <span className="text-white">{item.quantity}</span></p>
                                                {item.spice_level && (
                                                    <p className="text-gray-400">Level: <span className="text-orange-500 font-bold">{item.spice_level}</span></p>
                                                )}
                                                <p className="text-gray-400">Harga: <span className="text-white">Rp {item.price_at_purchase.toLocaleString('id-ID')}</span></p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-black text-lg">
                                                Rp {(item.quantity * item.price_at_purchase).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Order Timeline (Simple) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gray-900/40 border border-gray-800 rounded-3xl p-6"
                        >
                            <h2 className="text-white font-bold mb-6 flex items-center gap-2">
                                <Clock size={20} className="text-orange-500" />
                                Status Pengiriman
                            </h2>
                            <div className="flex justify-between relative">
                                {/* Line */}
                                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-800 z-0"></div>
                                
                                {["Menunggu", "Sedang Dimasak", "Dikirim", "Selesai"].map((step, idx) => {
                                    const isActive = order.status === step || idx < ["Menunggu", "Sedang Dimasak", "Dikirim", "Selesai"].indexOf(order.status)
                                    const isCurrent = order.status === step

                                    return (
                                        <div key={step} className="flex flex-col items-center gap-3 relative z-10 w-1/4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                                                isActive ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/30" : "bg-gray-900 border-gray-800 text-gray-600"
                                            }`}>
                                                {getStatusIcon(step)}
                                            </div>
                                            <div className="text-center">
                                                <p className={`text-[10px] md:text-xs font-bold ${isActive ? "text-white" : "text-gray-600"}`}>{step}</p>
                                                {isCurrent && <span className="text-[8px] text-orange-500 font-black uppercase animate-pulse">Sekarang</span>}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Info & Summary */}
                    <div className="flex flex-col gap-6">
                        {/* Customer & Shipping Info */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gray-900/40 border border-gray-800 rounded-3xl p-6 space-y-6"
                        >
                            <div>
                                <h2 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                                    <MapPin size={18} className="text-orange-500" />
                                    Informasi Pengiriman
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shrink-0">
                                            <User size={16} className="text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold uppercase">Nama Penerima</p>
                                            <p className="text-white font-medium">{order.username}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shrink-0">
                                            <Phone size={16} className="text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold uppercase">No. WhatsApp</p>
                                            <p className="text-white font-medium">{order.no_wa}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shrink-0">
                                            <MapPin size={16} className="text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold uppercase">Alamat Lengkap</p>
                                            <p className="text-white font-medium text-sm leading-relaxed">{order.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Payment Summary */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gray-900/40 border border-gray-800 rounded-3xl p-6"
                        >
                            <h2 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                                <CreditCard size={18} className="text-orange-500" />
                                Ringkasan Pembayaran
                            </h2>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Subtotal</span>
                                    <span className="text-white font-medium">Rp {order.total_price.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Ongkos Kirim</span>
                                    <span className="font-medium text-green-500">GRATIS</span>
                                </div>
                                <div className="border-t border-gray-800 pt-3 flex justify-between items-center">
                                    <span className="text-white font-black">Total</span>
                                    <span className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">
                                        Rp {order.total_price.toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Note */}
                        <div className="bg-orange-500/5 border border-orange-500/10 rounded-2xl p-4 text-center">
                            <p className="text-orange-500/70 text-xs italic">
                                "Terima kasih sudah memesan di Seblak Hot! Pesananmu sedang kami prioritaskan."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
