import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, User, Phone, ShoppingBag, ArrowLeft, Loader2, CreditCard, AlertCircle } from "lucide-react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getCart } from "../../utils/productApi.js"
import { getCurrentUser } from "../../utils/profileApi.js"
import { postOrder } from "../../utils/orderApi.js"
import { toast } from "sonner"
import { useForm } from "react-hook-form"

export default function Checkout() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryClient = useQueryClient()

    // Cek apakah ini pesanan langsung (Direct Order) dari tombol "Beli Sekarang"
    const directOrder = location.state?.directOrder
    // Fetch User Profile for pre-filling
    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser
    })

    const { register: registerCustomer, handleSubmit: handleSubmitCustomer, formState: { errors: customerErrors } } = useForm({
        values: {
            username: user?.name || "",
            no_wa: user?.no_wa || "",
            address: user?.address || ""
        }
    })

    // Fetch Cart Data (Hanya jika bukan direct order)
    const { data: cartResponse, isLoading: cartLoading } = useQuery({
        queryKey: ['cart'],
        queryFn: getCart,
        enabled: !directOrder
    })


    // Tentukan item apa yang akan ditampilkan di ringkasan
    let displayItems = []
    let subtotal = 0

    if (directOrder) {
        displayItems = [{
            id: 'direct',
            product: directOrder.product,
            quantity: directOrder.quantity,
            spice_level: directOrder.spice_level
        }]
        subtotal = directOrder.product.price * directOrder.quantity
    } else {
        displayItems = cartResponse?.data?.cartItems || []
        subtotal = cartResponse?.data?.estimated_total || 0
    }

    const shipping = displayItems.length > 0 ? 10000 : 0
    const total = subtotal + shipping

    const orderMutation = useMutation({
        mutationFn: postOrder,
    })

    const handleSubmit = (formData) => {
        const payload = {
            ...formData
        }

        if (directOrder) {
            payload.orderItems = [
                {
                    productId: directOrder.productId,
                    quantity: directOrder.quantity,
                    spice_level: directOrder.spice_level
                }
            ]
        }

        toast.promise(
            new Promise((resolve, reject) => {
                orderMutation.mutate(payload, {
                    onSuccess: (res) => {
                        queryClient.invalidateQueries({ queryKey: ['cart'] })
                        queryClient.invalidateQueries({ queryKey: ['orders'] })
                        navigate('/orders')
                        resolve(res)
                    },
                    onError: (error) => reject(error)
                })
            }),
            {
                loading: 'Membuat pesanan...',
                success: (data) => data.message,
                error: (error) => error.message
            }
        )
    }

    if ((cartLoading && !directOrder) || userLoading) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center">
                <Loader2 className="animate-spin h-12 w-12 text-orange-500 mb-4" />
                <p className="text-gray-400">Menyiapkan checkout...</p>
            </div>
        )
    }

    if (!directOrder && displayItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center p-6 text-center">
                <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="text-gray-600 w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Keranjangmu Kosong</h2>
                <p className="text-gray-400 mb-8 max-w-xs">Kamu belum bisa melakukan checkout karena belum ada item di keranjang.</p>
                <Link to="/" className="bg-seblak-gradient px-8 py-3 rounded-xl font-bold text-white shadow-lg">
                    Cari Seblak
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-12">
            <div className="max-w-6xl w-[95%] mx-auto">
                <div className="flex flex-col gap-8">
                    {/* Header */}
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors w-fit group cursor-pointer"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-bold">Kembali</span>
                        </button>
                        <h1 className="text-3xl md:text-4xl font-black text-white">Konfirmasi Pesanan</h1>
                        <p className="text-gray-400">
                            {directOrder ? "Beli langsung produk pilihanmu." : "Pastikan data pengiriman sudah benar agar seblak sampai dengan selamat."}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Form Alamat */}
                        <div className="lg:col-span-3 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-gray-900/70 border border-gray-900 rounded-3xl p-6 md:p-8"
                            >
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <MapPin className="text-orange-500" size={24} />
                                    Informasi Pengiriman
                                </h2>
                                <form id="checkoutForm" onSubmit={handleSubmitCustomer(handleSubmit)} className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                            <User size={14} /> Nama Penerima
                                        </label>
                                        <input
                                            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                                            placeholder="Nama lengkap penerima"
                                            {...registerCustomer('username', { required: 'Nama wajib di isi' })}
                                        />
                                        {customerErrors.username && <p className="text-red-500 text-sm">{customerErrors.username.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                            <Phone size={14} /> Nomor WhatsApp
                                        </label>
                                        <input
                                            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                                            placeholder="Contoh: 08123456789"
                                            {...registerCustomer('no_wa', { required: 'Nomor WhatsApp wajib di isi' })}
                                        />
                                        {customerErrors.no_wa && <p className="text-red-500 text-sm">{customerErrors.no_wa.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                            <MapPin size={14} /> Alamat Lengkap
                                        </label>
                                        <textarea
                                            rows="4"
                                            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                                            placeholder="Jl. Nama Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan, Kota"
                                            {...registerCustomer('address', { required: 'Alamat wajib di isi' })}
                                        />
                                        {customerErrors.address && <p className="text-red-500 text-sm">{customerErrors.address.message}</p>}
                                    </div>

                                    <div className="bg-orange-500/5 border border-orange-500/10 rounded-2xl p-4 flex gap-3 mt-4">
                                        <AlertCircle className="text-orange-500 shrink-0" size={20} />
                                        <p className="text-xs text-orange-500/80 leading-relaxed italic">
                                            Kami akan menghubungi nomor WhatsApp di atas untuk konfirmasi pesanan dan pengiriman. Pastikan nomor aktif.
                                        </p>
                                    </div>
                                </form>
                            </motion.div>
                        </div>

                        {/* Ringkasan & Submit */}
                        <div className="lg:col-span-2 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-gray-900/70 border border-gray-900 rounded-3xl p-6 sticky top-24"
                            >
                                <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                                    <ShoppingBag size={20} className="text-orange-500" />
                                    <span>Ringkasan Pesanan</span>
                                </h3>

                                <div className="max-h-[250px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
                                    {displayItems.map((item) => (
                                        <div key={item.id} className="flex gap-4 mb-4 items-center">
                                            <img src={item.product.image_url} className="w-12 h-12 object-cover rounded-lg" alt={item.product.variant} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white text-sm font-bold truncate">{item.product.variant}</p>
                                                <p className="text-gray-500 text-[10px]">Qty: {item.quantity} • Level {item.spice_level}</p>
                                            </div>
                                            <p className="text-white text-xs font-black">Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-800 pt-6 space-y-4 mb-8">
                                    <div className="flex justify-between text-gray-400 text-sm">
                                        <span>Subtotal</span>
                                        <span className="text-white font-medium">Rp {subtotal.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 text-sm">
                                        <span>Ongkos Kirim</span>
                                        <span className="text-green-500 font-bold">GRATIS</span>
                                    </div>
                                    <div className="border-t border-gray-800 pt-4 flex justify-between items-center">
                                        <span className="text-white font-bold">Total Pembayaran</span>
                                        <span className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">
                                            Rp {total.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 justify-center mb-4">
                                        <CreditCard size={14} />
                                        <span>Metode: Bayar di Tempat (COD)</span>
                                    </div>
                                    <button
                                        type="submit"
                                        form="checkoutForm"
                                        disabled={orderMutation.isPending}
                                        className="w-full bg-seblak-gradient py-4 rounded-2xl font-black text-white shadow-lg shadow-red-500/20 active:scale-95 transition-all flex justify-center items-center disabled:opacity-50 cursor-pointer"
                                    >
                                        {orderMutation.isPending ? (
                                            <>
                                                <Loader2 className="animate-spin mr-2" size={20} />
                                                Memproses...
                                            </>
                                        ) : (
                                            "Buat Pesanan Sekarang"
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
