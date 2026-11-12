require('dotenv').config()
const express = require('express')
const router = express.Router()
const chatDB = require('../config/db.config')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

router.use(express.json())

router.post('/signup', (req, res) => {
    const { username, password, fullname, age, bio, birthdate, email } = req.body
    if (username && password && fullname && email) {
        chatDB
            .query(`
                INSERT INTO users (username, password, fullname, age, bio,birthdate, email)
                VALUES ('${username}', '${password}', '${fullname}', '${age}','${bio}', '${birthdate}', '${email}');
                SELECT * FROM users ORDER BY id DESC LIMIT 1; 
                `)
            .then((result) => {
                const newAccount = result[1].rows[0]
                const token = jwt.sign(newAccount, JWT_SECRET)
                res.json({
                    message: 'Succesufully Authenticated and Account Created',
                    token: token
                })
            })
            .catch((error) => {
                res.json(error)
            })
    } 
    else {
        res.json({ message: 'Validation Failed!'})
    } 
})


router.post('/login', (req, res) => {
    const { username, password } = req.body
    if (username && password) {
        chatDB
            .query(`SELECT * FROM users WHERE username='${username}' and password='${password}';`)
            .then((result) => {
                 if (result.rows[0]) {
                    const user = result.rows[0]
                    const token = jwt.sign(user, JWT_SECRET)
                    res.json({
                        message: 'Authentication Succesfull',
                        token: token,
                        user: user
                    })
                 }
                 else {
                    res.json({
                        message: 'Username or Password is Wrong'
                    })
                 }
            })
            .catch((error) => {
                res.json(error)
            })
    }
    else {
        res.json({message: 'Enter Your Username and Password!'})
    }
})

module.exports = router