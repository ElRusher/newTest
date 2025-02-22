module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: DataTypes.INTEGER,
    items: DataTypes.STRING,
    status: DataTypes.STRING,
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'userId', as: 'User' }); // Relação com User
  };

  return Order;
};