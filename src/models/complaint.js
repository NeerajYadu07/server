const mongoose = require('mongoose')
const Schema = mongoose.Schema

const complaintSchema = new Schema({
    type:{
        type:String,
        required:true,
        

    },
    description:{
        type:String,
        // required:true,
        // unique:true,

    },
    room:{
        type:String,
        required:true,
        // unique:true,

    },
})

module.exports = mongoose.model('Complaint',complaintSchema)