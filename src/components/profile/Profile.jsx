// src/profile/Profile.jsx
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Edit, Loader2, Lock, Mail, MapPin, Phone, Save, User, X } from "lucide-react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { toast } from "sonner"
import ProfileSidebar from "./ProfileSidebar.jsx"
import TabAkunSaya from "./TabAkunSaya.jsx"
import TabKeamanan from "./TabKeamanan.jsx"
import EditingTab from "./EditingTab.jsx"
import { updateProfile } from "../../utils/profileApi.js"
import { useMutation } from "@tanstack/react-query"

export default function Profile() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('akunSaya')
    const { user, isLoading, isError, refreshUser } = useOutletContext()
    const [isEditingProfile, setIsEditingProfile] = useState(false)

    const [profileFormData, setProfileFormData] = useState({
        name: user?.name || "",
        no_wa: user?.no_wa || "",
        address: user?.address || ""
    })

    const handleProfileChange = (e) => {
        setProfileFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleCancel = () => {
        setIsEditingProfile(false)
    }


    const updateMutation = useMutation({
        mutationFn: updateProfile
    })

    const handleSaveProfile = async (e) => {
        e.preventDefault()
        toast.promise(
            new Promise((resolve, reject) => {
                updateMutation.mutate(profileFormData, {
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

    const handleLogout = () => {
        localStorage.removeItem('token')
        toast.success("Berhasil keluar dari akun!")
        // navigate('/login')
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
                return <TabKeamanan user={user} />
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
                        handleLogout={handleLogout}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        handleCancel={handleCancel}
                    />

                    <div className="lg:w-2/3">
                        {!isEditingProfile ? renderContent() : <EditingTab
                            handleCancel={handleCancel}
                            handleSaveProfile={handleSaveProfile}
                            profileFormData={profileFormData}
                            handleProfileChange={handleProfileChange}
                        />}
                    </div>
                </div>
            </div>
        </div>
    )
}