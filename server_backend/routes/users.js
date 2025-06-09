const express = require('express')
const router = express.Router()

// GET /api/users
router.get('/', (req, res) => {
    res.json([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }])
})

module.exports = router
