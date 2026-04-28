import { useState } from "react"
import { Loader2, Lock, User } from "lucide-react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { toast } from "sonner"
import ProfileSidebar from "./ProfileSidebar.jsx"
import LogoutConfirmModal from "./LogoutConfirmModal.jsx"
import TabAkunSaya from "./TabAkunSaya.jsx"
import TabKeamanan from "./TabKeamanan.jsx"
import EditingTab from "./EditingTab.jsx"
import { logout, updateEmail, updatePassword, updateProfile, verifyUpdateEmail } from "../../utils/profileApi.js"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export default function Profile() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [activeTab, setActiveTab] = useState('akunSaya')
    const { user, isLoading, refreshUser } = useOutletContext()
    const [isEditingProfile, setIsEditingProfile] = useState(false)
    const [isOtpMode, setIsOtpMode] = useState(false)
    const [showLogoutModal, setShowLogoutModal] = useState(false)

    const handleCancel = () => {
        setIsEditingProfile(false)
    }

    // update profile
    const { register, handleSubmit, formState: { errors } } = useForm({
        values: {
            name: user?.name,
            no_wa: user?.no_wa,
            address: user?.address
        }
    })

    const updateMutation = useMutation({
        mutationFn: updateProfile
    })

    const handleSaveProfile = async (formData) => {
        toast.promise(
            new Promise((resolve, reject) => {
                updateMutation.mutate(formData, {
                    onSuccess: async (data) => {
                        await refreshUser()
                        setIsEditingProfile(false)
                        resolve(data)
                    },
                    onError: (error) => reject(error)
                })
            }),
            {
                loading: 'Menyimpan profile...',
                success: (data) => data.message,
                error: (error) => error.message
            }
        )
    }

    // update password
    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: errorsPassword },
        watch,
        reset
    } = useForm()

    const passwordMutation = useMutation({
        mutationFn: updatePassword
    })

    const onSubmitPassword = (data) => {
        toast.promise(
            new Promise((resolve, reject) => {
                passwordMutation.mutate({
                    old_password: data.currentPassword,
                    new_password: data.newPassword
                }, {
                    onSuccess: (res) => {
                        reset()
                        resolve(res)
                    },
                    onError: (err) => reject(err)
                })
            }),
            {
                loading: 'Memperbarui password...',
                success: (data) => data.message,
                error: (error) => error.message
            }
        )
    }

    // register email
    const {
        register: registerEmail,
        handleSubmit: handleSubmitEmail,
        formState: { errors: errorsEmail },
        reset: resetEmail
    } = useForm()

    const emailMutation = useMutation({
        mutationFn: updateEmail
    })

    const onSubmitEmail = (data) => {
        toast.promise(
            new Promise((resolve, reject) => {
                emailMutation.mutate({
                    new_email: data.newEmail,
                    password: data.passwordForEmail
                }, {
                    onSuccess: async (res) => {
                        setIsOtpMode(true) 
                        resolve(res)
                    },
                    onError: (err) => reject(err)
                })
            }),
            {
                loading: 'Memperbarui email...',
                success: (data) => data.message || 'Email berhasil diperbarui!',
                error: (error) => error.message || 'Gagal memperbarui email'
            }
        )
    }

    // otp
    const {
        register: registerOtp,
        handleSubmit: handleSubmitOtp,
        formState: { errors: errorsOtp },
        reset: resetOtp
    } = useForm()

    const otpMutation = useMutation({
        mutationFn: verifyUpdateEmail
    })

    const onSubmitOtp = (data) => {
        toast.promise(
            new Promise((resolve, reject) => {
                otpMutation.mutate({
                    code: data.otp
                }, {
                    onSuccess: async (res) => {
                        await refreshUser()
                        resetEmail()
                        resetOtp()
                        setIsOtpMode(false)
                        resolve(res)
                    },
                    onError: (err) => reject(err)
                })
            }),
            {
                loading: 'Memverifikasi OTP...',
                success: (res) => res.message,
                error: (error) => error.message || 'OTP salah atau kadaluarsa'
            }
        )
    }

    const logoutMutation = useMutation({
        mutationFn: logout
    })

    const handleLogout = () => {
        toast.promise(
            new Promise((resolve, reject) => {
                logoutMutation.mutate(undefined, {
                    onSuccess: async (res) => {
                        localStorage.removeItem('token')
                        await queryClient.cancelQueries({ queryKey: ['user'] })
                        queryClient.setQueryData(['user'], null)
                        resolve(res)
                        navigate('/')
                    },
                    onError: (err) => reject(err)
                })
            }),
            {
                loading: 'Sedang logout...',
                success: (res) => res.message || 'Berhasil logout!',
                error: (error) => error.message || 'Gagal logout'
            }
        )
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center">
                <Loader2 className="animate-spin h-10 w-10 text-orange-500 mb-4" />
                <p className="text-gray-400 animate-pulse">Memuat data profil...</p>
            </div>
        )
    }

    const menuItems = [
        { id: 'akunSaya', name: 'My page', icon: <User size={18} className="mr-3" /> },
        { id: 'keamanan', name: 'security', icon: <Lock size={18} className="mr-3" /> }
    ]

    const renderContent = () => {
        switch (activeTab) {
            case 'keamanan':
                return <TabKeamanan
                    user={user}
                    onSubmitPassword={onSubmitPassword}
                    isPending={passwordMutation.isPending}
                    registerPassword={registerPassword}
                    handleSubmitPassword={handleSubmitPassword}
                    errorsPassword={errorsPassword}
                    watch={watch}

                    onSubmitEmail={onSubmitEmail}
                    isEmailPending={emailMutation.isPending}
                    registerEmail={registerEmail}
                    handleSubmitEmail={handleSubmitEmail}
                    errorsEmail={errorsEmail}

                    isOtpMode={isOtpMode}
                    setIsOtpMode={setIsOtpMode}
                    onSubmitOtp={onSubmitOtp}
                    isOtpPending={otpMutation.isPending}
                    registerOtp={registerOtp}
                    handleSubmitOtp={handleSubmitOtp}
                    errorsOtp={errorsOtp}
                />
            case 'akunSaya':
                return <TabAkunSaya
                    user={user}
                    setIsEditingProfile={setIsEditingProfile}
                />
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 pt-28 sm:pt-32 pb-20">
            <div className="max-w-7xl mx-auto w-[95%] ">
                <div className="text-white flex flex-col lg:flex-row gap-5 justify-between">

                    <ProfileSidebar
                        arrayItems={menuItems}
                        user={user}
                        handleLogout={() => setShowLogoutModal(true)}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        handleCancel={handleCancel}
                        logoutPending={logoutMutation.isPending}
                    />

                    <LogoutConfirmModal
                        isOpen={showLogoutModal}
                        onClose={() => setShowLogoutModal(false)}
                        onConfirm={() => {
                            setShowLogoutModal(false)
                            handleLogout()
                        }}
                        isPending={logoutMutation.isPending}
                    />

                    <div className="lg:w-2/3">
                        {!isEditingProfile ? renderContent() : <EditingTab
                            handleCancel={handleCancel}
                            handleSaveProfile={handleSaveProfile}
                            isPending={updateMutation.isPending}
                            register={register}
                            handleSubmit={handleSubmit}
                            errors={errors}
                        />}
                    </div>
                </div>
            </div>
        </div>
    )
}