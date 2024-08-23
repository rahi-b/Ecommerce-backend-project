const express=require('express');
const router=express.Router();
const {createUser,login,forgetPassword}=require('../controller/userctrl');


router.post('/register',createUser);
router.post("/login",login);
router.post('/forgetpassword',forgetPassword);



module.exports=router;