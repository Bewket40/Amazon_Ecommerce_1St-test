const express = require('express')
const axios = require('axios')
const router = express.Router()

const BASE_API = 'https://fakestoreapi.com/products'

// // GET /api/products → All products
// router.get('/', async (req, res) => {
//     try {
//     const response = await axios.get(BASE_API)
//     res.json(response.data)
//     } catch (err) {
//     console.error('Error fetching products:', err.message)
//     res.status(500).json({ error: 'Unable to load products' })
//     }
// })

// // GET /api/products/:id → Product details by ID
// router.get('/:id', async (req, res) => {
//     try {
//     const productId = req.params.id
//     const response = await axios.get(`${BASE_API}/${productId}`)
//     res.json(response.data)
//     } catch (err) {
//     console.error('Error fetching product:', err.message)
//     res.status(500).json({ error: 'Product not found' })
//     }
// })

// // GET /api/products/category/:name → Filter by category
// router.get('/category/:name', async (req, res) => {
//     try {
//     const category = req.params.name
//     const response = await axios.get(`${BASE_API}/category/${category}`)
//     res.json(response.data)
//     } catch (err) {
//     console.error('Error fetching category:', err.message)
//     res.status(500).json({ error: 'Category not found' })
//     }
// })

// module.exports = router



router.get('/', async (req, res) => {
  try {
    const { category, q } = req.query;
    const response = await axios.get('https://fakestoreapi.com/products');
    let products = response.data;

    // Filter by category
    if (category) {
      products = products.filter(p =>
        p.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Filter by search keyword
    if (q) {
      products = products.filter(p =>
        p.title.toLowerCase().includes(q.toLowerCase())
      );
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;