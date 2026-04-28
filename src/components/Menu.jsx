import { ShoppingCart, Flame, ShoppingBag, Loader2, AlertTriangle, RefreshCw, PackageOpen } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../utils/productApi.js"
import useIsFirstVisit from "../hooks/useIsFirstVisit.js"

export default function Menu() {
    const isFirstVisit = useIsFirstVisit()
    const navigate = useNavigate()

    const { data: products, isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        staleTime: 1000 * 60 * 15,
        gcTime: 1000 * 60 * 30
    })

    return (
        <section className="py-20 border-t border-gray-800">
            <div className="max-w-7xl w-[95%] mx-auto">

                <motion.div
                    initial={isFirstVisit ? { opacity: 0, y: 30 } : false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-4">
                        Pilih <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">Menu Favoritmu</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-sm xl:text-base mx-auto">
                        Semua varian dimasak dadakan dengan rempah kencur asli dan cabai segar.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                    {isLoading ? (
                        <div className="col-span-full py-20 flex justify-center items-center min-h-[50vh]">
                            <Loader2 className="animate-spin text-orange-500" size={48} />
                        </div>

                    ) : isError ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="col-span-full min-h-[50vh] flex flex-col items-center justify-center px-4 text-center">
                            <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                                <AlertTriangle className="text-red-500 w-12 h-12" strokeWidth={1.5} />
                            </div>

                            <h2 className="text-xl md:text-2xl font-black text-white mb-3">Oops! Gagal Memuat Data</h2>
                            <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-md mx-auto">
                                Sepertinya ada gangguan pada server kami atau koneksi internet Anda sedang tidak stabil.
                            </p>
                        </motion.div>

                    ) : !Array.isArray(products) || products.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="col-span-full flex min-h-[50vh] flex-col items-center justify-center text-center"
                        >
                            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-5 border border-gray-700 shadow-inner">
                                <PackageOpen className="text-gray-500 w-10 h-10" strokeWidth={1.5} />
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                Menu Belum Tersedia
                            </h3>
                            <p className="text-gray-400 max-w-sm mx-auto text-sm leading-relaxed">
                                Menu seblak sedang kosong. Kami akan segera menyajikan menu-menu lezat untuk Anda!
                            </p>
                        </motion.div>

                    ) : (
                        products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={isFirstVisit ? { opacity: 0, y: 50 } : false}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onClick={() => navigate(`/product/${product.id}`)}
                                className="flex flex-col h-full bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-xl group cursor-pointer"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={product.image_url}
                                        alt={product.variant}
                                        className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 right-2 bg-gray-900/80 text-orange-500 text-xs font-bold backdrop-blur-sm px-3 py-1 items-center rounded-full border border-gray-700">
                                        Rp {product.price.toLocaleString('id-ID')}
                                    </div>
                                </div>

                                <div className="flex flex-col flex-1 p-3 md:p-4">
                                    <div className="mb-3">
                                        <h3 className="text-lg font-bold text-white">{product.variant}</h3>
                                        <p className="text-gray-400 text-sm line-clamp-2">
                                            {product.description}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 mt-auto">
                                        <button className="w-full cursor-pointer bg-seblak-gradient hover:from-orange-600 hover:to-red-700 text-white py-0 rounded-xl font-bold transition-transform transform active:scale-95 flex items-center justify-center space-x-1 shadow-lg shadow-red-500/20">
                                            <ShoppingBag size={15} />
                                            <span>Beli</span>
                                        </button>
                                        <div>
                                            <button onClick={(e) => e.stopPropagation()} className="w-10.5 cursor-pointer bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-orange-500 text-gray-300 hover:text-orange-500 py-3 rounded-full font-bold transition-colors transform active:scale-95 flex items-center justify-center">
                                                <ShoppingCart size={15} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}