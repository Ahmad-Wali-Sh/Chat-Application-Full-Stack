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


router.delete('/rooms/:id', authMiddleware, (req, res) => {
    const { id } = req.params

    chatDB
        .query('DELETE FROM room WHERE id=' + id)
        .then(() => res.json({message: 'Deleted Succesfully'}))
        .catch(() => res.json({error: 'delete not happend!'}))
})


router.post('/rooms', authMiddleware, (req, res) => {
    const { description, type, cover } = req.body
    chatDB
        .query(`INSERT INTO room (description, type, cover) VALUES ('${description}', '${type}', '${cover}') RETURNING *;`)
        .then((result) => res.json(result.rows))
        .catch((error) => res.json(error))
})

router.post('/room-member', authMiddleware, (req, res) => {
    const { room_id, user_id } = req.body
    if (!user_id) {
        user_id = req?.user?.id
    }
    chatDB
        .query(`INSERT INTO room_member (user_id, room_id) VALUES (${user_id}, ${room_id});`)
        .then(() => {
            res.json({
                message: 'Succefully Added to Group or Personal'
            })
        })
        .catch(() => {
            res.json({error: 'User Cant Join This Group or Personal Chat'})
        })
})

// uuid: 123abc-123@#$, 21kjafsdf123213, 12312312;lkfajsd, 
// id: 1, 2, 3, 5, 6, 7, 8, 9 ...

router.delete('/room-member/:id', authMiddleware, (req, res) => {
    const { id } = req.params
    chatDB
        .query('DELETE FROM room_member WHERE id=' + id)
        .then(() => res.json({message: 'Deleted Succesfully'}))
        .catch(() => res.json({error: 'delete not happend!'}))
})


module.exports = router