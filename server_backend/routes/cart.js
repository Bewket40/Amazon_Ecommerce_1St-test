const express = require('express')
const router = express.Router()
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken')
const admin = require('../utils/firebaseAdmin')

const db = admin.firestore()

// GET /api/cart
router.get('/', verifyFirebaseToken, async (req, res) => {
    const userId = req.user.uid
    const doc = await db.collection('carts').doc(userId).get()
    const items = doc.exists ? doc.data().items : []
    res.json(items)
})

// POST /api/cart
router.post('/', verifyFirebaseToken, async (req, res) => {
    const userId = req.user.uid
    const { product, qty } = req.body

    const cartRef = db.collection('carts').doc(userId)
    const doc = await cartRef.get()
    let cart = doc.exists ? doc.data().items : []

    const existingIndex = cart.findIndex(item => item.id === product.id)
    if (existingIndex !== -1) {
    cart[existingIndex].qty += qty
    } else {
    cart.push({ ...product, qty })
    }

    await cartRef.set({ items: cart })
    res.json(cart)
})

// DELETE /api/cart/:id
router.delete('/:id', verifyFirebaseToken, async (req, res) => {
    const userId = req.user.uid
    const productId = parseInt(req.params.id)

    const cartRef = db.collection('carts').doc(userId)
    const doc = await cartRef.get()
    const cart = doc.exists ? doc.data().items : []

    const updatedCart = cart.filter(item => item.id !== productId)

    await cartRef.set({ items: updatedCart })
    res.json(updatedCart)
})
module.exports = router