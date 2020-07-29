const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const UserSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    username: {
        type: String,
        require:true 
    },
    password: {
        type: String,
        require:true 
    },
    token: {
        type: String
    }
})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel