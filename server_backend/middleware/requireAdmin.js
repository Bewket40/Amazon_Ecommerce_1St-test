const admin = require('firebase-admin')

// Middleware to check custom admin claim
const requireAdmin = async (req, res, next) => {
    try {
    const user = await admin.auth().getUser(req.user.uid)

    if (user.customClaims?.admin === true) {
        return next()
    } else {
        return res.status(403).json({ message: 'Admin access required' })
    }
    } catch (err) {
    console.error('Admin check failed:', err.message)
    return res.status(403).json({ message: 'Access denied' })
    }
}

module.exports = requireAdmin
