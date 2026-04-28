import { motion, AnimatePresence } from "framer-motion"
import { LogOut, X } from "lucide-react"

export default function LogoutConfirmModal({ isOpen, onClose, onConfirm, isPending }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                    onClick={onClose}
                >
                    {/* Backdrop — langsung muncul tanpa animasi */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl"
                    >
                        {/* Glow effect */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
                        >
                            <X size={18} />
                        </button>

                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                            <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center">
                                <LogOut size={24} className="text-red-500" />
                            </div>
                        </div>

                        {/* Text */}
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-bold text-white mb-1">
                                Yakin ingin logout?
                            </h3>
                            <p className="text-sm text-gray-400">
                                Kamu harus login kembali untuk mengakses akunmu.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                disabled={isPending}
                                className="flex-1 py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-bold rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                            >
                                Batal
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={isPending}
                                className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                            >
                                {isPending ? "Logout..." : "Ya, Logout"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
