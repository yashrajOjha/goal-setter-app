const jwt = require('jsonwebtoken')
const bcrpyt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
// @desc register user
// @access PUBLIC
// @route POST /api/users
const registerUser = asyncHandler( async (req,res)=>{
    const {name,email,password}=  req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields correctly')
    }
    //check if user exits
    userExists = await User.findOne({email})
    if(userExists){
        req.status(400)
        throw new Error('User already exists, try with a different email id.')
    } 
    // Hashing the password using salt
    const salt= await bcrpyt.genSalt(10)
    const hashedPass = await bcrpyt.hash(password,salt)

    //create the user
    const user = await User.create({name, email, password: hashedPass})
    if(user){
        res.status(201).json({
             _id: user.id,
             name:user.name,
             email:user.email,
             token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Authenticate a user
// @access PUBLIC
// @route POST /api/users/login
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    //check for the email
    const user = await User.findOne({email})

    if(user && (await bcrpyt.compare(password,user.password))){
        res.status(201).json({
            _id: user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id)
       })
    }else{
        res.status(400)
        throw new Error('Invalid user credentials')
    }
})

// @desc Get user data
// @access PRIVATE
// @route GET /api/users/me
const userData = asyncHandler(async(req,res)=>{
    res.json({message:'User Data'})
})

//generate jwt token
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}
module.exports = {
    registerUser,
    loginUser,
    userData
}