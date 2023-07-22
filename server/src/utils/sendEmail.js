const nodemailer = require('nodemailer');

const sendEmail=async(email,otp)=>{

    const transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",//elastic servername
        port: 2525,//elastic port
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'poojansakhreliya007@gmail.com',  //elastic username
            pass: '79D03683F5F0E42FE26FE5ED8D6F634F4F2C'//elastic password
        }

    });

    const info = await transporter.sendMail({
        from: 'poojansakhreliya007@gmail.com',
        to: `${email}`,
        subject: 'Sending Email for authentication',
        text: `For authetication Otp is : ${otp}`
    })

    console.log(info);
}
module.exports={
    sendEmail
}