const express = require('express')
const router = express.Router()
const {registerUser,userData,loginUser} = require('../controllers/userController')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',userData)
module.exports = router