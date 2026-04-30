import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Package, Clock, CheckCircle2, XCircle, ChevronRight, ShoppingBag, UtensilsCrossed, Truck } from "lucide-react"
import { Link } from "react-router-dom"

const dummyOrders = [
    {
        id: "ORD-2024-001",
        date: "30 Apr 2024",
        total: 45000,
        status: "Selesai",
        items: [
            { name: "Seblak Ceker Jeletot", quantity: 1, price: 25000 },
            { name: "Teh Manis Dingin", quantity: 2, price: 10000 }
        ]
    },
    {
        id: "ORD-2024-002",
        date: "30 Apr 2024",
        total: 35000,
        status: "Sedang Dimasak",
        items: [
            { name: "Seblak Komplit", quantity: 1, price: 35000 }
        ]
    },
    {
        id: "ORD-2024-003",
        date: "29 Apr 2024",
        total: 55000,
        status: "Dibatalkan",
        items: [
            { name: "Seblak Tulang Kerupuk", quantity: 2, price: 27500 }
        ]
    },
    {
        id: "ORD-2024-004",
        date: "30 Apr 2024",
        total: 25000,
        status: "Menunggu",
        items: [
            { name: "Seblak Original", quantity: 1, price: 25000 }
        ]
    },
    {
        id: "ORD-2024-005",
        date: "30 Apr 2024",
        total: 60000,
        status: "Dikirim",
        items: [
            { name: "Seblak Spesial", quantity: 2, price: 30000 }
        ]
    }
]

const statusList = ["Semua", "Menunggu", "Sedang Dimasak", "Dikirim", "Selesai", "Dibatalkan"]

const getStatusStyles = (status) => {
    switch (status) {
        case "Selesai":
            return "bg-green-500/10 text-green-500 border-green-500/20"
        case "Sedang Dimasak":
            return "bg-orange-500/10 text-orange-500 border-orange-500/20"
        case "Menunggu":
            return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
        case "Dikirim":
            return "bg-blue-500/10 text-blue-500 border-blue-500/20"
        case "Dibatalkan":
            return "bg-red-500/10 text-red-500 border-red-500/20"
        default:
            return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
}

const getStatusIcon = (status) => {
    switch (status) {
        case "Selesai":
            return <CheckCircle2 size={16} />
        case "Sedang Dimasak":
            return <UtensilsCrossed size={16} />
        case "Menunggu":
            return <Clock size={16} />
        case "Dikirim":
            return <Truck size={16} />
        case "Dibatalkan":
            return <XCircle size={16} />
        default:
            return <Package size={16} />
    }
}

export default function Orders() {
    const [activeFilter, setActiveFilter] = useState("Semua")

    const filteredOrders = activeFilter === "Semua" 
        ? dummyOrders 
        : dummyOrders.filter(order => order.status === activeFilter)

    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-12">
            <div className="max-w-4xl w-[95%] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-8"
                >
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-black text-white">Pesanan Saya</h1>
                        <p className="text-gray-400">Pantau status pesanan seblak favoritmu di sini.</p>
                    </div>

                    {/* Filter Status */}
                    <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide no-scrollbar">
                        {statusList.map((status) => (
                            <button
                                key={status}
                                onClick={() => setActiveFilter(status)}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                                    activeFilter === status
                                        ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20"
                                        : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4">
                        <AnimatePresence mode="popLayout">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <motion.div
                                        key={order.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1}}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 hover:border-orange-500/50 transition-all group shadow-sm"
                                    >
                                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">ID Pesanan</span>
                                                <span className="text-white font-mono font-bold">{order.id}</span>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full border text-xs font-bold flex items-center gap-1.5 ${getStatusStyles(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-800 py-4 flex flex-col gap-3">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center text-sm">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-orange-500">
                                                            <ShoppingBag size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-medium">{item.name}</p>
                                                            <p className="text-gray-500 text-xs">{item.quantity} x Rp {item.price.toLocaleString('id-ID')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="border-t border-gray-800 pt-4 flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-500">Total Pembayaran</span>
                                                <span className="text-lg font-black text-orange-500">Rp {order.total.toLocaleString('id-ID')}</span>
                                            </div>
                                            <button className="flex items-center gap-1 text-sm font-bold text-white bg-gray-800 hover:bg-orange-600 px-4 py-2 rounded-xl transition-colors shadow-lg">
                                                Detail Pesanan
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center py-20 text-center"
                                >
                                    <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center text-gray-700 mb-4">
                                        <ShoppingBag size={40} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Tidak ada pesanan</h3>
                                    <p className="text-gray-500 mb-6">Tidak ditemukan pesanan dengan status "{activeFilter}".</p>
                                    {activeFilter !== "Semua" && (
                                        <button 
                                            onClick={() => setActiveFilter("Semua")}
                                            className="text-orange-500 font-bold hover:underline"
                                        >
                                            Lihat Semua Pesanan
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

