import '../assets/css/Profile.css'
import { useState, useEffect } from 'react'

    function Profile() {
    const [user, setUser] = useState({
    name: '',
    email: '',
    })
    const [editing, setEditing] = useState(false)

  // Simulate fetching user data
    useEffect(() => {
    // You would fetch from backend in a real app
    const dummyUser = { name: '', email: '' }
    setUser(dummyUser)
    }, [])

    const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
    e.preventDefault()
    setEditing(false)
    // In real app, you'd send updated info to the backend
    alert('Profile updated!')
    }

    return (
    <div className="profile-container">
        <h2>User Profile</h2>
        <form className="profile-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            disabled={!editing}
        />

        <label>Email:</label>
        <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled={!editing}
        />

        {editing ? (
            <button type="submit">Save Changes</button>
        ) : (
            <button type="button" onClick={() => setEditing(true)}>
            Edit Profile
            </button>
        )}
        </form>
    </div>
    )
}
export default Profile