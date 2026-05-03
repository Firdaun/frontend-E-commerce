import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductDetail from './components/ProductDetail.jsx'
import Cart from './components/Cart.jsx'
import Login from './components/auth/Login.jsx'
import Register from './components/auth/Register.jsx'
import AuthLayout from './components/auth/AuthLayout.jsx'
import VerifikasiOtp from './components/auth/VerifikasiOtp.jsx'
import { Toaster } from 'sonner'
import Profile from './components/profile/Profile.jsx'
import Orders from './components/orders/Orders.jsx'
import OrderDetail from './components/orders/OrderDetail.jsx'
import Checkout from './components/orders/Checkout.jsx'
import ProtectedRoute from './components/guard/ProtectedRoute.jsx'
import GuestRoute from './components/guard/GuestRoute.jsx'
import Layout from './components/home/Layout.jsx'
import ScrollToTop from './components/guard/ScrollToTop.jsx'
import MenuPage from './components/menu/MenuPage.jsx'
import Contact from './components/contact/Contact.jsx'
import ForgotThePassword from './components/auth/ForgotThePassword.jsx'
import ResetPasswordForm from './components/auth/ResetPasswordForm.jsx'

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
        <Toaster duration={3000} closeButton richColors theme="dark" position="top-center" />
        <ScrollToTop />

        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<App />} />
            <Route path='/menu' element={<MenuPage />} />
            <Route path='/kontak' element={<Contact />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/orders/:id' element={<OrderDetail />} />
            </Route>
          </Route>

          <Route element={<GuestRoute />}>
            <Route element={<AuthLayout />}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/verifikasi' element={<VerifikasiOtp />} />
              <Route path='/request-reset-password' element={<ForgotThePassword />} />
              <Route path='/reset-password' element={<ResetPasswordForm />} />
            </Route>
          </Route>
        </Routes>

      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
