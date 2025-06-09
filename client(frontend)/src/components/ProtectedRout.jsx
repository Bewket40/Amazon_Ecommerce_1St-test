import { useGlobal } from '../context/GlobalContext'
import { Navigate } from 'react-router-dom'

    function ProtectedRoute({ children }) {
    const { user } = useGlobal()

    return user ? children : <Navigate to="/login" replace />
}
export default ProtectedRoute