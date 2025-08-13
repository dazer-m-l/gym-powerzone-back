const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
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