const User = require("../models/usermodel");
const jwt =require('jsonwebtoken');
const sendEmail=require('../utilities/sendemails');
const bcrypt=require('bcrypt');

const signup = async (req, res) => {
  try {
    const { name , email  , password , mobile} = req.body;

    const findUser = await User.findOne({ email: email });


    if (!findUser) {

      const hashedpassword=await bcrypt.hash(password,10);

      const newUser= await User.create({name:name,email:email,mobile:mobile,password:hashedpassword, isAdmin : false})

      if(newUser.isAdmin){
        res.status(200).redirect('/admin-home');
      }else{
        res.status(200).redirect('/');
      }
      
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



    if(!email || !password){
      return res.status(400).json({success:false,message:"Missing email or password"});
    }

    const findUser = await User.findOne({ email: email});
    if (!findUser){
      return res.status(401).json({success:false,message:"Invalid email or password"});
    }
      //session creation
      const isMatch=await bcrypt.compare(password,findUser.password)
      if(!isMatch){
        return res.status(401).json({success:false,message:"Invalid email or password"});
      }
        req.session.email = findUser.email;

        if(findUser.isAdmin){
         return res.status(200).json({success:true, message:"Admin login successfully", redirectUrl:"/admin-home" });
        }
        else{
         return res.status(200).json({success:true, message:"User login successfully", redirectUrl:"/" });
        }
  } catch (err) {
    //server error passing
    res.status(500).json({ message: "interval server error" });
  }
};

//forget password method

const forgetPassword=async(req,res)=>{
  try{
    // console.log(req.body)
    const {email} =req.body;
    //find the user by email
    req.session.email=email;
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
    
    const {newpassword, confirmpassword}=req.body;

    console.log(newpassword, confirmpassword);

    const email =req.session.email;

    if(!email){
      return res.status(400).json({success:false,message:"No email found in session"});
    }

    if( newpassword  !== confirmpassword){
      return res.status(400).json({success:false ,message:'password do not match'});
    }
    const user=await User.findOne({email:email});

    if(!user){
      return res.status(404).json({success:false, message:"user not found"});
    }

    const hashPassword=await bcrypt.hash(newpassword,10);

    user.password=hashPassword;
    await user.save();

    res.status(200).json({success:true, message:"your password reset is successfully"});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }

}



module.exports = { signup, login,forgetPassword , verifyOtp, resetPassword};
