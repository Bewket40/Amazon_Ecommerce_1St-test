import React from 'react';
import '../assets/css/ProductCard.css'
// import { Link } from 'react-router-dom'
import { useGlobal } from '../context/GlobalContext'
import API from '../components/api' 

function ProductCard({ product }) {
const {cart, setCart,  wishlist, toggleWishlist } = useGlobal()

const addToCart = () => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        setCart(cart.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        ));
    } else {
        setCart([...cart, { ...product, qty: 1 }]);
    }
    };





// const isSaved = wishlist.find((item) => item.id === product.id)

return (
    <div className="product-card">
    {/* <button
        className={`wishlist-btn ${isSaved ? 'active' : ''}`}
        onClick={() => toggleWishlist(product)}
        title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
        ♥
    </button> */}
    <img
        src={product.image}
        alt={product.title}
        loading="lazy"
        className="product-img"
/>

    <h3>{product.title}</h3>
    <p className="price">${product.price}</p>
    <div className="rating">★★★★☆</div>
    {product.estimatedDelivery && (
    <p className="delivery">📦 Delivery: {product.estimatedDelivery}</p>
)}

    <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
    );
}
export default ProductCard