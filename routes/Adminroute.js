const express=require('express');
const router=express.Router();
const {createAdmin,adminLogin}=require('../controller/adminctrl');

router.post('/register',createAdmin);
router.post('/login',adminLogin)

module.exports=router;