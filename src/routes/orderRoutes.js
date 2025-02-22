const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Rota para criar um pedido
router.post('/orders', orderController.createOrder);

// Rota para listar todos os pedidos
router.get('/orders', orderController.getOrders);

// Rota para atualizar um pedido
router.put('/orders/:id', orderController.updateOrder);

// Rota para excluir um pedido
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;