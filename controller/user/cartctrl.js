const Cart=require('../../models/cartModel')
const Product=require('../../models/productModel');

const addtoCart=async(req,res)=>{
    try {
        const UserId=req.session.userId;
       const{productId,quantity}=req.body;

       console.log('quantity is',quantity)
        const product=await Product.findById(productId);
        if(!product){
            return res.status(404).json({success:false,message:'Product is not found'});
        }

        let cart=await Cart.findOne({user:UserId});

        if(!cart){
            cart=new Cart({user:UserId,products:[]});
        }

        const productIndex=cart.products.findIndex(p=>p.productId.toString()===productId);
        if(productIndex > -1){
            cart.products[productIndex].quantity+=quantity;
        }else{
            cart.products.push({
                productId:product._id,
                name:product.name,
                price:product.price,
                quantity
            })
        }
        await cart.save();
        return res.status(200).json({success:true,message:'Product added to cart',cart})

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
};

const getCart=async(req,res)=>{
    try {
        const userId=req.session.userId;

        if(!userId){
            return res.status(400).json({success:false,message:'User is not logged in'});
        }

        let cart=await Cart.findOne({user:userId,}).populate('products.productId');
        if(!cart){
             return res.status(404).json({success:false,message:'Cart is not found'});
        }
        res.render('user/shoping-cart',{cart});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({success:true,message:'Internal server error'});
    }
}

const cartUpdateQuantity=async(req,res)=>{
    try {
        const userId=req.session.userId;
        const {productId,quantity}=req.body;

        const cartItem=await Cart.findOne({user:userId, "products.productId":productId});

        if(!cartItem){
            console.error(`No cart for found user: ${userId} with product:${productId}`);
            return res.status(404).json({success:false,message:'Product not found in cart'});
        }

       const result= await Cart.updateOne(
            {user:userId,"products.productId":productId},
            {$set:{"products.$.quantity":quantity}}
        );
        if(result.nModified > 0){
            return res.status(200).json({success:true,message:'Quantity updating success'});
        }else{
            return res.status(400).json({success:false,message:'Product not found quantity unchanged'});
        }
      
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
}

const removeCart=async(req,res)=>{
    try {
        const userId=req.session.userId;
        const { productId }=req.body;

        let cart=await Cart.findOne({user:userId});

        if(cart){
            cart.products=cart.products.filter(p=>p.productId.toString()!== productId);

            await cart.save();
            return res.status(200).json({success:true,message:'Product removed from cart successfull',cart});
        }else{
            return res.status(404).json({success:false,message:'Cart is not found'});
        }
    } catch (error) {
        console.error('Error',error.message);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
}

const clearCart=async(req,res)=>{
    try {
        const userId=req.session.userId;
        
        const cart =await Cart.findOne({user:userId});

        if(cart){
            cart.products=[];
            await cart.save();

            return res.status(200).json({success:true,message:'All product removed from cart'});
        }else{
            return res.status(404).json({success:false,message:'Cart not found'});
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({success:false,message:'Internal server error'});
    }
}
module.exports= {addtoCart,getCart,removeCart,clearCart,cartUpdateQuantity};