const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 30000, // Optional: Increase timeout to 30 seconds
        })
        console.log('connected to the data base succesfully(dob.js')
        
    }catch(error){
        console.log('Error in db.js', error.message)
        process.exit(1);
    }

}

module.exports = connectDB;