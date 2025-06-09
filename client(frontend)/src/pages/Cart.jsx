import '../assets/css/Cart.css'
import React from 'react';
import { useGlobal } from '../context/GlobalContext'
import { Link } from 'react-router-dom'

function Cart() {
    // const { cart, updateQty, removeFromCart } = useGlobal()

    const { cart, setCart, cartItemCount, cartTotal } = useGlobal();

//   const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

const updateQty = (id, newQty) => {
    setCart(cart.map(item =>
    item.id === id ? { ...item, qty: newQty } : item
    ));
};

const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
};

return (
    <div className="cart-page">
    <h2>Your Shopping Cart</h2>
    {/* <h3>Total Items: {cartItemCount}</h3> */}
{/* <h3>Total Price: ${cartTotal.toFixed(2)}</h3> */}
    {cart.length === 0 ? (
        <div className="empty-cart">
        <p>Your cart is empty.</p>
        <Link to="/products" className="continue-link">Continue Shopping</Link>
        </div>
    ) : (
        <>
        <div className="cart-items">
            {cart.map((item) => (
            <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                <h4>{item.title}</h4>
                <p className="price">${item.price.toFixed(2)}</p>
                <div className="quantity">
                    <label>Qty:</label>
                    <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                    />
                </div>
                <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                    Remove
                </button>
                </div>
            </div>
            ))}

            <h3>Total Items: {cartItemCount}</h3>
            <h3>Total Price: ${cartTotal.toFixed(2)}</h3>
        
        </div>

        <div className="cart-summary">
            <h3>Subtotal: ${cartTotal.toFixed(2)}</h3>
            <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
        </div>
        </>
    )}
    </div>
)
}
export default Cart