const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler( async(req,res,next)=>{
    /*create a token, http headers have an autherization objects, every token starts with Bearer space token*/
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from header 
            token = req.headers.authorization.split(' ')[1] //just the tokem
            //verify the token
            /*PAYLOAD:DATA
            {
            "id": "620f919788451b152026b4ff",
            "iat": 1645188284,
            "exp": 1647780284
            }*/
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            //get user from token
            req.user = await User.findById(decoded.id).select('-password') //decode the payload

            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Unauthorized access')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Token not found')
    }
})

module.exports = {protect}