import { motion } from "framer-motion"
import { UtensilsCrossed, Flame, Clock, Truck } from "lucide-react"

export default function HowToOrder() {
    const steps = [
        {
            icon: <UtensilsCrossed className="w-8 h-8 text-white" />,
            title: "Pilih Menu",
            description: "Cari seblak favoritmu dari daftar menu yang tersedia.",
            color: "bg-orange-500",
            shadow: "shadow-[0_0_30px_rgba(249,115,22,0.4)]"
        },
        {
            icon: <Flame className="w-8 h-8 text-white" />,
            title: "Checkout",
            description: "Tentukan level pedas dan isi alamat pengiriman dengan lengkap.",
            color: "bg-red-600",
            shadow: "shadow-[0_0_30px_rgba(220,38,38,0.4)]"
        },
        {
            icon: <Clock className="w-8 h-8 text-white" />,
            title: "Konfirmasi",
            description: "Tunggu sebentar, admin kami akan mengkonfirmasi pesananmu via WhatsApp.",
            color: "bg-purple-600",
            shadow: "shadow-[0_0_30px_rgba(147,51,234,0.4)]"
        },
        {
            icon: <Truck className="w-8 h-8 text-white" />,
            title: "Pesanan Diantar",
            description: "Santai saja di rumah, seblak hangat akan segera mendarat di depan pintumu!",
            color: "bg-green-500",
            shadow: "shadow-[0_0_30px_rgba(34,197,94,0.4)]"
        }
    ]

    return (
        <section className="py-20 border-t border-gray-800 bg-gray-950">
            <div className="max-w-7xl w-[95%] mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-4">
                        Cara Mudah <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">Pesan Seblak</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-sm xl:text-base mx-auto">
                        Cuma butuh 4 langkah mudah untuk menikmati pedasnya seblak andalan kami tanpa harus keluar rumah.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connecting Line for Desktop */}
                    <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-[2px] bg-gray-800 z-0">
                        {/* Animated gradient line effect */}
                        <motion.div 
                            initial={{ width: "0%" }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                            className="h-full bg-linear-to-r from-orange-500 via-red-500 to-green-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 relative ${step.color} ${step.shadow} border-[6px] border-gray-950 group-hover:scale-110 transition-transform duration-300`}>
                                    {step.icon}
                                    {/* Step Number Badge */}
                                    <div className="absolute -top-1 -right-1 w-8 h-8 bg-gray-900 border-2 border-gray-700 rounded-full flex items-center justify-center text-white font-black text-sm">
                                        {index + 1}
                                    </div>
                                </div>
                                
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed max-w-[250px]">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
