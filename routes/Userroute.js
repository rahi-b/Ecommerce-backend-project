const express=require('express');
const route=express.Router();
const {addtoCart,getCart}=require('../controller/user/cartctrl');
const {homepage,homepage2,homepage3,shop,blog,about,
    contact,signup,forgotten,otpverfication,resetPassword,
    productdetail,blogdetail,productSearch}=require('../controller/homectrl');


route.get('/',homepage)
route.get('/homepage-2',homepage2)
route.get('/homepage-3',homepage3)
route.get('/shop',shop)
route.get('/product-detail',productdetail)
route.get('/blog',blog)
route.get('/blog-detail',blogdetail)
route.get('/about',about)
route.get('/contact',contact)
route.get('/signup',signup)
route.get('/forgotten',forgotten)
route.get('/otpverification',otpverfication)
route.get('/resetpassword',resetPassword)
route.get('/searchproduct',productSearch)
route.get('/cart',getCart);


route.post('/addtocart',addtoCart);



module.exports=route;
