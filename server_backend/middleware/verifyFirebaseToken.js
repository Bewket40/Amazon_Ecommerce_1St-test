const admin = require('../utils/firebaseAdmin.js')

const verifyFirebaseToken = async (req, res, next) => {
const token = req.headers.authorization?.split('Bearer ')[1]
if (!token) return res.status(401).json({ message: 'Missing token' })

try {
    const decoded = await admin.auth().verifyIdToken(token)
    req.user = decoded
    next()
    } catch (err) {
    res.status(401).json({ message: 'Invalid Firebase token' })
    }
}

// console.log('Received token:', token) 

module.exports = verifyFirebaseToken
