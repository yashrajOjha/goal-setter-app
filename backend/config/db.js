const mongoose = require('mongoose')

//asynchronus because it is always returning a promise
const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo DB connected: ${conn.connection.host}`.cyan.underline);
    }catch(error){
        console.log(error);
        process.exit(1); //close the process with failure
    }
}

module.exports = connectDB