import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, MapPin, LogOut, Loader2, ArrowLeft, Calendar, ShieldCheck, Edit } from "lucide-react"
import { Link, useNavigate, useOutletContext } from "react-router-dom"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "../utils/userApi.js"

export default function Profile() {
    const navigate = useNavigate()
    const { user, isLoading, isError, refreshUser } = useOutletContext()

    useEffect(() => {
        if (isError) {
            toast.error("Sesi telah habis atau Anda belum login.")
            localStorage.removeItem('token')
            navigate('/login')
        }
    }, [isError, navigate])

    const handleLogout = () => {
        localStorage.removeItem('token')
        toast.success("Berhasil keluar dari akun!")
        navigate('/login')
    }

    // Tampilan Loading dari bawaan useQuery
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center">
                <Loader2 className="animate-spin h-10 w-10 text-orange-500 mb-4" />
                <p className="text-gray-400 animate-pulse">Memuat data profil...</p>
            </div>
        )
    }

    return (
        <div className="h-screen bg-gray-950 pt-15">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-950 h-full shadow-2xl"
            >
                <div className="h-32 lg:h-45 bg-seblak-gradient">
                    {user.role === 'ADMIN' && (
                        <div className="max-w-7xl w-[95%] flex justify-end mx-auto">
                            <div className="bg-gray-950/50 mt-3 backdrop-blur-sm px-3 py-1 rounded-full flex items-center text-xs font-bold text-white border border-white/20">
                                <ShieldCheck size={14} className="mr-1 text-green-400" />
                                ADMIN
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-[95%] max-w-7xl mx-auto lg:pb-8 relative">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-900 lg:bg-gray-800 border-4 border-gray-900 rounded-full flex items-center justify-center -mt-12 sm:-mt-16 mb-4 relative z-10 shadow-lg">
                        <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-seblak-gradient">
                            {user.name.charAt(0).toUpperCase()}
                        </span>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">{user.name}</h2>
                        <p className="text-gray-400 flex items-center mt-1">
                            <Mail size={16} className="mr-2 text-orange-500" />
                            {user.email}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

                        <div className="bg-gray-950/50 p-4 rounded-2xl border border-gray-800">
                            <p className="text-xs text-gray-500 mb-1 flex items-center">
                                <Phone size={14} className="mr-1" /> Nomor WhatsApp
                            </p>
                            <p className={`font-medium ${user.no_wa ? 'text-white' : 'text-gray-500 italic'}`}>
                                {user.no_wa || "Belum ditambahkan"}
                            </p>
                        </div>

                        <div className="bg-gray-950/50 p-4 rounded-2xl border border-gray-800">
                            <p className="text-xs text-gray-500 mb-1 flex items-center">
                                <Calendar size={14} className="mr-1" /> Bergabung Sejak
                            </p>
                            <p className="font-medium text-white">
                                {new Date(user.createdAt).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>

                        <div className="bg-gray-950/50 p-4 rounded-2xl border border-gray-800 sm:col-span-2">
                            <p className="text-xs text-gray-500 mb-1 flex items-center">
                                <MapPin size={14} className="mr-1" /> Alamat Pengiriman
                            </p>
                            <p className={`font-medium ${user.address ? 'text-white' : 'text-gray-500 italic'}`}>
                                {user.address || "Alamat pengiriman belum diatur."}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center">
                            <Edit size={18} className="mr-2" />
                            Edit Profil
                        </button>

                        <button
                            onClick={handleLogout}
                            className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 py-3 rounded-xl font-medium transition-colors flex items-center justify-center"
                        >
                            <LogOut size={18} className="mr-2" />
                            Keluar Akun
                        </button>
                    </div>

                </div>
            </motion.div>
        </div>
    )
}