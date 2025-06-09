const express = require('express')
const router = express.Router()
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken')
const cors = require('cors')
const { db } = require('../utils/firebaseAdmin');
const admin = require('../utils/firebaseAdmin');
// const db = admin.firestore()


// Save new order
router.post('/', verifyFirebaseToken, async (req, res) => {
try {
    const { items, cartItemCount, cartTotal, address } = req.body;
    const uid = req.user.uid;

    const orderRef = db.collection('orders').doc();
    const orderData = {
    uid,
    items,
    cartItemCount,
    cartTotal,
    address,
    createdAt: new Date().toISOString(),
    };

    await orderRef.set(orderData);
    res.status(201).json({ id: orderRef.id, ...orderData });
} catch (err) {
    console.error('Firestore order save failed:', err);
    res.status(500).json({ error: 'Failed to save order' });
}
});

//Fetch user orders

router.get('/', verifyFirebaseToken, async (req, res) => {
try {
    const uid = req.user.uid;
    const snapshot = await db
    .collection('orders')
    .where('uid', '==', uid)
    .orderBy('createdAt', 'desc')
    .get();

    const orders = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
    }));

    res.status(200).json(orders);

} catch (err) {
    console.error('❌ Failed to fetch orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
}
});


module.exports = router;















// // GET /api/orders
// router.get('/', verifyFirebaseToken, async (req, res) => {
//     const userId = req.user.uid
//     const snapshot = await db
//     .collection('orders')
//     .where('userId', '==', userId)
//     .orderBy('createdAt', 'desc')
//     .get()

//     const orders = snapshot.docs.map((doc) => doc.data())
//     res.json(orders)
// })

// // POST /api/orders
// router.post('/', verifyFirebaseToken, async (req, res) => {
//     const userId = req.user.uid
//     const { items, total, address } = req.body

//     const order = {
//     id: Date.now(),
//     userId,
//     items,
//     total,
//     address,
//     status: 'Pending',
//     createdAt: new Date().toISOString(),
//     }

//     await db.collection('orders').add(order)
//     res.status(201).json(order)
// })

// module.exports = router
