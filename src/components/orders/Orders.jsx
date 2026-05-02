import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Package, Clock, CheckCircle2, XCircle, ChevronRight, ShoppingBag, UtensilsCrossed, Truck } from "lucide-react"
import { Link } from "react-router-dom"
import { getOrder } from "../../utils/orderApi"
import { useQuery } from "@tanstack/react-query"

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

const OrderSkeleton = () => (
    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 shadow-sm flex flex-col h-full animate-pulse">
        <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col gap-2">
                <div className="h-3 w-20 bg-gray-800 rounded"></div>
                <div className="h-4 w-32 bg-gray-700 rounded"></div>
            </div>
            <div className="h-6 w-24 bg-gray-800 rounded-full"></div>
        </div>
        <div className="border-t border-gray-800 py-4 flex flex-col gap-4 flex-1">
            {[1, 2].map(i => (
                <div key={i} className="flex gap-3 items-center">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg"></div>
                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-40 bg-gray-700 rounded"></div>
                        <div className="h-3 w-24 bg-gray-800 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
        <div className="border-t border-gray-800 pt-4 flex justify-between items-center mt-auto">
            <div className="flex flex-col gap-2">
                <div className="h-3 w-24 bg-gray-800 rounded"></div>
                <div className="h-5 w-32 bg-gray-700 rounded"></div>
            </div>
            <div className="h-9 w-32 bg-gray-800 rounded-xl"></div>
        </div>
    </div>
)

export default function Orders() {
    const [activeFilter, setActiveFilter] = useState("Semua")

    const { data: orderResponse, isLoading, isError } = useQuery({
        queryKey: ['order'],
        queryFn: getOrder,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 15
    })

    const filteredOrders = activeFilter === "Semua" ? orderResponse : orderResponse.filter(order => order.status === activeFilter)

    const getCount = (status) => {
        if (status === "Semua") return orderResponse?.length
        return orderResponse?.filter(o => o.status === status).length
    }

    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-12">
            <div className="max-w-7xl w-[95%] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-8"
                >
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* Sidebar Filter - Left Side */}
                        <aside className="hidden lg:block w-72 shrink-0 space-y-6 sticky top-24">
                            <div className="bg-gray-900/40 border border-gray-800 rounded-2xl overflow-hidden">
                                <div className="p-5 border-b border-gray-800 bg-gray-900/20">
                                    <h2 className="text-white font-bold flex items-center gap-2">
                                        <Package size={18} className="text-orange-500" />
                                        Status Pesanan
                                    </h2>
                                </div>
                                <div className="p-3 flex flex-col gap-1">
                                    {statusList.map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => setActiveFilter(status)}
                                            className={`cursor-pointer flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeFilter === status
                                                    ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                                                    : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {getStatusIcon(status)}
                                                {status}
                                            </div>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${activeFilter === status ? "bg-white/20 text-white" : "bg-gray-800 text-gray-500"
                                                }`}>
                                                {getCount(status)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Info Box */}
                            <div className="hidden lg:block bg-linear-to-br from-orange-600/10 to-red-600/10 border border-orange-500/20 rounded-2xl p-5">
                                <h3 className="text-orange-500 font-bold mb-2">Butuh Bantuan?</h3>
                                <p className="text-gray-400 text-xs leading-relaxed mb-4">
                                    Jika ada kendala dengan pesananmu, silakan hubungi customer service kami.
                                </p>
                                <button className="cursor-pointer w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-xl border border-gray-800 transition-colors">
                                    Hubungi Kami
                                </button>
                            </div>
                        </aside>

                        {/* Main Content - Right Side */}
                        <main className="flex-1 w-full">
                            {/* Mobile Filter (Hanya tampil di mobile) */}
                            <div className="lg:hidden flex overflow-x-auto pb-4 gap-2 no-scrollbar mb-4">
                                {statusList.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setActiveFilter(status)}
                                        className={`cursor-pointer px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${activeFilter === status
                                                ? "bg-orange-600 border-orange-600 text-white"
                                                : "bg-gray-900 border-gray-800 text-gray-400"
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <AnimatePresence>
                                    {isLoading ? (
                                        <>
                                            <OrderSkeleton />
                                            <OrderSkeleton />
                                            <OrderSkeleton />
                                        </>
                                    ) : isError ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex flex-col items-center justify-center py-20 text-center bg-gray-900/20 border border-dashed border-gray-800 rounded-3xl"
                                        >
                                            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-4">
                                                <XCircle size={40} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">Gagal Memuat Pesanan</h3>
                                            <p className="text-gray-400 mb-6 max-w-xs">Terjadi kesalahan koneksi atau masalah pada server kami.</p>
                                        </motion.div>
                                    ) : filteredOrders?.length > 0 ? (
                                        filteredOrders.map((order) => (
                                            <motion.div
                                                key={order.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.2 }}
                                                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 hover:border-orange-500/50 transition-all group shadow-sm flex flex-col h-full"
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

                                                <div className="border-t border-gray-800 py-4 flex flex-col gap-3 flex-1">
                                                    {order.orderItems?.map((item) => (
                                                        <div key={item.id} className="flex justify-between items-center text-sm">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-orange-500">
                                                                    <ShoppingBag size={20} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-white font-medium">{item.product.variant}</p>
                                                                    <p className="text-gray-500 text-xs">{item.quantity} x Rp {item.price_at_purchase.toLocaleString('id-ID')}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="border-t border-gray-800 pt-4 flex flex-wrap gap-4 justify-between items-center mt-auto">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-gray-500">Total Pembayaran</span>
                                                        <span className="text-lg font-black text-orange-500">Rp {order.total_price?.toLocaleString('id-ID')}</span>
                                                    </div>
                                                    <Link
                                                        to={`/orders/${order.id}`}
                                                        className="cursor-pointer flex items-center gap-1 text-sm font-bold text-white bg-gray-800 hover:bg-orange-600 px-4 py-2 rounded-xl transition-colors shadow-lg"
                                                    >
                                                        Detail Pesanan
                                                        <ChevronRight size={16} />
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex flex-col items-center justify-center py-20 text-center bg-gray-900/20 border border-dashed border-gray-800 rounded-3xl"
                                        >
                                            <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center text-gray-700 mb-4">
                                                <ShoppingBag size={40} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">Tidak ada pesanan</h3>
                                            <p className="text-gray-400 mb-6 max-w-xs">Belum ada pesanan dengan status "{activeFilter}" saat ini.</p>
                                            {activeFilter !== "Semua" && (
                                                <button
                                                    onClick={() => setActiveFilter("Semua")}
                                                    className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-orange-600/20"
                                                >
                                                    Lihat Semua Pesanan
                                                </button>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </main>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

