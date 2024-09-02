
const homepage=(req,res)=>{
    res.render('index');
}
const homepage2=(req,res)=>{
    res.render('home-02');
}
const homepage3=(req,res)=>{
    res.render('home-03');
}
const shop=(req,res)=>{
    res.render('product');
}
const productdetail=(req,res)=>{
    res.render('product-detail')
}
const features=(req,res)=>{
    res.render('shoping-cart');
}
const blog=(req,res)=>{
    res.render('blog');
}
const blogdetail=(req,res)=>{
    res.render('blog-detail');
}
const about=(req,res)=>{
    res.render('about');
}
const contact=(req,res)=>{
    res.render('contact');
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
module.exports={homepage,homepage2,homepage3,shop,features,blog,about,contact,signup,forgotten,otpverfication,resetPassword,productdetail,blogdetail};

