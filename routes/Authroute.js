const express=require('express');
const router=express.Router();
const {createUser,login,forgetPassword, verifyOtp}=require('../controller/userctrl');


router.post('/register',createUser);
router.post("/login",login);
router.post('/forgetpassword',forgetPassword);
router.post('/verifiedotp',verifyOtp)



module.exports=router;