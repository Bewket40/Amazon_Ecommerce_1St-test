import '../assets/css/ProductDetail.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGlobal } from '../context/GlobalContext'
import API from '../components/api' 
// import Toast from '../components/Toast'

//import images
// import iphone from '../assets/images/iphone.png'
// import macbook from '../assets/images/macbook.png'
// import echo from '../assets/images/amazon-echo-dot.png'

function ProductDetail() {
    const { id } = useParams()
    const { addToCart } = useGlobal()
    const [product, setProduct] = useState(null)

    useEffect(() => {
    const fetchProduct = async () => {
        try {
        const res = await API.get(`/products/${id}`)
        setProduct(res.data)
        } catch (err) {
        console.error('Failed to load product:', err.message)
        }
    }
    fetchProduct()
    }, [id])

    // const found = sampleProducts.find(p => p.id === parseInt(id))
    // setProduct(found)
    // }, [id])

  // ✅ Track recently viewed
    useEffect(() => {
    if (product) {
        const existing = JSON.parse(localStorage.getItem('recentlyViewed')) || []
        const filtered = existing.filter((item) => item.id !== product.id)
        const updated = [product, ...filtered].slice(0, 5)
        localStorage.setItem('recentlyViewed', JSON.stringify(updated))
    }
    }, [product])

    if (!product) return <p>Loading product...</p>

    return (
    <div className="product-detail">
        <img src={product.image} alt={product.title} />
        <div className="product-info">
        <h2>{product.title}</h2>
        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>
        <p className="category">Category: {product.category}</p>
        <button className="add-btn" onClick={() => addToCart(product)}>
            Add to Cart
        </button>

        <hr />
<div className="reviews">
<h4>
    ★ {product.rating} / 5 ({product.reviews.length} reviews)
</h4>
<ul>
    {product.reviews.map((r, index) => (
    <li key={index}>
        <strong>{r.name}:</strong> {r.text}
    </li>
    ))}
</ul>
</div>


        {/* {Toast && <Toast message={Toast} onClose={() => setToast('')} />} */}

        </div>
    </div>
    )
}
export default ProductDetail