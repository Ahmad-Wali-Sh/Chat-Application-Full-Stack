const express = require('express')
const router = express.Router()
const chatDB = require('../config/db.config')
const authMiddleware = require('../middlewares/auth.middleware')
router.use(express.json())


router.get('/messages/:room_id',authMiddleware, (req, res) => {
    const { room_id } = req.params
    chatDB
        .query(`SELECT * FROM message WHERE room_id=${room_id};`)
        .then((result) => res.json(result.rows))
        .catch((error) => res.json(error))
})

    // text VARCHAR(1000) NOT NULL,
    // user_id INT NOT NULL,
    // reply_id INT,
    // assets TEXT,
    // timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    // // room_id

router.post('/messages', authMiddleware, (req, res) => {
    const { text, room_id } = req.body
    const user_id = req.user.id

    chatDB
    .query(`
        INSERT INTO message (text, user_id, room_id)
        VALUES ('${text}', '${user_id}', '${room_id}') RETURNING *;
    `)
    .then(result => res.json(result.rows))
    .catch(error => res.json(error))
})


router.patch('/messages/:id', authMiddleware,(req, res) => {
    const { id } = req.params
    const { text } = req.body
    
    chatDB
        .query(`UPDATE message SET text='${text}' WHERE id=${id};`)
        .then(() => res.json({message: 'Succesfull'}))
        .catch((error) => res.json(error))
})

router.delete('/message/:id', authMiddleware, (req, res) => {
    const { id } = req.params

    chatDB
        .query('DELETE FROM message WHERE id=' + id)
        .then(() => res.json({message: 'Deleted Succesfully'}))
        .catch(() => res.json({error: 'delete not happend!'}))
})

module.exports = router