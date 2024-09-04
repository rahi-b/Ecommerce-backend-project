const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

var adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

}); 

adminSchema.pre('save',async function(req,res){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt);
})


module.exports= mongoose.model('Admin',adminSchema);