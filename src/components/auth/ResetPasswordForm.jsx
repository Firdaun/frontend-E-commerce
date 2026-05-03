import { ArrowLeft, Eye, EyeOff, Key, Loader2, Lock } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Link, useOutletContext } from "react-router-dom"

export default function ResetPasswordForm() {
    const [showPassword, setShowPassword] = useState(false)
    const { handleResetPassword, resetPasswordForm, handleSubmitResetPassword, errorsResetPassword, pendingResetPassword, watch } = useOutletContext()

    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <Link
                    to='/'
                    className="absolute -top-12 left-0 p-2 bg-gray-900 border border-gray-800 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-black text-white">
                        Reset <span className="text-transparent bg-clip-text bg-seblak-gradient">Password</span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Masukkan kode reset dan password baru untuk melanjutkan
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
            >
                <div className="bg-gray-900 py-8 px-4 shadow-2xl border border-gray-800 sm:rounded-3xl sm:px-10">
                    <form className="space-y-5" onSubmit={handleSubmitResetPassword(handleResetPassword)}>

                        {/* Input Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Masukkan OTP</label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Key className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl bg-gray-950 text-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors"
                                    placeholder="Masukkan OTP"
                                    {...resetPasswordForm('code', { required: 'Kode reset wajib diisi' })}
                                />
                                {errorsResetPassword.code && <p className="absolute text-xs text-red-500 mt-1">{errorsResetPassword.code.message}</p>}
                            </div>
                        </div>

                        {/* Input Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Password Baru</label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-700 rounded-xl bg-gray-950 text-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors"
                                    placeholder="••••••••"
                                    {...resetPasswordForm('new_password', { required: 'Password baru wajib diisi' })}
                                />
                                {errorsResetPassword.new_password && <p className="absolute text-xs text-red-500 mt-1">{errorsResetPassword.new_password.message}</p>}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                        {/* confirmPassword */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Ulangi Password Baru</label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-700 rounded-xl bg-gray-950 text-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors"
                                    placeholder="••••••••"
                                    {...resetPasswordForm('confirmPassword', { required: 'Konfirmasi password wajib diisi', validate: (value) => value === watch('new_password') || 'Password tidak cocok' })}
                                />
                                {errorsResetPassword.confirmPassword && <p className="absolute text-xs text-red-500 mt-1">{errorsResetPassword.confirmPassword.message}</p>}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Tombol Register */}
                        <div className="pt-2">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={pendingResetPassword}
                                className={`cursor-pointer w-full flex justify-center py-3 px-4 rounded-xl shadow-lg shadow-red-500/20 text-sm font-bold text-white bg-seblak-gradient transition-all ${pendingResetPassword ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {pendingResetPassword ? <Loader2 className="animate-spin h-5 w-5" /> : "Reset Password"}
                            </motion.button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Sudah punya akun?{' '}
                            <Link to='/login' className="cursor-pointer font-bold text-orange-500 hover:text-orange-400 transition-colors">
                                Masuk di sini
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </>
    )
}