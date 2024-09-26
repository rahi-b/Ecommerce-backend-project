const express=require('express');
const router=express.Router();
const {adminhome}=require('../controller/admin/adminctrl')
const {categorypage,addCategories,editCategories,deleteCategories,editCategorypage}=require('../controller/admin/categoryctrl');
const {AddproductPage,AddProduct,editproductPage,editProduct}=require('../controller/admin/productctrl');
const upload=require('../middlware/upload');

router.get('/admin-home',adminhome);
router.get('/category',categorypage);
router.get('/category/edit/:id',editCategorypage);

router.get('/addproduct',AddproductPage)
router.get('/product/edit/:id',editproductPage)

router.post('/addcategories',upload.single('image'),addCategories);
router.post('/categories/edit/:id',upload.single('image'),editCategories)
router.post('/categories/delete/:id',deleteCategories);

router.post('/addproducts',upload.single('image'),AddProduct)
router.post('/product/edit/:id',upload.single('image'),editProduct)

module.exports=router;
