const User = require("../models/usermodel");
const jwt =require('jsonwebtoken');
const asyncHandler = require("async-handler");
const sendEmail=require('../utilities/sendemails');

const createUser = async (req, res) => {
  try {
    const { name , email  , password , mobile} = req.body;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      //create new user
      newUser = await User.create(req.body); 
      res.status(200).redirect('/');
    } else {
      //user already have message
      res.status(404).redirect('/signup');
    }
  } catch (err) {
    //server error
    console.error(err);
    res.status(500).json({ success: false, message: "interval server error" });
  }
};

let login = async (req, res) => {
  try {
    //finding registed user
    const { email, password } = req.body;
    finduser = await User.findOne({ email: email, password: password });
    if (finduser) {
      //session creation
      req.session.email = finduser.email;
      res.status(200).json({success:true, message:"successfully"});
    } else {
      res.status(200).json({success:false,message:"invalid username"});
    }
  } catch (err) {
    //server error passing
    console.error(err);
    res.status(500).json({ message: "interval server error" });
  }
};

//forget password method

const forgetPassword=async(req,res)=>{
  try{
    // console.log(req.body)
    const {email} =req.body;
    //find the user by email
    const findUser=await User.findOne({email:email});
    if(!findUser){
      return res.status(404).json({success : false , message:"user not found"})
    }
    //Generate webtoken
    const resetToken=jwt.sign({id:findUser?._id},process.env.JWT_SECRET,{expiresIn:'30m'})
    //construct the reset url
    const resetUrl=`http://yourfrontend.com/passwordreset/${resetToken}`;
    const message=`You requested password reset please click the link below to reset your password: \n\n${resetUrl}`;
    
    const otp=Math.floor(Math.random()*1000000);
    req.session.otp=otp;
    //send the mail
    await sendEmail({
      email,
      subject:"Password reset request",
      message:`your password changing process your otp is :${otp}`
      
    });
    // console.log(req.body)
    res.status(200).json({success  :true , message:"password reset message send your email"});
  }catch(error){
    console.error(error.message);
    res.status(500).json({success : false ,  message: "internal server error" });
}

}

const verifyOtp = (req , res) => {
  try {

    const {otp: userOtp} = req.body;
    const {otp}  = req.session;

    if(!otp){
      return res.status(400).json({success:false, message:"OTP is not found or Expired"});
    }
    if(userOtp === otp.toString()){
      res.status(200).json({success : true , message : "succesfully verified"})
    }else{
      
      res.status(200).json({success : false , message : " verification failed"})
    }
  } catch (error) {
    console.error(error);
  }
}

const resetPassword=async (req,res)=>{
  try {
    
    const {token, newpassword}=req.body;

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const userId=decoded.id;

    const user=await User.findById(userId);

    if(!user){
      return res.status(404).json({success:false, message:"user not found"});
    }

    const hashPassword=await bcrypt.hash(newpassword,10);

    user.password=hashPassword;
    // await user.save();

    res.status(200).json({success:true, message:"your password reset is successfully"});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({success:false, message:"Internal server error"});
  }

}



module.exports = { createUser, login,forgetPassword , verifyOtp};
