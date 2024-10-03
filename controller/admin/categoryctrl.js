const category=require('../../models/category');


const categorypage=async(req,res)=>{
    try {
        const categories=await category.find();
        res.render('admin/category',{categories});
    } catch (error) {
        console.error(error.message)
    }
    
}

const editCategorypage=async(req,res)=>{
    try {
        const categoryId=req.params.id;
        const categories= await category.findById(categoryId);
        if(!categories){
            res.status(404).json({success:false,message:'Category not found'})
        }
        res.render('admin/editCategory',{category: categories});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false,message:'Internal Server error'});
    }
}

const addCategories= async(req,res)=>{
    try {
        const {name,description}= req.body;
        const image=req.file?req.file.filename:'';
        console.log(name,description,image);

        if(!image || !name){
            res.status(404).json({success:false, message:'Image and categoryname is not found'});
        }

        const newCategory=new category({
            name:name,
            description:description,
            image:image,
        })
        await newCategory.save();
        res.redirect('/api/admin/category');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false,message:'Internal Server'});
    }
}

const editCategories=async(req,res)=>{
    try {
        const categoryId=req.params.id;
        const {name,description}=req.body;
        const image=req.file?req.file.filename:req.body.currentImage;

        await category.findByIdAndUpdate(categoryId,{
            name,
            description,
            image
        })
        res.redirect('/api/admin/category');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false,message:'Internal server error'});
    }
}

const deleteCategories=async(req,res)=>{
    try {
        const categoryId=req.params.id;
        await category.findByIdAndDelete(categoryId);
        res.redirect('/api/admin/category');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false,message:'Internal server error'});
    }
}

module.exports={categorypage,addCategories,editCategories,deleteCategories,editCategorypage};