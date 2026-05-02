import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../utils/profileApi.js";

export default function Layout() {
    const { data: user, isLoading, isError, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
        retry: false,
        staleTime: 1000 * 60 * 15,
        gcTime: 1000 * 60 * 30
    })
    const isLoggedIn = !!user || !!localStorage.getItem('token')

    return (
        <>
            <Navbar user={user} isLoggedIn={isLoggedIn} />
            <main>
                <Outlet context={{ user, isLoading, isError, refreshUser: refetch }} />
            </main>
        </>
    )
}