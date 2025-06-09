import '../assets/css/Register.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobal } from '../context/GlobalContext'

    function Register() {
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const { setUser } = useGlobal()
const navigate = useNavigate()

const handleSubmit = (e) => {
    e.preventDefault()
    const userData = { name, email }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    navigate('/')
}

return (
    <div className="register-container">
        <h2>Register</h2>
    <form onSubmit={handleSubmit} className="register-form">
        <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        />
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
        <button type="submit">Register</button>
    </form>
    </div>
    )
}

export default Register