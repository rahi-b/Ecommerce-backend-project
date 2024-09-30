const Product=require('../../models/productModel');
const Category=require('../../models/category');

const AddproductPage=async(req,res)=>{
    try {
        const products=await Product.find();
        const categories=await Category.find();
        res.render('admin/products',{products,categories})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({success:false, message:'Internal server error'});
    }
   
}

const editproductPage=async(req,res)=>{
    try {
        const productId=req.params.id;
        const product=await Product.findById(productId).populate('category');
        const categories=await Category.find(); 
        if(!product){
            res.status(404).json({success:false,message:'Internal Server error'});
        }
        res.render('admin/editProduct',{product,categories})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false, message:'Internal server error'});
    }
}

const AddProduct=async(req,res)=>{
    try {
        const{name,description,brand,price,category,quantity,color}=req.body;
        const image=req.file?req.file.filename:'';

        if(!name || !image){
            res.status(400).json({success:false,message:'Name and image is not required'});
        }

        const newProduct= new Product({
            name,
            description,
            brand:Array.isArray(brand)?brand.join(','):brand,
            price,
            image,
            category,
            quantity,
            color
        })
        await newProduct.save();
        res.redirect('/api/admin/addproduct')
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false,message:'Internal Server error'});
    }
}

const editProduct=async(req,res)=>{
    try {
        const productId=req.params.id;
        const{name,description,brand,price,category,quantity,color}=req.body;
        console.log(name,description,brand,price,category,quantity,color)
        const image=req.file?req.file.filename:req.body.currentImage;

        const newProducts=await Product.findByIdAndUpdate(productId,{
            name,
            description,
            brand:Array.isArray(brand)?brand.join(','):brand,
            price,
            image,
            category,
            quantity,
            color
        })
        await newProducts.save();
        res.redirect('/api/admin/addproduct')
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false, message:'Internal server error'});
    }

}    

const deleteProduct=async(req,res)=>{
    try {
        const productId=req.params.id;
        await Product.findByIdAndDelete(productId);
        res.redirect('/api/admin/addproduct');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false,message:'Internal Server error'});
    }
}

module.exports={AddproductPage,AddProduct,editproductPage,editProduct,deleteProduct};