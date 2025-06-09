


import { loadStripe } from '@stripe/stripe-js';
import { useGlobal } from '../context/GlobalContext';
import API from '../components/api';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);  // From Stripe dashboard

function Checkout() {
  const { cart } = useGlobal();

  const handleCheckout = async () => {
  try {
    
    await stripePromise;
      const response = await API.post('/stripe/create-checkout-session', {
        items: cart,
    });


 // Save flag in localStorage to trigger cleanup on success

 localStorage.setItem('clearCart', 'true');
    window.location.href = response.data.url;
  } catch (error) {
    console.error('Checkout error:', error);
  }
};


  return (
    <div className="checkout-page">
      <h2>Ready to Pay?</h2>
      <button onClick={handleCheckout}>Pay with Stripe</button>
    </div>
  );
}
export default Checkout;
