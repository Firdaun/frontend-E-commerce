import { Link } from "react-router-dom"
import { Users, Camera, MessageCircle, MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-gray-950 border-t border-gray-800 pt-16 pb-8">
            <div className="max-w-7xl w-[95%] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link to="/" className="inline-block">
                            <span className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600">
                                SEBLAK HOT
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Pelopor seblak premium dengan cita rasa rempah kencur asli yang bikin nagih. Pedasnya nendang, rasanya melayang!
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-colors">
                                <Camera size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-colors">
                                <Users size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-colors">
                                <MessageCircle size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">Menu Cepat</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-orange-500 transition-colors text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50"></span>
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link to="/menu" className="text-gray-400 hover:text-orange-500 transition-colors text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50"></span>
                                    Menu Seblak
                                </Link>
                            </li>
                            <li>
                                <Link to="/orders" className="text-gray-400 hover:text-orange-500 transition-colors text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50"></span>
                                    Pesanan Saya
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart" className="text-gray-400 hover:text-orange-500 transition-colors text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50"></span>
                                    Keranjang
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Jam Operasional */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">Jam Operasional</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-orange-500 shrink-0" />
                                <div>
                                    <p className="text-white text-sm font-medium">Senin - Jumat</p>
                                    <p className="text-gray-400 text-sm">10.00 - 22.00 WIB</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-orange-500 shrink-0" />
                                <div>
                                    <p className="text-white text-sm font-medium">Sabtu - Minggu</p>
                                    <p className="text-gray-400 text-sm">11.00 - 23.30 WIB</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Hubungi Kami */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">Hubungi Kami</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Jl. Jendral Sudirman No. 123, Jakarta Selatan, 12345
                                </p>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                                <p className="text-gray-400 text-sm">+62 812 3456 7890</p>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                                <p className="text-gray-400 text-sm">hello@seblakhot.com</p>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Seblak Hot. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link to="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</Link>
                        <Link to="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
