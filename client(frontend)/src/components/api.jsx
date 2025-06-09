import axios from 'axios'

// Create an Axios instance with backend base URL
const API = axios.create({
  baseURL: 'http://localhost:5020/api'  // 🔁 change this to match your backend port
})

// Automatically attach Firebase ID token from localStorage
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
    config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

export default API
