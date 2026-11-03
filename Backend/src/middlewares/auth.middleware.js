require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
    const tokenDraft = req.headers.authorization
    const token = tokenDraft?.split(' ')[1]

    jwt.verify(token, JWT_SECRET, (error, payload) => {
        if (error) {
            res.json({
                message: 'Token not Correct!',
                error: error
            })
        }
        else {
            req.user = payload
            next()
        }
    })
}

module.exports = authMiddleware