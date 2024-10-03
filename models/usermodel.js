const mongoose = require('mongoose'); // Erase if already required
const bcrypt=require('bcrypt');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    is_blocked:{
        type:Boolean,
        required:true,
        default:false
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('User', userSchema);