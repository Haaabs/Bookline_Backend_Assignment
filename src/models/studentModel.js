const mongoose = require('mongoose')

//creating student schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true
    },
    photo: {
        img: {type: String} 
    },
    createdAt: Date,
    updatedAt: Date
}, {timeStamp: true})

//creating student model
const student = mongoose.model('Student', studentSchema)
module.exports = student