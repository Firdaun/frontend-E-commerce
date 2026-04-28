import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { verifyEmail } from "../../utils/authApi.js"

export default function VerifikasiOtp() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(false)
    const [otp, setOtp] = useState(new Array(6).fill(""))
    const inputRefs = useRef([])

    const passedFormData = location.state?.savedFormData
    const emailUser = passedFormData?.email
    if (!emailUser) {
        return <Navigate to="/register" replace />
    }

    const handleChange = (e, index) => {
        const value = e.target.value

        if (value !== "" && !/^[0-9]+$/.test(value)) return

        const newOtp = [...otp]

        newOtp[index] = value.substring(value.length - 1)
        setOtp(newOtp)

        if (value && index < 5) {
            inputRefs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === " " || e.code === "Space") {
            e.preventDefault()
            return
        }

        if (e.key === "Backspace") {
            if (!otp[index] && index > 0) {
                inputRefs.current[index - 1].focus()
            }
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pasteData = e.clipboardData.getData('text/plain').slice(0, 6)
        if (isNaN(pasteData)) return

        const newOtp = [...otp]
        for (let i = 0; i < pasteData.length; i++) {
            newOtp[i] = pasteData[i]
        }

        setOtp(newOtp)

        const focusIndex = pasteData.length < 6 ? pasteData.length : 5
        inputRefs.current[focusIndex].focus()
    }

    const handleVerify = async (e) => {
        e.preventDefault()

        const otpValue = otp.join('')

        setIsLoading(true)
        const payload = {
            email: emailUser,
            code: otpValue
        }
        const eksekusiOtp = verifyEmail(payload).finally(() => {
            setIsLoading(false)
        })

        toast.promise(eksekusiOtp, {
            loading: 'Memverifikasi...',
            success: (data) => {
                setTimeout(() => navigate('/login'), 1000)
                return `Email terverifikasi, silahkan login`
            },
            error: (e) => {
                return e.message
            }
        })
    }

    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-black text-white">
                        Verifikasi <span className="text-transparent bg-clip-text bg-seblak-gradient">OTP</span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Kode OTP telah dikirim ke <br />
                        <span className="font-bold text-white">{emailUser}</span>
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
                    <form className="space-y-5" onSubmit={handleVerify}>


                        <div className="flex justify-center gap-2 sm:gap-3">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    value={data}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onPaste={handlePaste}
                                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-black text-white bg-gray-950 border border-gray-700 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                                />
                            ))}
                        </div>

                        <div className="text-center text-sm">
                            <span className="text-gray-400">Belum menerima kode? </span>
                            <button type="button" className="font-bold text-orange-500 hover:text-orange-400 transition-colors">
                                Kirim Ulang
                            </button>
                        </div>


                        <div className="pt-2">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading || otp.join("").length < 6}
                                className={`w-full flex justify-center py-3 px-4 rounded-xl shadow-lg shadow-red-500/20 text-sm font-bold text-white bg-seblak-gradient transition-all ${isLoading || otp.join("").length < 6 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Verifikasi Sekarang"}
                            </motion.button>
                        </div>
                        <div className="text-center text-sm">
                            <span className="text-gray-400">Email salah? </span>
                            <Link to='/register' state={{ savedFormData: passedFormData }} className="cursor-pointer font-bold text-orange-500 hover:text-orange-400 transition-colors">
                                koreksi
                            </Link>
                        </div>
                    </form>

                </div>
            </motion.div>
        </>
    )
}