const express=require('express');
const route=express.Router();

const {homepage,homepage2,homepage3,shop,features,blog,about,contact,signup,forgotten,otpverfication}=require('../controller/homectrl');

route.get('/',homepage)
route.get('/homepage-2',homepage2)
route.get('/homepage-3',homepage3)
route.get('/shop',shop)
route.get('/features',features)
route.get('/blog',blog)
route.get('/about',about)
route.get('/contact',contact)
route.get('/signup',signup)
route.get('/forgotten',forgotten);
route.get('/otpverification',otpverfication)

module.exports=route;
