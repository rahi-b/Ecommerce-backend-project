const Product=require('../../models/productModel');
const Cart=require('../../models/cartModel');


const getCheckout=async(req,res)=>{

    try {
        const userId=req.session.userId;

        if(!userId){
            return res.status(404).json({success:false,message:'User is not logged in'});
        }
        console.log('user is',userId);
        const cart=await Cart.findOne({user:userId}).populate('products.productId')
        if(!cart){
            return res.status(404).json({success:false,message:'Cart is not found'});
        }

        let grandTotal=0;
        cart.products.forEach(product=>{
            const productPrice=parseFloat(product.productId.price.replace(/,/g, '')) || 0;
            const productQuantity=parseInt(product.quantity) || 0;
            const productTotal=productPrice* productQuantity;

            grandTotal+=productTotal;
        })
        console.log('Grand total is:',grandTotal);
        res.render('user/checkout',{cart,grandTotal});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
}

module.exports={getCheckout};