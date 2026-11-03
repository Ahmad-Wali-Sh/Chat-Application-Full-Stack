const express = require('express')
const router = express.Router()
router.use(express.json())

const authMiddleware = require('../middlewares/auth.middleware')

router.get('/rooms', authMiddleware, (req, res) => {
    res.json(req.user)
})


module.exports = router