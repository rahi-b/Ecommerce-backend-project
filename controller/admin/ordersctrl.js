const Order=require('../../models/orders');

const getOrders=async(req,res)=>{
    try {
        const orders=await Order.find().populate('user').populate('product');
        res.render('admin/orders',{orders:orders});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false, message:'Internal server error'});
    }
}

module.exports={getOrders};