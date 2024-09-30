const Users=require('../../models/usermodel');

const usersPage=async(req,res)=>{
    try {
        const users=await Users.find();
        res.render('admin/users',{users})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false,message:'Internal Server error'});
    }
  
}

const blockUser=async(req,res)=>{
    try {
        const userId=req.params.id;
        const user=await Users.findById(userId);

        if(user){
            if(!user.is_blocked){
                user.is_blocked=true;
                await user.save();
            }
            res.redirect('/api/admin/users')
        }else{
            res.status(404).json({success:false, message:'User not found'});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false, message:'Internal server error'});
    }
}

const unblockUser=async(req,res)=>{
    try {
        const userId=req.params.id;
        const user=await Users.findById(userId);

        if(user){
            if(user.is_blocked){
                user.is_blocked=false;
                await user.save();
            }
            res.redirect('/api/admin/users');
        }else{
            res.status(404).json({success:false, message:'User not found'});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false, message:'Internal server error'});
    }
}

module.exports={usersPage,blockUser,unblockUser};