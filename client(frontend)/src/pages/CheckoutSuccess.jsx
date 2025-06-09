import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext';

function CheckoutSuccess() {
const { setCart } = useGlobal();
const navigate = useNavigate();

useEffect(() => {
    const shouldClear = localStorage.getItem('clearCart');
    if (shouldClear === 'true') {
    setCart([]);
    localStorage.removeItem('clearCart');
    }
    const timer = setTimeout(() => {
    navigate('/orders');
    }, 2000); // Redirect to order history
    return () => clearTimeout(timer);
}, []);

return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>✅ Payment Successful!</h2>
    <p>Your cart has been cleared. Redirecting to your orders...</p>
    </div>
);
}
export default CheckoutSuccess;
