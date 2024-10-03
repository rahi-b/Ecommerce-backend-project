const express=require('express');
const router=express.Router();
const {adminhome}=require('../controller/admin/adminctrl')
const {categorypage,addCategories,editCategories,deleteCategories,editCategorypage}=require('../controller/admin/categoryctrl');
const {AddproductPage,AddProduct,editproductPage,editProduct,deleteProduct}=require('../controller/admin/productctrl');
const {usersPage,blockUser,unblockUser}=require('../controller/admin/usersctrl');
const {getOrders}=require('../controller/admin/ordersctrl');
const upload=require('../middlware/upload');

router.get('/admin-home',adminhome);
router.get('/category',categorypage);
router.get('/category/edit/:id',editCategorypage);

router.get('/addproduct',AddproductPage)
router.get('/product/edit/:id',editproductPage)

router.get('/users',usersPage);

router.get('/orders',getOrders);

router.post('/addcategories',upload.single('image'),addCategories);
router.post('/categories/edit/:id',upload.single('image'),editCategories)
router.post('/categories/delete/:id',deleteCategories);

router.post('/addproducts',upload.single('image'),AddProduct)
router.post('/product/edit/:id',upload.single('image'),editProduct)
router.post('/product/delete/:id',deleteProduct)

router.post('/block-user/:id',blockUser)
router.post('/unblock-user/:id',unblockUser);


module.exports=router;
