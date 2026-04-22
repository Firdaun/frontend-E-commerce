import { motion } from "framer-motion"
import { ShoppingCart, Flame, ShoppingBag, Loader2, AlertTriangle, RefreshCw } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../utils/productApi.js"
import useIsFirstVisit from "../hooks/useIsFirstVisit.js"

export default function Menu() {
    const isFirstVisit = useIsFirstVisit()
    const navigate = useNavigate()

    const { data: products, isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })

    if (isLoading) {
        return (
            <div className="py-20 bg-gray-900 flex justify-center items-center min-h-[50vh]">
                <Loader2 className="animate-spin text-orange-500" size={48} />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen max-w-md mx-auto bg-gray-900 flex flex-col items-center justify-center px-4 text-center">
                <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                    <AlertTriangle className="text-red-500 w-12 h-12" strokeWidth={1.5} />
                </div>

                <h2 className="text-2xl font-black text-white mb-3">Oops! Gagal Memuat Data</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    Sepertinya ada gangguan pada server kami atau koneksi internet Anda sedang tidak stabil.
                </p>

            </div>
        )
    }

    return (
        <section className="py-20 bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <motion.div
                    initial={isFirstVisit ? { opacity: 0, y: 30 } : false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                        Pilih <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">Menu Favoritmu</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Semua varian dimasak dadakan dengan rempah kencur asli dan cabai segar.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {!Array.isArray(products) || products.length === 0 ? (
                        <div>
                            <h1>belum ada data</h1>
                        </div>
                    ) :
                        (products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={isFirstVisit ? { opacity: 0, y: 50 } : false}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onClick={() => navigate(`/product/${product.id}`)}
                                className="bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 shadow-xl group"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={product.image_url}
                                        alt={product.variant}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-700">
                                        <span className="text-orange-500 font-bold">
                                            Rp {product.price.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{product.variant}</h3>
                                    <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                        {product.description}
                                    </p>

                                    <div className="flex gap-3">
                                        <button className="w-[85%] bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-xl font-bold transition-transform transform active:scale-95 flex items-center justify-center space-x-2 shadow-lg shadow-red-500/20">
                                            <ShoppingBag size={20} />
                                            <span>Beli</span>
                                        </button>

                                        <button className="w-[15%] bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-orange-500 text-gray-300 hover:text-orange-500 py-3 rounded-xl font-bold transition-colors transform active:scale-95 flex items-center justify-center space-x-2">
                                            <ShoppingCart size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )))
                    }
                </div>
            </div>
        </section>
    )
}