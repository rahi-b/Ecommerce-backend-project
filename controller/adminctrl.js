const Admin=require('../models/adminmodel');

const createAdmin=async(req,res)=>{
    try {
        const {name,email,mobile,password}=req.body;
        const findAdmin=await Admin.findOne({email:email});

        if(!findAdmin){
        //create new admin
        newAdmin= await Admin.create(req.body);
        res.status(200).json({success:true, message:"new admin successfully created"})
        }else{
            //user already have message
            res.status(404).json({success:false, message:"user already created"});
        }
    } catch (error) {
        //server error
        console.error(error.message);
        res.status(500).json({success:false,message:"Internal Server error"});
        
    }
};

const adminLogin=async(req,res)=>{
    try {
        //finding registered admin
        const {email,password}=req.body;
        const findAdmin=await Admin.findOne({email:email});
        if(findAdmin){
            req.session.email=findAdmin.email;
            res.status(200).json({success:true,message:"successfully login"});
        }else{
            res.status(200).json({success:false,message:"Invalid email"});
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:true,message:"Internal server error"});
    }
}

module.exports= {createAdmin,adminLogin}