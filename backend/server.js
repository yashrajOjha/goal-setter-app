const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000 //current the port number is 8000
//calling the PORT variable which is an environment variable 
//bring in the error handler
const {errorHandler} = require('./middleware/errorMiddleware')
const app = express()

app.use(express.json()) //body parser for json data
app.use(express.urlencoded({extended:false}))//url encoded parser
app.use('/api/goals',require('./routes/goalRoutes')) //linking the routes
/*get request to the goalRoutes using the api/goals*/
app.use(errorHandler)
app.listen(PORT,()=>console.log(`Server Started on Port ${PORT}`))
