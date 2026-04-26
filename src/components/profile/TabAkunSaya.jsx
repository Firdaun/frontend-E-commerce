import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Edit, Mail, MapPin, Phone, Save, User, X } from "lucide-react"


export default function TabAkunSaya({ user, isEditingProfile, setIsEditingProfile, handleSaveProfile, profileFormData, handleProfileChange}) {
    return (
        <motion.div
            key="akunSaya"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
        >
            <AnimatePresence>
                {!isEditingProfile && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-1">Informasi Identitas</h3>
                        <div className="grid grid-cols-1 pb-6 md:grid-cols-3 gap-4">

                            <div className="p-5 bg-gray-900/40 border border-gray-800/60 rounded-2xl relative overflow-hidden group hover:border-gray-700 transition-colors">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gray-800/30 rounded-bl-full group-hover:bg-orange-500/10 transition-colors"></div>
                                <User size={18} className="text-gray-600 mb-3" />
                                <p className="text-xs text-gray-500 mb-1">Nama Lengkap</p>
                                <p className="text-base font-bold text-white truncate">{user.name}</p>
                            </div>

                            <div className="p-5 bg-gray-900/40 border border-gray-800/60 rounded-2xl relative overflow-hidden group hover:border-gray-700 transition-colors">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gray-800/30 rounded-bl-full group-hover:bg-orange-500/10 transition-colors"></div>
                                <Mail size={18} className="text-gray-600 mb-3" />
                                <p className="text-xs text-gray-500 mb-1">Alamat Email</p>
                                <p className="text-base font-bold text-white truncate">{user.email}</p>
                            </div>

                            <div className="p-5 bg-gray-900/40 border border-gray-800/60 rounded-2xl relative overflow-hidden group hover:border-gray-700 transition-colors">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gray-800/30 rounded-bl-full group-hover:bg-orange-500/10 transition-colors"></div>
                                <Calendar size={18} className="text-gray-600 mb-3" />
                                <p className="text-xs text-gray-500 mb-1">Tanggal Bergabung</p>
                                <p className="text-base font-bold text-white">
                                    {new Date(user.createdAt).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                                </p>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            <section>
                <div className="flex justify-between items-end mb-4 px-1">
                    <div className={`${isEditingProfile ? 'opacity-0' : 'opacity-100'} transition-all duration-300`}>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Kontak & Alamat</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">Digunakan untuk pengiriman pesanan seblak.</p>
                    </div>
                    {!isEditingProfile ? (
                        <button onClick={() => setIsEditingProfile(true)} className="cursor-pointer flex items-center space-x-2 text-[10px] sm:text-xs font-bold text-white bg-gray-900/80 border border-gray-700 px-3 sm:px-4 py-2 rounded-full hover:bg-gray-800 hover:border-orange-500/50 transition-all shrink-0 ml-2">
                            <Edit size={14} className="text-orange-500" />
                            <span className="hidden sm:inline">UBAH DATA</span>
                            <span className="sm:hidden">UBAH</span>
                        </button>

                    ) : (
                        <button
                            onClick={() => setIsEditingProfile(false)}
                            className="hover:border-orange-500/50 cursor-pointer flex items-center space-x-1 text-[10px] sm:text-xs font-bold text-gray-400 bg-gray-900/80 border border-gray-800 px-3 py-2 rounded-full hover:text-white hover:bg-gray-800 transition-all shrink-0 ml-2"
                        >
                            <X size={14} className="text-orange-500" />
                            <span>BATAL</span>
                        </button>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {!isEditingProfile ? (
                        <motion.div
                            key="view-mode"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >

                            <div className="p-5 sm:p-6 bg-gray-900/40 border border-gray-800/60 rounded-2xl flex items-start space-x-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                                    <Phone size={18} className="text-orange-500" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] sm:text-xs text-gray-500 mb-1 uppercase font-semibold">Nomor WhatsApp</p>
                                    {user.no_wa ? (
                                        <p className="text-base sm:text-lg font-bold text-white truncate">{user.no_wa}</p>
                                    ) : (
                                        <p className="text-xs sm:text-sm text-gray-600 italic mt-1">Belum ditambahkan</p>
                                    )}
                                </div>
                            </div>

                            <div className="p-5 sm:p-6 bg-gray-900/40 border border-gray-800/60 rounded-2xl flex items-start space-x-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                                    <MapPin size={18} className="text-orange-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] sm:text-xs text-gray-500 mb-1 uppercase font-semibold">Alamat Utama</p>
                                    {user.address ? (
                                        <p className="text-sm sm:text-base font-medium text-white leading-relaxed">{user.address}</p>
                                    ) : (
                                        <p className="text-xs sm:text-sm text-gray-600 italic mt-1">Alamat pengiriman belum di atur</p>
                                    )}
                                </div>
                            </div>

                        </motion.div>
                    ) : (
                        <motion.form
                            key="edit-mode"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            onSubmit={handleSaveProfile}
                            className="p-5 sm:p-6 bg-gray-900/60 border border-orange-500/30 rounded-2xl space-y-4 sm:space-y-6 shadow-[0_0_30px_rgba(249,115,22,0.05)]"
                        >
                            <div className="space-y-2">
                                <label className="text-xs sm:text-sm text-gray-400">Nama Lengkap</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profileFormData.name}
                                    onChange={handleProfileChange}
                                    placeholder="Masukkan nama lengkap Anda"
                                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all text-white"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs sm:text-sm text-gray-400">Nomor WhatsApp</label>
                                <input
                                    type="tel"
                                    name="no_wa"
                                    value={profileFormData.no_wa}
                                    onChange={handleProfileChange}
                                    placeholder="Contoh: 081234567890"
                                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs sm:text-sm text-gray-400">Alamat Pengiriman</label>
                                <textarea
                                    name="address"
                                    value={profileFormData.address}
                                    onChange={handleProfileChange}
                                    placeholder="Tuliskan alamat lengkap beserta patokan (opsional)"
                                    rows="3"
                                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all text-white resize-none"
                                ></textarea>
                            </div>

                            <div className="pt-2 flex justify-end">
                                <button
                                    type="submit"
                                    className="cursor-pointer flex items-center justify-center space-x-2 bg-seblak-gradient hover:opacity-90 w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold transition-opacity"
                                >
                                    <Save size={18} />
                                    <span>Simpan Perubahan</span>
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </section>
        </motion.div>
    )
}