const nodemailer=require('nodemailer');

const sendEmail=async({email,subject,message})=>{
    try {
        console.log(email , subject , message)
        const transporter=nodemailer.createTransport({
            service:'Gmail',//or other any email services
            auth:{
                user:process.env.EMAIL_USER,//your email
                pass:process.env.EMAIL_PASSWORD,//your password
    
            }
        })
        const mailoptions={
            from:process.env.EMAIL_USER,
            to:email,
            subject:subject,
            text:message
        }
        await transporter.sendMail(mailoptions);
    } catch (error) {
        console.log(error.message)
    }
    
    
};

module.exports=sendEmail;