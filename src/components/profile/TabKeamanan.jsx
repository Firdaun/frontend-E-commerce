import { AnimatePresence, motion } from "framer-motion"
import { KeyRound, Mail, Save } from "lucide-react"

export default function TabKeamanan({
    // password
    user, onSubmitPassword, isPending, registerPassword, handleSubmitPassword, errorsPassword, watch,
    // email
    onSubmitEmail, isEmailPending, registerEmail, handleSubmitEmail, errorsEmail,
    // otp
    isOtpMode, setIsOtpMode, onSubmitOtp, isOtpPending, registerOtp, handleSubmitOtp, errorsOtp
}) {
    return (
        <motion.div
            key="keamanan"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-10"
        >
            <section>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-1">Ubah Password</h3>
                <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs sm:text-sm text-gray-400">Password Saat Ini</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-gray-950 border border-gray-900 rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors"
                            {...registerPassword('currentPassword', { required: 'Password wajib di isi' })} />
                        {errorsPassword.currentPassword && <p className="text-xs text-red-500">{errorsPassword.currentPassword.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs sm:text-sm text-gray-400">Password Baru</label>
                        <input type="password" placeholder="Minimal 6 karakter" className="w-full bg-gray-950 border border-gray-900 rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors"
                            {...registerPassword('newPassword', { required: 'Password baru wajib diisi', minLength: { value: 6, message: 'Password minimal 6 karakter' } })} />
                        {errorsPassword.newPassword && <p className="text-xs text-red-500">{errorsPassword.newPassword.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs sm:text-sm text-gray-400">Konfirmasi Password Baru</label>
                        <input type="password" placeholder="Ulangi password" className="w-full bg-gray-950 border border-gray-900 rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors"
                            {...registerPassword('confirmPassword', { required: 'Konfirmasi password wajib diisi', validate: (value) => value === watch('newPassword') || 'Password tidak cocok!' })} />
                        {errorsPassword.confirmPassword && <p className="text-xs text-red-500">{errorsPassword.confirmPassword.message}</p>}
                    </div>
                    <div className="md:col-span-2 pt-2">
                        <button disabled={isPending} className="cursor-pointer flex items-center justify-center space-x-2 bg-gray-900 hover:bg-gray-700 w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold transition-colors">
                            <Save size={18} />
                            <span>{isPending ? "Menyimpan..." : "Simpan Password"}</span>
                        </button>
                    </div>
                </form>
            </section>

            <div className="h-px bg-gray-900"></div>

            <section>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-1">Update Email</h3>
                <AnimatePresence mode={'wait'}>
                    {!isOtpMode ? (
                        <motion.form
                            key="form-email"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.1 }}
                            onSubmit={handleSubmitEmail(onSubmitEmail)}
                            className="space-y-4 sm:space-y-6"
                        >
                            <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl flex items-center justify-between">
                                <div className="w-full overflow-hidden">
                                    <p className="text-[10px] sm:text-xs text-orange-500 font-bold uppercase mb-1">Email Saat Ini</p>
                                    <p className="text-white font-medium text-sm sm:text-base truncate">{user?.email}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs sm:text-sm text-gray-400">Alamat Email Baru</label>
                                    <input type="email" placeholder="nama-baru@email.com" className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors"
                                        {...registerEmail('newEmail', { required: 'Email baru wajib di isi', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Format alamat email tidak valid" } })} />
                                    {errorsEmail?.newEmail && <p className="text-xs text-red-500">{errorsEmail.newEmail.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs sm:text-sm text-gray-400">Konfirmasi Password</label>
                                    <input type="password" placeholder="Masukkan password saat ini" className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors"
                                        {...registerEmail('passwordForEmail', { required: 'Password wajib diisi untuk keamanan' })} />
                                    {errorsEmail?.passwordForEmail && <p className="text-xs text-red-500">{errorsEmail.passwordForEmail.message}</p>}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <button type="submit" disabled={isEmailPending} className="flex cursor-pointer items-center justify-center space-x-2 bg-seblak-gradient hover:opacity-90 w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold transition-opacity">
                                    <Mail size={18} />
                                    <span>{isEmailPending ? "Memproses..." : "Kirim otp"}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsOtpMode(true)}
                                    className="text-xs font-bold text-gray-400 hover:text-orange-500 underline-offset-4 hover:underline transition-all cursor-pointer"
                                >
                                    Sudah punya kode OTP?
                                </button>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="form-otp"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.1 }}
                            onSubmit={handleSubmitOtp(onSubmitOtp)}
                            className="space-y-4 sm:space-y-6 bg-gray-900/30 p-6 rounded-2xl border border-orange-500/20"
                        >
                            <div className="text-center space-y-2 mb-6">
                                <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <KeyRound className="text-orange-500" size={24} />
                                </div>
                                <h4 className="text-white font-bold">Verifikasi OTP</h4>
                                <p className="text-sm text-gray-400">
                                    Kami telah mengirimkan 6 digit kode OTP ke email baru Anda. Silakan cek folder Inbox atau Spam.
                                </p>
                            </div>

                            <div className="space-y-2 max-w-xs mx-auto">
                                <input
                                    type="text"
                                    maxLength="6"
                                    placeholder="------"
                                    className={`w-full bg-gray-950 border ${errorsOtp?.otp ? 'border-red-500' : 'border-gray-800'} rounded-xl px-4 py-4 text-center text-3xl tracking-[0.5em] font-black focus:border-orange-500 focus:outline-none transition-colors text-white`}
                                    {...registerOtp('otp', {
                                        required: 'Kode OTP wajib diisi',
                                        minLength: { value: 6, message: 'OTP harus 6 karakter' },
                                        maxLength: { value: 6, message: 'OTP maksimal 6 karakter' }
                                    })}
                                />
                                {errorsOtp?.otp && <p className="text-xs text-red-500 text-center">{errorsOtp.otp.message}</p>}
                            </div>

                            <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsOtpMode(false)} // Tombol untuk kembali jika user salah ketik email
                                    className="cursor-pointer w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-white bg-gray-950 border border-gray-800 hover:bg-gray-800 transition-colors"
                                >
                                    Batal & Kembali
                                </button>
                                <button
                                    type="submit"
                                    disabled={isOtpPending}
                                    className={`cursor-pointer flex items-center justify-center space-x-2 w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-bold transition-opacity ${isOtpPending ? 'bg-gray-800 text-gray-500' : 'bg-seblak-gradient hover:opacity-90 text-white'
                                        }`}
                                >
                                    <span>{isOtpPending ? "Memverifikasi..." : "Verifikasi OTP"}</span>
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </section>
        </motion.div>
    )
}