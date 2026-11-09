require('dotenv').config()
const { default: chalk } = require('chalk')
const express = require('express')
const app = express()
const PORT = process.env.PORT
const cors = require('cors')

app.use(cors())

const serverRoutes = require('./routes/server.routes')
const authRoutes = require('./routes/auth.routes')
const roomsRoutes = require('./routes/rooms.routes')
const messageRoutes = require('./routes/message.routes')


app.use('/', serverRoutes)
app.use('/auth', authRoutes)
app.use('/', roomsRoutes)
app.use('/', messageRoutes)


app.listen(PORT, () => console.log(chalk.bgGreen('Server PORT: ' + PORT)))

