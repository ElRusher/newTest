const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Rota para registro
router.post('/register', authController.register);

// Rota para login
router.post('/login', authController.login);

module.exports = router;