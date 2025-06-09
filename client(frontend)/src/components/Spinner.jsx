import '../assets/css/Spinner.css'

    function Spinner({ message = 'Loading...' }) {
    return (
    <div className="spinner-wrapper">
    <div className="spinner-loader"></div>
        <p className="spinner-text">{message}</p>
        <Spinner message="Fetching orders..." />
    </div>
    )
    }
    export default Spinner
