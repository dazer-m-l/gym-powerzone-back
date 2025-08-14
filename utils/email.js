const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('=== DEBUG EMAIL CONFIG ===');
console.log('EMAIL_ADDRESS:', process.env.EMAIL_ADDRESS);
console.log('EMAIL_PASSWORD length:', process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.length : 'undefined');
console.log('Todas las env vars:', Object.keys(process.env).filter(key => key.includes('EMAIL')));
console.log('===========================');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});
const sendEmail = async (email, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject,
            text
        });
        return true;
    } catch (error) {
        console.error('Error al enviar correo:', error);
        return false;
    }
};

module.exports = { sendEmail };