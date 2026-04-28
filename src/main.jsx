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
import Login from './components/auth/Login.jsx'
import Register from './components/auth/Register.jsx'
import AuthLayout from './components/auth/AuthLayout.jsx'
import Layout from './components/Layout.jsx'
import VerifikasiOtp from './components/auth/VerifikasiOtp.jsx'
import { Toaster } from 'sonner'
import Profile from './components/profile/Profile.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import GuestRoute from './components/GuestRoute.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error('🚨 GLOBAL ERROR TERDETEKSI:', error.message)
      console.error('🔍 Query Key yang bermasalah:', query.queryKey)
    }
  })
})
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster richColors theme="dark" position="top-center" />
        <ScrollToTop />

        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<App />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/cart' element={<Cart />} />
              <Route path='/profile' element={<Profile />} />
            </Route>
          </Route>

          <Route element={<GuestRoute />}>
            <Route element={<AuthLayout />}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/verifikasi' element={<VerifikasiOtp />} />
            </Route>
          </Route>
        </Routes>

      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
