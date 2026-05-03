import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion"

export default function ForgotThePassword() {
    const { forgotPasswordRequest, forgotPasswordRegister, handleSubmitEmail, errorsForgotPassword, pendingPasswordReq } = useOutletContext()
    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <Link
                    to='/login'
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
                        <span className="text-transparent bg-clip-text bg-seblak-gradient">Reset Password</span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Masukan email kamu untuk reset password
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
                    <form className="space-y-6" onSubmit={handleSubmitEmail(forgotPasswordRequest)}>

                        {/* Input Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Alamat Email
                            </label>
                            <div className="mt-2 relative rounded-xl shadow-xs">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type="email"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl bg-gray-950 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors"
                                    placeholder="nama@email.com"
                                    {...forgotPasswordRegister('email', { required: 'Email wajib diisi' })}
                                />
                                {errorsForgotPassword.email && <p className="absolute text-xs text-red-500">{errorsForgotPassword.email.message}</p>}
                            </div>
                        </div>

                        <div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={pendingPasswordReq}
                                className={`cursor-pointer w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-red-500/20 text-sm font-bold text-white bg-seblak-gradient hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-orange-500 transition-all ${pendingPasswordReq ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {pendingPasswordReq ? (
                                    <Loader2 className="animate-spin h-5 w-5 text-white" />
                                ) : (
                                    "Kirim"
                                )}
                            </motion.button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </>
    )
}