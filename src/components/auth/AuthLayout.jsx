import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { login, registerUser, verifyEmail } from "../../utils/authApi";

export default function AuthLayout() {
    const navigate = useNavigate()

    const queryClient = useQueryClient()
    const { register: loginForm, handleSubmit: handleSubmitLogin, formState: { errors: errorsLogin } } = useForm({
        values: {
            email: "",
            password: ""
        }
    })

    const location = useLocation()
    const { register: registerForm, handleSubmit: handleSubmitRegister, formState: { errors: errorsRegister } } = useForm({
        defaultValues: location.state?.savedFormData || {
            name: "",
            email: "",
            password: ""
        }
    })

    const loginSubmit = useMutation({
        mutationFn: login
    })

    const handleLogin = (formLogin) => {
        toast.promise(
            new Promise((resolve, reject) => {
                loginSubmit.mutate(formLogin, {
                    onSuccess: (result) => {
                        localStorage.setItem('token', result.data.token)
                        queryClient.invalidateQueries({ queryKey: ['user'] })
                        setTimeout(() => navigate('/'), 300)
                        resolve(result)
                    },
                    onError: (error) => reject(error)
                })
            }),
            {
                loading: 'Memverifikasi...',
                success: (data) => data.message,
                error: (e) => e.message
            }
        )
    }

    const pendingLogin = loginSubmit.isPending

    const registerSubmit = useMutation({
        mutationFn: registerUser
    })

    const handleRegister = (formRegister) => {
        toast.promise(
            new Promise((resolve, reject) => {
                registerSubmit.mutate(formRegister, {
                    onSuccess: (result) => {
                        navigate('/verifikasi', { state: { savedFormData: formRegister } })
                        resolve(result)
                    },
                    onError: (error) => reject(error)
                })
            }),
            {
                loading: 'Mendaftarkan akun...',
                success: (data) => data.message,
                error: (e) => e.message
            }
        )
    }

    const pendingRegister = registerSubmit.isPending

    const verifySubmit = useMutation({
        mutationFn: verifyEmail
    })

    const handleVerify = (payload) => {
        toast.promise(
            new Promise((resolve, reject) => {
                verifySubmit.mutate(payload, {
                    onSuccess: (result) => {
                        setTimeout(() => navigate('/login'), 1000)
                        resolve(result)
                    },
                    onError: (error) => reject(error)
                })
            }),
            {
                loading: 'Memverifikasi...',
                success: (data) => data.message || 'Email terverifikasi, silahkan login',
                error: (e) => e.message
            }
        )
    }

    const pendingVerify = verifySubmit.isPending

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Efek Cahaya di Background */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-600/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-red-600/20 rounded-full blur-[100px]"></div>

            <Outlet context={{ 
                handleLogin, errorsLogin, loginForm, handleSubmitLogin, pendingLogin,
                handleRegister, errorsRegister, registerForm, handleSubmitRegister, pendingRegister,
                handleVerify, pendingVerify
            }}/>
        </div>
    )
}