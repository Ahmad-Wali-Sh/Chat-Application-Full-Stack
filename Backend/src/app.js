require('dotenv').config()
const { default: chalk } = require('chalk')
const express = require('express')
const app = express()
const PORT = process.env.PORT


const serverRoutes = require('./routes/server.routes')

app.use('/', serverRoutes)


app.listen(PORT, () => console.log(chalk.bgGreen('Server PORT: ' + PORT)))