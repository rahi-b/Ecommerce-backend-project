const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:false, //optional description field
    },
    image:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model('category',categorySchema);