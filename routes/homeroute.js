const express=require('express');
const route=express.Router();

const {homepage,homepage2,homepage3,shop,features,blog,about,contact,signup,forgotten,otpverfication,resetPassword,productdetail,blogdetail}=require('../controller/homectrl');
const{adminhome,category}=require('../controller/homectrl');

route.get('/',homepage)
route.get('/homepage-2',homepage2)
route.get('/homepage-3',homepage3)
route.get('/shop',shop)
route.get('/features',features)
route.get('/product-detail',productdetail)
route.get('/blog',blog)
route.get('/blog-detail',blogdetail)
route.get('/about',about)
route.get('/contact',contact)
route.get('/signup',signup)
route.get('/forgotten',forgotten);
route.get('/otpverification',otpverfication)
route.get('/resetpassword',resetPassword);

route.get('/admin-home',adminhome);
route.get('/category',category)

module.exports=route;
