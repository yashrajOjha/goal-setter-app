const express = require('express')
const router = express.Router()
const {registerUser,userData,loginUser} = require('../controllers/userController')

//we need to protect from unauthorized access
const {protect} = require('../middleware/authMiddleware')
router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me', protect ,userData)
module.exports = router