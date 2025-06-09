import '../assets/css/Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobal } from '../context/GlobalContext'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setUser } = useGlobal()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
    e.preventDefault()

    // Simulated login
    if (email === 'user@example.com' && password === '1234') {
        const userData = { name , email }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        navigate('/')
    } else {
        alert('Invalid credentials')
    }
    }

    return (
    <div className="login-container">


        <h2>Sign-in</h2>
        <form onSubmit={handleSubmit} className="login-form">
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <button type="submit">Login</button>
        </form>
    </div>
    )
}
export default Login