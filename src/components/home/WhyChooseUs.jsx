import { motion } from "framer-motion"
import { Flame, Leaf, Truck, ShieldCheck } from "lucide-react"

export default function WhyChooseUs() {
    const features = [
        {
            icon: <Flame className="w-6 h-6 lg:w-8 lg:h-8 text-orange-500" />,
            title: "Pedesnya Nendang",
            description: "Bumbu rempah kencur asli berpadu dengan cabai segar pilihan. Level pedas bisa disesuaikan seleramu!"
        },
        {
            icon: <Leaf className="w-6 h-6 lg:w-8 lg:h-8 text-green-500" />,
            title: "Bahan Selalu Segar",
            description: "Dimasak dadakan setiap ada pesanan. Tanpa pengawet, dijamin fresh dan kualitas rasa tetap terjaga."
        },
        {
            icon: <Truck className="w-6 h-6 lg:w-8 lg:h-8 text-blue-500" />,
            title: "Pengiriman Cepat",
            description: "Dikirim langsung ke depan pintumu saat masih panas dan nikmat. Santai di rumah, seblak datang."
        },
        {
            icon: <ShieldCheck className="w-6 h-6 lg:w-8 lg:h-8 text-purple-500" />,
            title: "Higienis & Halal",
            description: "Dapur kami menjamin kebersihan alat dan bahan 100% Halal untuk kenyamanan santapmu."
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }

    return (
        <section className="py-20 border-t border-gray-800 bg-gray-950 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl w-[95%] mx-auto relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-4">
                        Kenapa Pilih <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">Seblak Hot?</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-sm xl:text-base mx-auto">
                        Bukan sekadar pedas, kami membawa standar kualitas tinggi untuk setiap mangkuk seblak yang sampai ke tanganmu.
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index}
                            variants={itemVariants}
                            className="bg-gray-900 border border-gray-800 p-4 lg:p-8 rounded-xl lg:rounded-3xl hover:border-orange-500/50 transition-colors group cursor-default"
                        >
                            <div className="lg:w-16 lg:h-16 w-12 h-12 bg-gray-950 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 lg:mb-6 group-hover:scale-110 transition-transform duration-300 border border-gray-800 group-hover:border-orange-500/30">
                                {feature.icon}
                            </div>
                            <h3 className="text-base lg:text-xl font-bold text-white mb-2 lg:mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 text-xs lg:text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
