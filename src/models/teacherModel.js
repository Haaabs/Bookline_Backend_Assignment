const mongoose = require('mongoose')

//creating student schema
const teacherSchema = new mongoose.Schema({
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
    subject: {
        type: String,
        required: true,
        trim: true
    },
    startDate: { type: Date },
    endDate: { type: Date },
    createdAt: Date,
    updatedAt: Date
}, {timeStamp: true})

//creating teacher model
const teacher = mongoose.model('Teacher', teacherSchema)
module.exports = teacher