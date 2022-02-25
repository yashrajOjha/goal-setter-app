const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000 //current the port number is 8000
//calling the PORT variable which is an environment variable 
//bring in the error handler
const {errorHandler} = require('./middleware/errorMiddleware')
const app = express()
const connectDB = require('./config/db')
const { sendFile } = require('express/lib/response')

connectDB()

app.use(express.json()) //body parser for json data
app.use(express.urlencoded({extended:false}))//url encoded parser
app.use('/api/goals',require('./routes/goalRoutes')) //linking the routes
/*get request to the goalRoutes using the api/goals*/
app.use('/api/users',require('./routes/userRoutes'))

//serve front for deployment
if(process.env.NODE_ENV ==='production'){
    app.use(express.static(path.join(__dirname,'../frontend/build'))) //joining the two parts

    //any other route will be rerouted to index.html
    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html')))
}else{
    app.get('/',(req,res)=>res.send('Please set to production'))
}
app.use(errorHandler)
app.listen(PORT,()=>console.log(`Server Started on Port ${PORT}`))
