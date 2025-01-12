const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./Config/db.js')
const dotenv = require('dotenv')


const app = express();
dotenv.config();

app.use(express.json())
connectDB();

const PORT = process.env.PORT || 8000;




app.get('/', (req, res) => {
    return res.send('Hello blog backend')
})

app.listen(PORT, (req, res) => {
    console.log(`app running at PORT ${PORT}`)
})