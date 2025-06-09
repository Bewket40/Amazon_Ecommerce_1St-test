import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import   '../assets/css/RecentlyViewed.css'

function RecentlyViewed() {
    const [recent, setRecent] = useState([])

    useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem('recentlyViewed')) || []
    setRecent(viewed)
    }, [])

    if (recent.length === 0) return null

    return (
    <div className="recently-viewed">
        <h3>Recently Viewed</h3>
        <div className="recent-grid">
        {recent.map((item) => (
            <ProductCard key={item.id} product={item} />
        ))}
        </div>
    </div>
    )
}
export default RecentlyViewed