// src/profile/ProfileSidebar.jsx
import { motion } from "framer-motion"
import { User, Lock, Bell, ShieldCheck, ChevronRight, LogOut } from "lucide-react"

export default function ProfileSidebar(items) {
    
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/3"
        >
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="relative group mb-6">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 bg-seblak-gradient rounded-3xl rotate-3 absolute inset-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gray-900 border-2 border-gray-800 rounded-3xl flex items-center justify-center relative z-10 overflow-hidden shadow-2xl">
                        <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-seblak-gradient">
                            {items.user?.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black mb-1">{items.user?.name}</h2>
                <p className="text-gray-400 text-sm mb-4">{items.user?.email}</p>

                {items.user?.role === 'ADMIN' && (
                    <span className="inline-flex items-center px-3 py-1 bg-orange-500/10 text-orange-500 text-xs font-bold rounded-full border border-orange-500/20 mb-4">
                        <ShieldCheck size={12} className="mr-1.5" />
                        ADMINISTRATOR
                    </span>
                )}

                <div className="mt-6 w-full lg:flex-col flex">
                    {items.arrayItems?.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {items.setActiveTab(item.id); items.handleCancel()}}
                            className={`whitespace-nowrap cursor-pointer justify-center w-full flex items-center lg:justify-between px-4 py-3 rounded-xl font-bold transition-all duration-300 ${items.activeTab === item.id
                                ? "bg-orange-500/10 text-orange-500 border border-orange-500/20"
                                : "text-gray-500 hover:bg-white/5 hover:text-white border border-transparent"
                                }`}
                        >
                            <div className="flex items-center text-xs md:text-sm">
                                {item.icon}
                                {item.name}
                            </div>
                            {/* Ikon panah ini hanya muncul di layar besar */}
                            {items.activeTab === item.id && <ChevronRight size={16} className="hidden lg:block ml-2" />}
                        </button>
                    ))}
                    <button
                        // onClick={items.handleLogout}
                        className="whitespace-nowrap hover:bg-white/5 w-full text-xs md:text-sm cursor-pointer font-bold text-red-500 hover:text-red-400 transition-colors flex items-center justify-center lg:justify-start px-4.5 py-4 bg-red-500/10 lg:bg-transparent rounded-xl lg:rounded-xl"
                    >
                        <LogOut size={16} className="mr-2" />
                        logout
                    </button>
                </div>

            </div>
        </motion.div>
    )
}