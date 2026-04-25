import { Outlet } from "react-router-dom";

export default function AuthLayout(){
    return (
        <div className="min-h-screen bg-gray-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Efek Cahaya di Background */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-600/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-red-600/20 rounded-full blur-[100px]"></div>

            <Outlet/>
        </div>
    )
}