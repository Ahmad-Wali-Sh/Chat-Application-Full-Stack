require('dotenv').config()
const express = require("express");
const router = express.Router();
const chatDB = require('../config/db.config')
const PORT = process.env.PORT

router.get("/health", (_, res) => {
  chatDB
    .query(`SELECT NOW();`)
    .then((result) => {
      res.json({
        message: "Server is Healthy",
        port: PORT,
        db: true,
        date: result.rows[0].now,
      });
    })
    .catch((error) => {
      res.json({
        message: "Server is Healthy",
        port: PORT,
        db: false,
        error: error,
      });
    });
});



module.exports = router