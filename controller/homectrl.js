const homepage=(req,res)=>{
    res.render('user/index');
}
const homepage2=(req,res)=>{
    res.render('user/home-02');
}
const homepage3=(req,res)=>{
    res.render('user/home-03');
}
const shop=(req,res)=>{
    res.render('user/product');
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


