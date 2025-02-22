require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Certifique-se de que este caminho está correto
const orderRoutes = require('./routes/orderRoutes'); // Certifique-se de que este caminho está correto

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('Server running on port 3000');
});

// Iniciar o servidor apenas se o arquivo for executado diretamente
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; // Exportar o app para uso nos testes