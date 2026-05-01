import { motion } from "framer-motion"
import { Calendar, Edit, Mail, MapPin, Phone, User, X } from "lucide-react"


export default function TabAkunSaya({ user, setIsEditingProfile}) {
    return (
        <motion.div
            key="akunSaya"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-1">Informasi Identitas</h3>
                <div className="grid grid-cols-1 pb-6 md:grid-cols-3 gap-4">

                    <div className="p-5 bg-gray-900/40 border border-gray-800/60 rounded-2xl relative overflow-hidden group hover:border-gray-700 transition-colors">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gray-800/30 rounded-bl-full group-hover:bg-orange-500/10 transition-colors"></div>
                        <User size={18} className="text-gray-600 mb-3" />
                        <p className="text-xs text-gray-500 mb-1">Nama Lengkap</p>
                        <p className="text-base font-bold text-white truncate">{user?.name || 'ERROR'}</p>
                    </div>

                    <div className="p-5 bg-gray-900/40 border border-gray-800/60 rounded-2xl relative overflow-hidden group hover:border-gray-700 transition-colors">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gray-800/30 rounded-bl-full group-hover:bg-orange-500/10 transition-colors"></div>
                        <Mail size={18} className="text-gray-600 mb-3" />
                        <p className="text-xs text-gray-500 mb-1">Alamat Email</p>
                        <p className="text-base font-bold text-white truncate">{user?.email || 'Server Error'}</p>
                    </div>

                    <div className="p-5 bg-gray-900/40 border border-gray-800/60 rounded-2xl relative overflow-hidden group hover:border-gray-700 transition-colors">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gray-800/30 rounded-bl-full group-hover:bg-orange-500/10 transition-colors"></div>
                        <Calendar size={18} className="text-gray-600 mb-3" />
                        <p className="text-xs text-gray-500 mb-1">Tanggal Bergabung</p>
                        <p className="text-base font-bold text-white">
                            {user?.createdAt 
                                ? new Date(user.createdAt).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })
                                : 'N/A'}
                        </p>
                    </div>

                </div>
            </div>


            <div className="flex justify-between items-end mb-4 px-1">
                <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Kontak & Alamat</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">Digunakan untuk pengiriman pesanan seblak.</p>
                </div>
                <button onClick={() => setIsEditingProfile(true)} className="cursor-pointer flex items-center space-x-2 text-[10px] sm:text-xs font-bold text-gray-400 bg-gray-900/80 border border-gray-800 px-3 sm:px-4 py-2 rounded-full hover:bg-gray-800 hover:border-orange-500/50 transition-all shrink-0 ml-2">
                    <Edit size={14} className="text-orange-500" />
                    <span className="hidden sm:inline">UBAH DATA</span>
                    <span className="sm:hidden">UBAH</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 sm:p-6 bg-gray-900/40 border border-gray-800/60 rounded-2xl flex items-start space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                        <Phone size={18} className="text-orange-500" />
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1 uppercase font-semibold">Nomor WhatsApp</p>
                        {user?.no_wa ? (
                            <p className="text-base sm:text-lg font-bold text-white truncate">{user?.no_wa}</p>
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
                        {user?.address ? (
                            <p className="text-sm sm:text-base font-medium text-white leading-relaxed">{user.address}</p>
                        ) : (
                            <p className="text-xs sm:text-sm text-gray-600 italic mt-1">Alamat pengiriman belum di atur</p>
                        )}
                    </div>
                </div>
            </div>
            
        </motion.div>
    )
}