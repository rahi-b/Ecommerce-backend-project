const mongoose=require('mongoose');

const ordersSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref
    }
})