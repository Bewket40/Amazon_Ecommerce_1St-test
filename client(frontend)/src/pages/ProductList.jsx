import '../assets/css/ProductList.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard'
import API from '../components/api' 



// function ProductList() {
//     const [products, setProducts] = useState([])
//     const [category, setCategory] = useState('All')
//     const [sort, setSort] = useState('Default')
//     const [search, setSearch] = useState('')
//     const [setLoading] = useState(true)
//     const [setError] = useState(null)


// useEffect(() => {
//     const fetchProducts = async () => {
//         try {
//         const res = await API.get('/products')
//         setProducts(res.data)
//         } catch (err) {
//         console.error('❌ Error fetching products:', err.message)
//         setError('Failed to load products')
//         } finally {
//         setLoading(false)
//         }
//     }

//     fetchProducts()
//     }, [])


//   // Filter by category
// const filteredProducts =
//     category === 'All'
//     ? products
//     : products.filter((product) => product.category === category)

//   // Filter by search
// const searchedProducts = filteredProducts.filter((product) =>
//     product.title.toLowerCase().includes(search.toLowerCase())
// )

//   // Sort products
// const sortedProducts = [...searchedProducts].sort((a, b) => {
//     if (sort === 'PriceLowHigh') return a.price - b.price
//     if (sort === 'PriceHighLow') return b.price - a.price
//     if (sort === 'NameAZ') return a.title.localeCompare(b.title)
//     return 0
//     })

// const categories = ['All', 'Electronics', 'Home', 'Books', 'Clothing']

// return (
//     <div className="product-page">
//       {/* Sidebar */}
//         <aside className="sidebar">
//         <h3>Filter by Category</h3>
//         {categories.map((cat) => (
//         <button
//             key={cat}
//             className={cat === category ? 'active' : ''}
//             onClick={() => setCategory(cat)}
//             >
//             {cat}
//         </button>
//         ))}
//         </aside>

//       {/* Main area */}
//         <div className="product-grid">
//                {/* Filter + Search Bar */}
//         <div className="product-toolbar">
//             <label htmlFor="sort">Sort By:</label>
//             <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
//             <option value="Default">Default</option>
//             <option value="PriceLowHigh">Price: Low to High</option>
//             <option value="PriceHighLow">Price: High to Low</option>
//             <option value="NameAZ">Name: A to Z</option>
//             </select>

//             <div className="search-wrapper">
//             <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="search-input"
//             />

//             {/* 🔍 Live search suggestions */}
//             {search && (
//             <ul className="search-suggestions">
//                 {sortedProducts.slice(0, 5).map((product) => (
//                 <li key={product.id}>{product.title}</li>
//                 ))}
//             </ul>
//             )}
//         </div>
//     </div>

//         <h2>{category} Products</h2>
//         <div className="grid">
//             {sortedProducts.length > 0 ? (
//             sortedProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//             ))
//             ) : (
//             <p>No products found.</p>
//             )}
//         </div>

//      {/* //recently viewed section */}

//         <RecentlyViewed />
//         </div>
//     </div>
//     )
// }

const ProductList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('q') || '';
  const category = queryParams.get('category') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('http://localhost:5020/api/products', {
          params: {
            q: searchTerm,
            category,
          },
        });
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, category]);

  // const handleCategoryClick = (cat) => {
  //   navigate(`/products?category=${encodeURIComponent(cat)}`);
  // };

  return (

    // <div className="productlist-container">
    //   <div className="sidebar">
    //     <h3>Departments</h3>
    //     <ul>
    //       <li onClick={() => handleCategoryClick('electronics')}>Electronics</li>
    //       <li onClick={() => handleCategoryClick('jewelery')}>Jewelery</li>
    //       <li onClick={() => handleCategoryClick("men's clothing")}>Men's Clothing</li>
    //       <li onClick={() => handleCategoryClick("women's clothing")}>Women's Clothing</li>
    //     </ul>
    //   </div>

<div className="productlist-main">
      <h2 className="section-title">
        {category ? `${category.toUpperCase()} Products` : 'Products'}
      </h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && products.length === 0 && <p>No products found.</p>}

      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;


