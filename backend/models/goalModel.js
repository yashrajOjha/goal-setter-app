const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    //we must know which user created the goal
    user:{
        type: mongoose.Schema.Types.ObjectId, //the user must be an object id
        required:true,
        //referrence
        ref: 'User',
    },
    text: {
        type:String,
        required: [true,'Please add a text value'],
    },
}, {
    timestamps:true,
})

module.exports = mongoose.model('Goals',goalSchema)