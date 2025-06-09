import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
// import Login from './pages/Login'
// import Register from './pages/Register'
import LoginRegister from './pages/LoginRegister'
import Profile from './pages/Profile'
import OrderConfirmation from './pages/OrderConfirmation'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRout'
import OrderHistory from '../src/pages/OrderHistory'
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import CheckoutSuccess from './pages/CheckoutSuccess';

import './assets/css/App.css'



function App() {

  return (
  <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
  <Route path="/success" element={<Success />} />
  <Route path="/cancel" element={<Cancel />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      

      </Routes>
      <Footer />
    </>
  )
}

export default App

