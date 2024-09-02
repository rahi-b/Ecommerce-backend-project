const express=require('express');
const router=express.Router();
const {createUser,login,forgetPassword, verifyOtp, resetPassword}=require('../controller/userctrl');


router.post('/register',createUser);
router.post("/login",login);
router.post('/forgetpassword',forgetPassword);
router.post('/verifiedotp',verifyOtp);
router.post('/resetpassword',resetPassword);



module.exports=router;