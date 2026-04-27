import { Save, X } from "lucide-react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"

export default function EditingTab({ user, handleCancel, handleSaveProfile, isPending }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        values: {
            name: user?.name,
            no_wa: user?.no_wa,
            address: user?.address
        }
    })

    const onSubmit = (data) => {
        handleSaveProfile(data)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className="w-full flex justify-end pb-4">
                <button
                    onClick={handleCancel}
                    className="hover:border-orange-500/50 cursor-pointer flex items-center space-x-1 text-[10px] sm:text-xs font-bold text-gray-400 bg-gray-900/80 border border-gray-800 px-3 py-2 rounded-full hover:text-white hover:bg-gray-800 transition-all shrink-0 ml-2"
                >
                    <X size={14} className="text-orange-500" />
                    <span>BATAL</span>
                </button>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-5 sm:p-6 bg-gray-900/60 border border-orange-500/30 rounded-2xl space-y-4 sm:space-y-6 shadow-[0_0_30px_rgba(249,115,22,0.05)]"
            >
                <div className="space-y-2">
                    <label className="text-xs sm:text-sm text-gray-400">Nama Lengkap</label>
                    <input
                        type="text"
                        placeholder="Masukkan nama lengkap Anda"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all text-white"
                        {...register('name', { required: 'Nama wajib di isi' })}
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-xs sm:text-sm text-gray-400">Nomor WhatsApp</label>
                    <input
                        type="tel"
                        placeholder="Contoh: 081234567890"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all text-white"
                        {...register('no_wa')}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs sm:text-sm text-gray-400">Alamat Pengiriman</label>
                    <textarea
                        placeholder="Tuliskan alamat lengkap beserta patokan (opsional)"
                        rows="3"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all text-white resize-none"
                        {...register('address')}
                    ></textarea>
                </div>

                <div className="pt-2 flex justify-end">
                    <button
                        type="submit"
                        className="cursor-pointer flex items-center justify-center space-x-2 bg-seblak-gradient hover:opacity-90 w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold transition-opacity"
                    >
                        <Save size={18} />
                        <span>{isPending ? "Menyimpan..." : "Simpan Perubahan"}</span>
                    </button>
                </div>
            </form>
        </motion.div>
    )
}