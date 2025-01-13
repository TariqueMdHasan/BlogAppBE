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



const deleteUser = async(req, res) => {
    // find id 
    // got id ?
    // find id and delete



    try{
        const user = await User.findById(req.user._id)
        if(!user){
            return res.status(400).json({message: 'You are not authorized to delete this account'})
        }
        await User.findByIdAndDelete(user)
        return res.status(200).json({message: 'User deleted successfully'})
    }catch(error){
        console.error('Error during user deletion', error)
        return res.status(500).jason({message: 'Eroor during user deletion'})
    }
}




const updateUser = async(req, res) => {
    // take email, name, userName, profile picture, password from body
    // return if email or userNmae and password not found
    // find id by fidn oNe method
    // return if user id not found 
    // change everything by if method
    // update and save
    // return json

    const { name, userName, email, password } = req.body

    if((!userName && !email) || !password){
        return res.status(400).json({message: 'Please enter email/userName and password'})
    }

    try{
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(400).json({message: 'You are not authorised to update this user'})
        }

        if(userName) user.userName = userName;
        if(email) user.email = email;
        if(password) user.password = password;
        if(name) user.name = name;

        const updatedUser = await user.save();
        return res.status(200).json({
            message: 'user updated successfully',
            user: {
                _id: updatedUser._id,
                userName: updatedUser.userName,
                name: updatedUser.name,
                email: updatedUser.email
            }
        })

    }catch(error){
        console.log('error in server', error.message)
        return res.status(500).json({message: 'server Error'})
    }
}


const getUserData = async (req, res) => {
    try{
        const user = await User.findById(req.user._id)
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        return res.status(200).json({
            message: 'User Data retrieved successfully',
            user: {
                _id: user._id,
                userName: user.userName,
                name: user.name,
                email: user.email
            }
        })
    }catch(error){
        console.error('Error finding user data', error)
        res.stutus(500).json({message: 'error while getting user data'})
    }
}



module.exports = { registerUser, loginUser, deleteUser, updateUser, getUserData }