const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./Config/db.js')
const dotenv = require('dotenv')
const userRoutes = require('./Routes/UserRoutes.js')
const cors = require('cors')
const bodyparser = require('body-parser')
const blogRoutes = require('./Routes/blogRoutes.js')
const commentRoutes = require('./Routes/CommenRoute.js')




const app = express();
dotenv.config();


app.use(express.json())
connectDB();
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 8000;





// Routes
app.use('/api/auth', userRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/comment', commentRoutes)

app.get('/', (req, res) => {
    return res.send('Hello blog backend')
})

app.listen(PORT, (req, res) => {
    console.log(`app running at PORT ${PORT}`)
})