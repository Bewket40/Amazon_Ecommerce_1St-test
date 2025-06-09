import '../assets/css/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGlobal } from '../context/GlobalContext'
import API from '../components/api'
import { auth } from '../../Utility/firebase'
import logo from '../assets/images/amazonlogo_PNG11.png'              

//     function Navbar() {
//     const { cart, user, setUser } = useGlobal()         // ⬅ UPDATED: get user and setUser from context
//     const [mobileOpen, setMobileOpen] = useState(false)
//     const [query, setQuery] = useState('')
//     const navigate = useNavigate()
//     //how many items in the cart
//     const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)   // ⬅ NEW
//     const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

//     const toggleMenu = () => setMobileOpen(!mobileOpen)

//     const handleSearch = (e) => {
//     e.preventDefault()
//     if (query.trim()) {
//         navigate(`/products?query=${encodeURIComponent(query.trim())}`)
//         setQuery('')
//         setMobileOpen(false)
//     }
//     }

//     const handleLogout = () => {
//     setUser(null)
//     localStorage.removeItem('user')
//     navigate('/login')
//     }

//     return (
//     <nav className="navbar">
//         <div className="navbar-container">
//         <Link to="/" className="logo">
//             <img src={amazonlogo} className="amazon-logo" />
//         </Link>

//         <form onSubmit={handleSearch} className="search-form">
//             <input
//                 type="text"
//                 placeholder="Search..."
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//             />
//         </form>

//         <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
//             <Link to="/">Home</Link>
//             <Link to="/products">Shop</Link>

//             {/* 🔴 Cart link with badge */}
//             <div className="cart-hover">
//             <Link to="/cart" className='cart-link'>Cart
//                 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}          
//             </Link>
//             {cart.length > 0 && (
//             <div className="cart-dropdown">
//                 {cart.map((item) => (
//                     <div key={item.id} className="cart-item">
//                     {item.title} × {item.qty}
//                     </div>
//                 ))}
//                 <div className="cart-total">Total: ${cartTotal.toFixed(2)}</div>
//                 <Link to="/cart" className="go-to-cart">Go to Cart</Link>
//             </div>
//             )}
//         </div>

//                 <Link to="/wishlist">Wishlist</Link>
//                 <Link to="/profile">Profile</Link>

//                 {user ? (
//             <div className="user-dropdown">
//                 <span>{user.name || 'Account'} ▼</span>
//                 <div className="dropdown-menu">
//                 <Link to="/profile">Profile</Link>
//                 <button onClick={handleLogout}>Logout</button>
//                 </div>
//             </div>
//             ) :  (
//                 <>
//                 <Link to="/login">Login</Link>
//                 <Link to="/register">Register</Link>
//                 </>
//                 )
//             } 
//         </div>
        
//         <div className="hamburger" onClick={toggleMenu}>
//             <div className="bar"/>
//             <div className="bar"/>
//             <div className="bar"/>
//         </div>
//     </div>
// </nav>
//     )
// }  
// export default Navbar

function Navbar() {
    const { cart } = useGlobal()
    const [categories, setCategories] = useState([])
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const navigate = useNavigate()

 // Add this line to calculate the total cart item count
    const cartItemCount = cart.reduce((total, item) => total + (item.qty || 1), 0)

    useEffect(() => {
    const fetchCategories = async () => {
        try {
        const res = await API.get('/products/categories')
        setCategories(res.data)
        } catch (err) {
        console.error('Category fetch failed:', err)
        }
    }
    fetchCategories()
    }, [])

    const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/products?search=${searchTerm}&category=${selectedCategory}`)
    }

    return (
    <header className="navbar">
        <div className="navbar-top">
        <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>☰</button>

        <Link to="/" className="logo-link nav-item">
        <img
            src={logo}
            alt="Amazon"
            className="logo"
        />
        </Link>

        <div className="location">
            <img  className="location-icon"
            src="https://img.icons8.com/ios-filled/24/ffffff/marker.png"
            alt="Location" />
    
        <div className="location-text" >
            <span  className="line1">Deliver to</span>
            <strong  className="line2"> Newyork <span className="dropdown-caret">▼</span> </strong>
        </div>
        </div>

        <form className="search-bar" onSubmit={handleSearch}>
    <div className="search-dropdown"> 
            <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All</option>
            {categories.map((cat) => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
            </select>
            <span className="caret">▼</span>
    </div>       

            <input
            type="text"
            placeholder="Search Amazon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/search--v1.png" alt="Search" />
            </button>
        </form>

        <div className="lang nav-item">
            <img   className="lang img"
            src="https://img.icons8.com/color/48/usa.png" alt="EN" />
            <select className="lang-select">
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
            <option value="de">DE</option>
            </select>
        </div>

< Link to="/login" className="nav-item">
<span>Hello, Sign In</span>
<strong>Account & Lists  </strong>

</Link>

        <Link to="/orders" className="nav-item">
            <span>Returns</span>
            <strong>& Orders</strong>
        </Link>

        {/* <Link to="/cart" className="nav-item cart">
            <img src="https://img.icons8.com/material-outlined/48/ffffff/shopping-cart--v1.png" alt="Cart" />
            <span className="cart-count">{cart.length}</span>
            <strong>Cart</strong>
        </Link> */}

<div className="nav-item cart-dropdown">
    <div className="cart-icon-wrapper">
    <img
    src="https://img.icons8.com/material-outlined/48/ffffff/shopping-cart--v1.png"
    alt="Cart"
    />
    <span className="cart-count">{cartItemCount}</span>
    </div>
    <span className="cart-label">Cart</span>

    <div className="mini-cart">
    {cartItemCount === 0 ? (
    <p>Your cart is empty.</p>
    ) : (
        <>
        {cart.slice(0, 3).map((item) => (
            <div key={item.id} className="mini-cart-item">
            <span>{item.title}</span>
            <span>Qty: {item.qty}</span>
            </div>
        ))}
        <Link to="/cart" className="go-to-cart-btn">
            Go to Cart
        </Link>
        </>
    )}
    </div>
</div>



    
        </div>

        <nav className={`navbar-bottom ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="category-dropdown">
            ☰ All
            <div className="category-list">
            {categories.map((cat) => (
                <div key={cat}>{cat}</div>
            ))}
            </div>
        </div>
        <span>Today's Deals</span>
        <span>Registry</span>
        <span>Prime Video</span>
        <span>Gift Cards</span>
        <span>Customer Service</span>
        <span>Sell</span>
    </nav>
    </header>
    )
}
export default Navbar