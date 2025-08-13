const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendEmail } = require('../utils/email');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const {
            nombre,
            apellido_paterno,
            apellido_materno,
            email,
            password,
            telefono,
            direcciones,
        } = req.body;

        const existe = await Usuario.findOne({ where: { email } });
        if (existe) {
            return res.status(400).json({ error: 'Email ya registrado' });
        }

        const hash = await bcrypt.hash(password, 10);
        const nuevoUsuario = await Usuario.create({
            nombre,
            apellido_paterno,
            apellido_materno,
            email,
            password_hash: hash,
            telefono,
            direcciones,
        });

        res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).json({
            error: 'Error en el registro',
            detalle: error.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });
        
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const valido = await bcrypt.compare(password, usuario.password_hash);
        if (!valido) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        await usuario.update({ ultima_conexion: new Date() });
        res.json({ token });
    } catch (error) {
        res.status(500).json({
            error: 'Error al iniciar sesión',
            detalle: error.message,
        });
    }
};

const me = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.usuario.id_usuario, {
            attributes: { exclude: ['password_hash'] }
        });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener datos del perfil',
            detalle: error.message,
        });
    }
};

const solicitarRecuperacion = async (req, res) => {
    try {
        const { email } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 3600000); // 1 hora de duración

        await usuario.update({
            reset_token: token,
            reset_token_expires: expires,
        });

        const mailOptions = {
            subject: 'Recuperación de Contraseña',
            text: `Para restablecer tu contraseña, haz clic en este enlace:\n\n` +
                  `${process.env.FRONTEND_URL}/restablecer-contrasena/${token}\n\n` +
                  `El enlace expirará en una hora.`
        };

        const emailEnviado = await sendEmail(email, mailOptions.subject, mailOptions.text);
        
        if (emailEnviado) {
            res.json({ mensaje: 'Se ha enviado un correo para restablecer tu contraseña' });
        } else {
            res.status(500).json({ error: 'Error al enviar el correo' });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Error al generar token de recuperación',
            detalle: error.message,
        });
    }
};

const restablecerContrasena = async (req, res) => {
    try {
        const { token, nuevaContrasena } = req.body;
        const usuario = await Usuario.findOne({
            where: {
                reset_token: token,
                reset_token_expires: { [require('sequelize').Op.gt]: new Date() },
            },
        });

        if (!usuario) {
            return res.status(400).json({ error: 'Token inválido o expirado' });
        }

        const nuevoHash = await bcrypt.hash(nuevaContrasena, 10);
        await usuario.update({
            password_hash: nuevoHash,
            reset_token: null,
            reset_token_expires: null,
        });

        res.json({ mensaje: 'Contraseña actualizada correctamente' });
    } catch (error) {
        res.status(500).json({
            error: 'Error al restablecer contraseña',
            detalle: error.message,
        });
    }
};

module.exports = { register, login, me, solicitarRecuperacion, restablecerContrasena };