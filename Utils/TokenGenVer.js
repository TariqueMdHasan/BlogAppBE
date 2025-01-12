const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    try{
        if(!process.env.JWT_SECRET){
            throw new Error('JWT_SECRET is not defined in .env file')
        }
        return jwt.sign({id}, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

    }catch(error){
        console.log('Error in token generation')
        throw new Error('Error in token generation')
    }
}


const verifyToken = (token) => {
    try{
        if(!process.env.JWT_SECRET){
            throw new Error('JWT_SECRET is not defined in .env file')
        }
        return jwt.verify(token, process.env.JWT_SECRET)
    }catch(error){
        console.log('Error during token verification', error)
        throw new Error('not authorised to access this route')
    }
}

module.exports = { generateToken, verifyToken }