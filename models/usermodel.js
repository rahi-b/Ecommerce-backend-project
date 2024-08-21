const mongoose = require('mongoose'); // Erase if already required
const bcrypt=require('bcrypt');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
});

userSchema.pre('save',async function(req,res) {
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});

//Export the model
module.exports = mongoose.model('User', userSchema);