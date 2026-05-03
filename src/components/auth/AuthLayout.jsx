import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { login, registerUser, resetPassword, resetPasswordRequest, verifyEmail } from "../../utils/authApi";

export default function AuthLayout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const location = useLocation()

    // Login Form
    const { register: loginForm, handleSubmit: handleSubmitLogin, formState: { errors: errorsLogin } } = useForm({
        values: {
            email: "",
            password: ""
        }
    })

    // Register Form
    const { register: registerForm, handleSubmit: handleSubmitRegister, formState: { errors: errorsRegister } } = useForm({
        values: location.state?.savedFormData || {
            name: "",
            email: "",
            password: ""
        }
    })

    // forgot password form
    const { register: forgotPasswordRegister, handleSubmit: handleSubmitEmail, formState: { errors: errorsForgotPassword } } = useForm({
        values: {
            email: ""
        }
    })

    // reset password form
    const { register: resetPasswordForm, handleSubmit: handleSubmitResetPassword, formState: { errors: errorsResetPassword }, watch } = useForm({
        values: {
            email: location.state?.saveEmail || "",
            code: "",
            new_password: ""
        }
    })

    // login submit
    const loginSubmit = useMutation({
        mutationFn: login
    })

    const handleLogin = (formLogin) => {
        const { remember, ...loginPayload } = formLogin;

        toast.promise(
            new Promise((resolve, reject) => {
                loginSubmit.mutate(loginPayload, {
                    onSuccess: (result) => {
                        if (formLogin.remember) {
                            localStorage.setItem('token', result.data.token)
                        } else {
                            sessionStorage.setItem('token', result.data.token)
                        }
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

    // register submit
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

    // verify email submit
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

    // reset password request
    const resetPasswordReq = useMutation({
        mutationFn: resetPasswordRequest
    })

    const forgotPasswordRequest = (payload) => {
        toast.promise(
            new Promise((resolve, reject) => {
                resetPasswordReq.mutate(payload, {
                    onSuccess: (result) => {
                        navigate('/reset-password', { state: { saveEmail: result.email }})
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

    const pendingPasswordReq = forgotPasswordRequest.isPending

    // reset password submit
    const resetPasswordSubmit = useMutation({
        mutationFn: resetPassword
    })

    const handleResetPassword = (payload) => {
        const { confirmPassword, ...dataToSend } = payload

        toast.promise(
            new Promise((resolve, reject) => {
                resetPasswordSubmit.mutate(dataToSend, {
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

    const pendingResetPassword = resetPasswordSubmit.isPending

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Efek Cahaya di Background */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-600/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-red-600/20 rounded-full blur-[100px]"></div>

            <Outlet context={{ 
                handleLogin, errorsLogin, loginForm, handleSubmitLogin, pendingLogin,
                handleRegister, errorsRegister, registerForm, handleSubmitRegister, pendingRegister,
                handleVerify, pendingVerify,
                forgotPasswordRequest, forgotPasswordRegister, handleSubmitEmail, errorsForgotPassword, pendingPasswordReq,
                handleResetPassword, resetPasswordForm, handleSubmitResetPassword, errorsResetPassword, pendingResetPassword, watch
            }}/>
        </div>
    )
}