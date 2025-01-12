const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        .then(()=> console.log('Server connected successfully(db.js)'))
        .catch((error)=> console.log('not connected to the database(db.js)', error))
    }catch(error){
        console.log('Error in db.js', error)
    }
}

module.exports = connectDB;