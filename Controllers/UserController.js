const User = require('../Models/UserModel.js')
const {generateToken} = require('../Utils/TokenGenVer.js')
const bcrypt = require('bcrypt')

const registerUser = async (req, res) => {
    // taking userdata from req body
    // required field should be given otherwise return
    // check if use exists
    // create and save user if user is new

    const { userName, name, email, password, profilePicture } = req.body;

    if(!userName || !name || !email || !password ){
        return res.status(400).json({ message: 'Please eneter all data'})
    }

    const userExist = await User.findOne({email})
    if(userExist){
        return res.status(400).json({message: 'user already exist'})
    }
    const userNameExist = await User.findOne({userName})
    if(userNameExist){
        return res.status(400).json({message: 'userName is taken'})
    }

    try{
        const user = await User.create({userName, email, password,name, profilePicture })
        const token = generateToken(user._id);
        res.status(200).json({
            message: "User Created Successfully",
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                userName: user.userName,
                profilePicture: user.ProfilePicture
            },
            token
        })

    }catch(error){
        console.error('Error during user Registration (UserController)', error)
        return res.status(500).json({message: "Server error (UserController"})
    }
}

const loginUser = async (req, res) => {
    // take input from body
    // chech is email or usename exist
    // find user and login



    const { email, password, userName } = req.body;

    if((!email &  !userName)  || !password){
        return res.status(400).json({message: 'please enter all the details'})
    }

    try{
        // const user = await User.findOne({email})
        let user;
        if(email){
            user = await User.findOne({email})
        }else if(userName){
            user = await User.findOne({userName})
        }

        if(!user){
            return res.status(400).json({message: 'Invalid user email'})
        }
        const userPassword =  await bcrypt.compare(password, user.password)
        if(!userPassword){
            return res.status(400).json({message: "invalid password"})
        }

        const token = generateToken(user._id)
        return res.status(200).json({
            message: 'User logged in successfully',
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email
            },
            token
            
        })
            
    }catch(error){
        console.error('server error in Usercontroller', error)
        return res.status(500).json({message: 'server error in UserController'})
    }

}





module.exports = { registerUser, loginUser }