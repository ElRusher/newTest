const { Order, User } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { userId, items, status } = req.body;

    // Validações
    if (!userId || !items || !status) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (!['pending', 'processing', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const order = await Order.create({ userId, items, status });
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: User, as: 'User', attributes: ['name'] }],
    });
    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { items, status } = req.body;

    // Validações
    if (!items || !status) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (!['pending', 'processing', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.update({ items, status });
    res.json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update order' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};