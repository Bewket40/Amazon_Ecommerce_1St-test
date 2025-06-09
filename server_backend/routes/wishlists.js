// const express = require('express')
// const router = express.Router()
// const verifyFirebaseToken = require('../middleware/verifyFirebaseToken')
// const admin = require('../utils/firebaseAdmin')
// const db = admin.firestore()

// // GET /api/wishlist
// router.get('/', verifyFirebaseToken, async (req, res) => {
//     const userId = req.user.uid
//     const doc = await db.collection('wishlists').doc(userId).get()
//     res.json(doc.exists ? doc.data().items : [])
// })

// // POST /api/wishlist
// router.post('/', verifyFirebaseToken, async (req, res) => {
//     const userId = req.user.uid
//     const { product } = req.body

//     const wishlistRef = db.collection('wishlists').doc(userId)
//     const doc = await wishlistRef.get()
//     let items = doc.exists ? doc.data().items : []

//     const exists = items.find((item) => item.id === product.id)
//     if (exists) {
//     // Remove if already exists (toggle)
//     items = items.filter((item) => item.id !== product.id)
//     } else {
//     items.push(product)
//     }

//     await wishlistRef.set({ items })
//     res.json(items)
// })

// module.exports = router
