const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//creating student schema
const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        trim: true
    },
    hashPassword: {
        type: String,
        required: true,
        minLength: 8,
        minLength: 15
    },
    createdAt: Date,
}, {timeStamp: true})

//creating virtual property getter function--here salt=10 is strength of password
userSchema.virtual('password').set(function(password){
    this.hashPassword = bcrypt.hashSync(password, 10)
})

userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hashPassword)
    }
}

//creating student model
const user = mongoose.model('User', userSchema)
module.exports = user