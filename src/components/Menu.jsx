import { motion } from "framer-motion"
import { ShoppingCart, Flame, ShoppingBag, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../utils/productApi.js"

// Dummy Data (Nanti kita ganti dengan hasil fetch dari backend GET /api/products)
const dummyProducts = [
    {
        id: 1,
        variant: "Seblak Ceker Jeletot",
        price: 25000,
        description: "Kerupuk, makaroni, sosis, bakso, dan ceker ayam super lembut.",
        image_url: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        variant: "Seblak Spesial Seafood",
        price: 35000,
        description: "Topping udang, cumi, crab stick, telur, dan kerupuk aci.",
        image_url: "https://images.unsplash.com/photo-1748277731666-55180b410b91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    },
    {
        id: 3,
        variant: "Seblak Tulang Rangu",
        price: 28000,
        description: "Ekstra tulang rangu sapi gurih kress kress dengan kuah medok.",
        image_url: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?q=80&w=600&auto=format&fit=crop"
    }
]

export default function Menu() {
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
            <div className="py-20 bg-gray-900 flex justify-center items-center min-h-[50vh] text-center">
                <div className="text-red-500">
                    <p className="text-xl font-bold mb-2">Terjadi Kesalahan</p>
                    <p>{error.message}</p>
                </div>
            </div>
        )
    }

    

    return (
        <section className="py-20 bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Judul Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
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

                {/* Grid Produk */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {!Array.isArray(products) || products.length === 0 ? (
                        <div>
                            <h1>belum ada data</h1>
                        </div>
                    ) :
                        (products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onClick={() => navigate(`/product/${product.id}`)}
                                className="bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 shadow-xl group"
                            >
                                {/* Gambar Produk */}
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

                                {/* Detail Produk */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{product.variant}</h3>
                                    <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                        {product.description}
                                    </p>

                                    {/* Pengatur Level Pedas */}
                                    {/* <div className="flex items-center justify-between mb-6 bg-gray-900 rounded-xl p-2 border border-gray-700">
                                    <div className="flex items-center space-x-2 px-2">
                                        <Flame size={18} className={spiceLevels[product.id] > 2 ? "text-red-500" : "text-orange-500"} />
                                        <span className="text-gray-300 text-sm font-medium">Level Pedas</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button 
                                            onClick={() => handleSpiceChange(product.id, -1)}
                                            className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="text-white font-bold w-4 text-center">
                                            {spiceLevels[product.id]}
                                        </span>
                                        <button 
                                            onClick={() => handleSpiceChange(product.id, 1)}
                                            className="w-8 h-8 flex items-center justify-center bg-red-500/20 hover:bg-red-500/40 text-red-500 rounded-lg transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div> */}

                                    {/* Tombol Add to Cart */}
                                    {/* Tombol Aksi (Beli & Keranjang) */}
                                    <div className="flex gap-3">
                                        {/* Tombol 1: Beli Langsung (Primary) */}
                                        <button className="w-[85%] bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-xl font-bold transition-transform transform active:scale-95 flex items-center justify-center space-x-2 shadow-lg shadow-red-500/20">
                                            <ShoppingBag size={20} />
                                            <span>Beli</span>
                                        </button>

                                        {/* Tombol 2: Tambah ke Keranjang (Secondary) */}
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