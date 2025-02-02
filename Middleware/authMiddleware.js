const jwt = require('jsonwebtoken')
const User = require('../Models/UserModel.js')
const {verifyToken} = require('../Utils/TokenGenVer.js')

const authMiddleware = async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            // console.log('token is:', token)
            const decoded= verifyToken(token)
            req.user = await User.findById(decoded.id).select('-password');
            if(!req.user){
                return res.status(404).json({message: "User not found"})
            }
            next()
        }catch(error){
            console.error('Error in authMiddleware', error.message)
            return res.status(400).json({message: "Not authorized, token failed"})
        }
    }else{
        return res.status(400).json({message: 'not authorized, no token'})
    }
}




module.exports = authMiddleware;