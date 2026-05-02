import Hero from "./components/home/Hero.jsx"
import Menu from "./components/home/Menu.jsx"
import WhyChooseUs from "./components/home/WhyChooseUs.jsx"
import HowToOrder from "./components/home/HowToOrder.jsx"


export default function App() {
    return (
        <div className="min-h-screen bg-gray-950">
            <Hero/>
            <Menu/>
            <WhyChooseUs/>
            <HowToOrder/>
        </div>
    )
}