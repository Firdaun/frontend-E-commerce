import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'
import Navbar from './components/Navbar.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import Cart from './components/Cart.jsx'
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'
import AuthLayout from './components/Auth/AuthLayout.jsx'
import Layout from './components/Layout.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error("🚨 GLOBAL ERROR TERDETEKSI:", error.message)
      console.error("🔍 Query Key yang bermasalah:", query.queryKey)
    }
  })
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          <Route element={<Layout/> }>
            <Route path="/" element={<App />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
