const Cart=require('../../models/cartModel')
const Product=require('../../models/productModel');

const addtoCart=async(req,res)=>{
    try {
        const UserId=req.session.userId;
       const{productId,quantity}=req.body;

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

module.exports= {addtoCart}