require('dotenv').config()
const { Pool } = require('pg')


const chatDB = new Pool({
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT_DB,
    host: process.env.HOST
})

module.exports = chatDB