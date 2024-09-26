
const adminhome=async(req,res)=>{
    try {
        res.render('admin/index');
    } catch (error) {
        console.error(error.message);
    }
}

module.exports={adminhome}