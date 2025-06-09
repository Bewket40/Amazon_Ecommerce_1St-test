import  '../assets/css/Wishlist.css'
import { useGlobal } from '../context/GlobalContext'

function Wishlist() {
    const { wishlist, toggleWishlist, addToCart } = useGlobal()

return (
    <div className="wishlist-page">
    <h2>Your Wishlist</h2>

    {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
        ) : (
        <div className="wishlist-grid">
        {wishlist.map((item) => (
            <div key={item.id} className="wishlist-card">
                <img src={item.image} alt={item.title} />
                <div className="info">
                <h4>{item.title}</h4>
                <p>${item.price}</p>
                <div className="buttons">
                <button onClick={() => addToCart(item)}>Add to Cart</button>
                <button onClick={() => toggleWishlist(item)} className="remove">
                    Remove
                </button>
                </div>
            </div>
            </div>
        ))}
        </div>
    )}
    </div>
    )
}
export default Wishlist