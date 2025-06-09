import '../assets/css/AdminDashboard.css'
// import { useGlobal } from '../context/GlobalContext'
import { useEffect, useState } from 'react'




function AdminDashboard() {
    const [summary, setSummary] = useState({
    users: 120,
    products: 20,
    orders: 45,
    revenue: 8294.50
    })

  // Simulate fetching admin stats (can replace with API later)

    useEffect(() => {
    // You could fetch('/api/admin/stats') here
    }, [])

    return (
    <div className="admin-dashboard">
        <h2>Admin Dashboard</h2>
        <div className="summary-cards">
        <div className="card">
        <h3>Total Users</h3>
        <p>{summary.users}</p>
        </div>
        <div className="card">
        <h3>Total Products</h3>
        <p>{summary.products}</p>
        </div>
        <div className="card">
        <h3>Total Orders</h3>
        <p>{summary.orders}</p>
        </div>
        <div className="card">
        <h3>Total Revenue</h3>
        <p>${summary.revenue.toLocaleString()}</p>
        </div>
    </div>
    </div>
)
}
export default AdminDashboard