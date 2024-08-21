
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
const features=(req,res)=>{
    res.render('product-details');
}
const blog=(req,res)=>{
    res.render('blog');
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
module.exports={homepage,homepage2,homepage3,shop,features,blog,about,contact,signup};

