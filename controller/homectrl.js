const Category=require('../models/category');
const Product=require('../models/productModel');

const homepage=(req,res)=>{
    res.render('user/index');
}
const homepage2=(req,res)=>{
    res.render('user/home-02');
}
const homepage3=(req,res)=>{
    res.render('user/home-03');
}
const shop=async(req,res)=>{
    try {
        const categories=await Category.find();
        const products=await Product.find().populate('category');
        res.render('user/product',{categories,products});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false, message:'Internal server error'});
    }
}
const productdetail=(req,res)=>{
    res.render('user/product-detail')
}
const features=(req,res)=>{
    res.render('user/shoping-cart');
}
const blog=(req,res)=>{
    res.render('user/blog');
}
const blogdetail=(req,res)=>{
    res.render('user/blog-detail');
}
const about=(req,res)=>{
    res.render('user/about');
}
const contact=(req,res)=>{
    res.render('user/contact');
}
const signup=(req,res)=>{
    res.render('signup');
}
const forgotten=(req,res)=>{
    res.render('forgotten');
}
const otpverfication=(req,res)=>{
    res.render('otpverification');
}
const resetPassword=(req,res)=>{
    res.render('resetpassword');
}




module.exports={homepage,homepage2,homepage3,shop,features,blog,about,contact,signup,forgotten,otpverfication,resetPassword,
    productdetail,blogdetail};


