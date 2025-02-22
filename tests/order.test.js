require('dotenv').config({ path: '.env.test' }); // Carregar variáveis de ambiente para testes
const request = require('supertest');
const app = require('../src/index'); // Importar o servidor Express
const { Order, User } = require('../models');

describe('Order Routes', () => {
  let token;
  let userId;

  beforeAll(async () => {
    // Sincronizar o banco de dados antes dos testes
    await require('../models/index').sequelize.sync({ force: true });

    // Criar um usuário para os testes
    const user = await User.create({
      name: 'Test User',
      email: 'test.user@example.com',
      password: 'password123',
    });
    userId = user.id;

    // Fazer login para obter o token JWT
    const response = await request(app).post('/api/auth/login').send({
      email: 'test.user@example.com',
      password: 'password123',
    });
    token = response.body.token;
  });

  afterAll(async () => {
    // Limpar o banco de dados após os testes
    await Order.destroy({ where: {} });
    await User.destroy({ where: {} });
  });

  it('should create a new order', async () => {
    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId,
        items: 'Pizza, Coke',
        status: 'pending',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Order created successfully');
    expect(response.body.order.items).toBe('Pizza, Coke');
  });

  it('should fetch all orders', async () => {
    const response = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.orders)).toBe(true);
  });

  it('should update an order', async () => {
    const order = await Order.create({
      userId,
      items: 'Burger, Fries',
      status: 'pending',
    });

    const response = await request(app)
      .put(`/api/orders/${order.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: 'Updated Items',
        status: 'completed',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Order updated successfully');
    expect(response.body.order.items).toBe('Updated Items');
  });

  it('should delete an order', async () => {
    const order = await Order.create({
      userId,
      items: 'Sushi',
      status: 'pending',
    });

    const response = await request(app)
      .delete(`/api/orders/${order.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Order deleted successfully');
  });
});