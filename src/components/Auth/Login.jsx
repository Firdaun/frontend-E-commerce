import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            alert(`Berhasil login dengan email: ${formData.email}`)
            navigate('/')
        }, 1500)
    }

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
                        Selamat Datang di <br />
                        <span className="text-transparent bg-clip-text bg-seblak-gradient">Seblak Hot Jeletot</span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Masuk untuk mulai memesan seblak favoritmu
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
                    <form className="space-y-6" onSubmit={handleLogin}>

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
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl bg-gray-950 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors"
                                    placeholder="nama@email.com"
                                />
                            </div>
                        </div>

                        {/* Input Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <div className="mt-2 relative rounded-xl shadow-xs">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-700 rounded-xl bg-gray-950 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Lupa Password & Ingat Saya */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 bg-gray-950 border-gray-700 rounded text-orange-500 focus:ring-orange-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                                    Ingat saya
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-orange-500 hover:text-orange-400 transition-colors">
                                    Lupa password?
                                </a>
                            </div>
                        </div>

                        {/* Tombol Submit */}
                        <div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-red-500/20 text-sm font-bold text-white bg-seblak-gradient hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-orange-500 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin h-5 w-5 text-white" />
                                ) : (
                                    "Masuk"
                                )}
                            </motion.button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Belum punya akun?{' '}
                            <Link to='/register' className="font-bold text-orange-500 hover:text-orange-400 transition-colors">
                                Daftar sekarang
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </>
    )
}