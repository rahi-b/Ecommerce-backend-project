const express=require('express');
const router=express.Router();
const {signup,login,forgetPassword, verifyOtp, resetPassword,logout}=require('../controller/Authcontroller');


router.post('/register',signup);
router.post("/login",login);
router.post('/forgetpassword',forgetPassword);
router.post('/verifiedotp',verifyOtp);
router.post('/resetpassword',resetPassword);
router.post('/logout',logout);



module.exports=router;