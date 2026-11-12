require('dotenv').config()
const express = require('express')
const router = express.Router()
const chatDB = require('../config/db.config')
const authMiddleware = require('../middlewares/auth.middleware')


router.get('/users', authMiddleware,(req, res) => {
    chatDB
        .query(`SELECT * FROM users;`)
        .then((result)=> res.json(result.rows))
        .catch((error) => res.json(error))
})


module.exports = router