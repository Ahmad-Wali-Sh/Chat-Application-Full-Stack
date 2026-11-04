const express = require('express')
const router = express.Router()
router.use(express.json())
const authMiddleware = require('../middlewares/auth.middleware')
const chatDB = require('../config/db.config')


router.get('/rooms', authMiddleware, (req, res) => {
    chatDB
        .query(`
            SELECT * FROM room;
            SELECT * FROM room_member;
            `)
        .then((result) => {
            const rooms = result[0].rows
            const room_members = result[1].rows
            const userID = req?.user?.id

            const user_room_members = room_members.filter((room) => {
                return room.user_id == userID
            })
            const user_rooms_ids = user_room_members.map((room) => {
                return room.room_id
            })
            const user_rooms = rooms.filter((room) => {
                return user_rooms_ids.includes(room.id)
            })

            res.json({
                user: req.user,
                user_rooms: user_rooms
            })       
        })
        .catch((error) =>  res.json({error: error}))
})


module.exports = router