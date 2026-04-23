import { motion } from "framer-motion"
import { ArrowRight, Flame } from "lucide-react"
import useIsFirstVisit from "../hooks/useIsFirstVisit.js"

export default function Hero() {
    const isFirstVisit = useIsFirstVisit()
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    }

    return (
        <section className="relative pt-25 md:pt-30 pb-20">
            <div className="max-w-7xl w-[95%] mx-auto flex xl:min-h-screen relative z-10">

                <div className="grid md:grid-cols-2 gap-10 items-center">

                    <motion.div
                        variants={containerVariants}
                        initial={isFirstVisit ? "hidden" : false}
                        animate="show"
                        className="text-center md:text-left"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-full mb-3 border border-red-500/20">
                            <Flame size={20} className="animate-pulse" />
                            <span className="font-semibold tracking-wide text-xs xl:text-sm ">LEVEL PEDAS BISA DIATUR!</span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-3 leading-tight">
                            Seblak <span className="text-transparent bg-clip-text bg-seblak-gradient">Hot Jeletot</span> <br />
                            Bikin Nagih.
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-xs lg:text-sm xl:text-base text-gray-400 mb-6 max-w-lg mx-auto md:mx-0 leading-relaxed">
                            Nikmati perpaduan kerupuk kenyal dan kuah yang gurih!<br /> Berani coba level 5?
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                            <button className="w-full sm:w-auto bg-seblak-gradient hover:from-orange-600 hover:to-red-700 text-white px-5 py-3 lg:px-8 lg:py-4 rounded-full font-bold text-sm lg:text-base transition-transform transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-red-500/30">
                                <span>Pesan Sekarang</span>
                                <ArrowRight size={20} />
                            </button>
                            <button className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 px-5 py-3 lg:px-8 lg:py-4 rounded-full font-bold text-sm lg:text-base transition-colors">
                                Lihat Menu
                            </button>
                        </motion.div>
                    </motion.div>

                    <div className="flex justify-center relative order-first md:order-0">
                        <motion.div
                            initial={isFirstVisit ? { opacity: 0, scale: 0.8, rotate: -10 } : false}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                            className="w-[70%] md:w-[85%] relative"
                        >
                            <div className="absolute inset-0 bg-linear-to-tr from-orange-500 to-red-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>

                            <img
                                src="https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1000&auto=format&fit=crop"
                                alt="Semangkuk Seblak"
                                className="relative w-full mx-auto rounded-full aspect-square shadow-2xl border-4 border-gray-800"
                            />

                        </motion.div>
                        <motion.div
                            initial={isFirstVisit ? { opacity: 0, x: 30 } : false}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
                            className="absolute right-0 -bottom-10 lg:right-[58%] z-20"

                        >
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                className="bg-gray-900 border border-gray-800 p-3 rounded-2xl shadow-xl flex items-center space-x-3"
                            >
                                <div className="bg-green-500/20 py-1 px-1.5 lg:px-1.75 rounded-full">
                                    <span className="text-base lg:text-lg">🌶️</span>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-xs lg:text-sm">Best Seller</p>
                                    <p className="text-gray-400 text-xs">Seblak Ceker Level 3</p>
                                </div>
                            </motion.div>
                        </motion.div>

                    </div>

                </div>
            </div>
        </section>
    )
}