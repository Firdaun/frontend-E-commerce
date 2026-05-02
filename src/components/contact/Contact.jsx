import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react"

export default function Contact() {
    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-12">
            <div className="max-w-7xl w-[95%] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600 mb-4">
                        Hubungi Kami
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Punya pertanyaan, saran, atau keluhan soal pesanan Seblak Hot kamu? Jangan ragu untuk menghubungi tim kami melalui kontak di bawah ini.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Informasi Kontak</h2>
                        
                        <div className="flex items-start gap-4 bg-gray-900/50 p-5 rounded-2xl border border-gray-800 hover:border-orange-500/50 transition-colors">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center shrink-0">
                                <MapPin className="text-orange-500" size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">Lokasi Kedai</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Jl. Pedas Gila No. 99, Kecamatan Sejahtera<br />
                                    Kota Bandung, Jawa Barat 40123
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-gray-900/50 p-5 rounded-2xl border border-gray-800 hover:border-orange-500/50 transition-colors">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center shrink-0">
                                <Phone className="text-orange-500" size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">Nomor Telepon / WhatsApp</h3>
                                <p className="text-gray-400 text-sm">
                                    +62 812 3456 7890<br />
                                    (Hanya menerima pesan teks pada jam sibuk)
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-gray-900/50 p-5 rounded-2xl border border-gray-800 hover:border-orange-500/50 transition-colors">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center shrink-0">
                                <Mail className="text-orange-500" size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">Email</h3>
                                <p className="text-gray-400 text-sm">
                                    cs@seblakhot.com
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-gray-900/50 p-5 rounded-2xl border border-gray-800 hover:border-orange-500/50 transition-colors">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center shrink-0">
                                <Clock className="text-orange-500" size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">Jam Operasional</h3>
                                <p className="text-gray-400 text-sm">
                                    Senin - Minggu: 10.00 - 22.00 WIB
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gray-900 border border-gray-800 p-8 rounded-3xl"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <MessageSquare className="text-orange-500" size={24} />
                            Kirim Pesan
                        </h2>
                        
                        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Pesan terkirim! (Demo)"); }}>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Nama Lengkap</label>
                                <input 
                                    type="text" 
                                    placeholder="Masukkan namamu"
                                    className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 text-white px-4 py-3 rounded-xl outline-none transition-colors"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Email</label>
                                <input 
                                    type="email" 
                                    placeholder="Alamat emailmu"
                                    className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 text-white px-4 py-3 rounded-xl outline-none transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300">Pesan</label>
                                <textarea 
                                    rows="4"
                                    placeholder="Tulis pesan, saran, atau keluhanmu di sini..."
                                    className="w-full bg-gray-950 border border-gray-800 focus:border-orange-500 text-white px-4 py-3 rounded-xl outline-none transition-colors resize-none"
                                ></textarea>
                            </div>

                            <button type="submit" className="cursor-pointer w-full bg-seblak-gradient hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all active:scale-95">
                                <Send size={20} />
                                Kirim Pesan Sekarang
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
