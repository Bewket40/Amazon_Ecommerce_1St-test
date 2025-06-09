import '../assets/css/Toast.css'

function Toast({ message, onClose }) {
    return (
    <div className="toast">
        {message}
        <button onClick={onClose}>&times;</button>
    </div>
    )
}
export default Toast