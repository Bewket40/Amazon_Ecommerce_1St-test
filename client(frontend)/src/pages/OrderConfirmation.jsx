import '../assets/css/OrderConfirmation.css'
import { Link } from 'react-router-dom'

    function OrderConfirmation() {
    return (
    <div className="confirmation-container">
        <h2>Thank you for your purchase!</h2>
        <p>Your order has been placed successfully.</p>

        <div className="order-summary">
        <h4>Order Summary</h4>
        <p><strong>Order ID:</strong> #123456789</p>
        <p><strong>Total:</strong> $2048.00</p>
        <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
        </div>

        <Link to="/products" className="continue-shopping-btn">
        Continue Shopping
        </Link>
    </div>
    )
}
export default OrderConfirmation