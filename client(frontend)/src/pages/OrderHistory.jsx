import '../assets/css/OrderHistory.css'
import { useEffect, useState } from 'react'
import { useGlobal } from '../context/GlobalContext'
import Spinner from '../components/Spinner';
import API from '../components/api' 


function OrderHistory() {
const { user, loading } = useGlobal();
const [orders, setOrders] = useState([]);
const [orderLoading, setOrderLoading] = useState(true);

useEffect(() => {
    const fetchOrders = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5020/api/orders', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        const data = await res.json();
        setOrders(data);
    } catch (error) {
        console.error('Error fetching orders:', error);
    } finally {
        setOrderLoading(false);
    }
    };

    if (user) {
    fetchOrders();
    }
}, [user]);

if (loading || orderLoading) return <Spinner />;

return (
    <div className="order-history-page">
    <h2>Your Orders</h2>

    {orders.length === 0 ? (
        <p>No orders found.</p>
    ) : (
        orders.map((order) => (
        <div key={order.id} className="order-card">
            <div className="order-header">
            <span><strong>Order ID:</strong> {order.id}</span>
              <span><strong>Date:</strong> {new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</span>
            <span><strong>Total:</strong> ${order.cartTotal?.toFixed(2)}</span>
            </div>

            <div className="order-items">
            {order.items.map((item, idx) => (
                <div key={idx} className="order-item">
                <p>{item.name}</p>
                <p>Qty: {item.quantity}</p>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            ))}
            </div>
        </div>
        ))
    )}
    </div>
);
}

export default OrderHistory;




// export default function OrderHistory() {
//     const { user } = useGlobal()
//     const [orders, setOrders] = useState([])

//   // Simulated user order history
//     useEffect(() => {
//     const fetchOrders = async () => {
//         const res = await API.get('/orders')
//         setOrders(res.data)
//     }
//     fetchOrders()
//     }, [])


//     return (
//     <div className="order-history">
//         <h2>Order History</h2>
//         <p className="welcome">Welcome, {user?.name || 'Customer'}!</p>

//         {orders.map((order) => (
//         <div className="order-card" key={order.id}>
//             <h4>Order #{order.id}</h4>
//             <p>Date: {order.date}</p>

//             <p className={`status ${order.status.toLowerCase()}`}>
//             Status: {order.status}
//         </p>

//             <ul>
//             {order.items.map((item, index) => (
//                 <li key={index}>
//                 {item.title} × {item.qty} = ${item.price * item.qty}
//                 </li>
//             ))}
//             </ul>
//             <p className="total">
//             Total: ${order.items.reduce((sum, i) => sum + i.price * i.qty, 0)}
//             </p>
//         </div>
//         ))}
//     </div>
//     )
// }
