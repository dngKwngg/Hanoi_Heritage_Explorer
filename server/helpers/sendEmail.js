
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');


const sendEmail = async (email, username, message, templatePath) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.email',
        secure: false,
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASS,
        },
    });




    const source = fs.readFileSync(templatePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        username: username,
        message: message
    };
    const htmlToSend = template(replacements);

    const info = await transporter.sendMail({
        from: 'HNHE',
        to: email,
        subject: 'Đặt lại mật khẩu ứng dụng Hanoi Heritage Explorer của bạn!',
        text: 'We sent a verification code.', // dont really need this
        html: htmlToSend
    });


    console.log('Message sent: %s', info.response);



};

module.exports = {
    sendEmail
};
