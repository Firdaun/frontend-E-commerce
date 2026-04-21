import { motion } from "framer-motion"
import Hero from "./components/Hero.jsx"
import Navbar from "./components/Navbar.jsx"
import Menu from "./components/Menu.jsx"
import ProductDetail from "./components/ProductDetail.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop.jsx"

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop/>
            <div className="min-h-screen bg-gray-900">
                <Navbar />
                <Routes>
                    <Route path="/" element={
                        <main>
                            <Hero />
                            <Menu />
                        </main>

                    }/>
                    <Route path="/product/:id" element={<ProductDetail />} />
                </Routes>

            </div>

        </BrowserRouter>
    )
}