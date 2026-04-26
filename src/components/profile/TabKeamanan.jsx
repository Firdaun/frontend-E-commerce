// src/profile/TabKeamanan.jsx
import { motion } from "framer-motion"
import { Mail, Save } from "lucide-react"

export default function TabKeamanan({ user }) {
    return (
        <motion.div
            key="keamanan"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-10"
        >
            {/* Bagian Ubah Password */}
            <section>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-1">Ubah Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs sm:text-sm text-gray-400">Password Saat Ini</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs sm:text-sm text-gray-400">Password Baru</label>
                        <input type="password" placeholder="Minimal 6 karakter" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs sm:text-sm text-gray-400">Konfirmasi Password Baru</label>
                        <input type="password" placeholder="Ulangi password" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors" />
                    </div>
                    <div className="md:col-span-2 pt-2">
                        <button className="cursor-pointer flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold transition-colors">
                            <Save size={18} />
                            <span>Simpan Password</span>
                        </button>
                    </div>
                </div>
            </section>

            <div className="h-px bg-gray-900"></div>

            {/* Bagian Ubah Email */}
            <section>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-1">Update Email</h3>
                <div className="space-y-4 sm:space-y-6">
                    <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl flex items-center justify-between">
                        <div className="w-full overflow-hidden">
                            <p className="text-[10px] sm:text-xs text-orange-500 font-bold uppercase mb-1">Email Saat Ini</p>
                            <p className="text-white font-medium text-sm sm:text-base truncate">{user.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                            <label className="text-xs sm:text-sm text-gray-400">Alamat Email Baru</label>
                            <input type="email" placeholder="nama-baru@email.com" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs sm:text-sm text-gray-400">Konfirmasi Password</label>
                            <input type="password" placeholder="Masukkan password saat ini" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors" />
                        </div>
                    </div>
                    <div className="pt-2">
                        <button className="flex items-center justify-center space-x-2 bg-seblak-gradient hover:opacity-90 w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold transition-opacity">
                            <Mail size={18} />
                            <span>Minta OTP Verifikasi</span>
                        </button>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}