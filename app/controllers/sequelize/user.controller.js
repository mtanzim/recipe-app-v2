const Models  = require('../../models/sequelize');

let client = null;
let models = null;

function create(user) {
  return models.User.create({
    email: user.email,
    username: user.username,
  });
};

function getAll() {
  return models.User.findAll();
};
/* 
  return Promise.all(items.map(async (item) => {
    const orderItem = await models.OrderItem.create({
      sku: item.sku,
      qty: item.quantity,
      price: item.price,
      name: item.name,
    });

    return order.addOrderItem(orderItem, { transaction: t });

  })); */



module.exports = (_client) => {
  models = Models(_client);
  client = _client;
  return {
    create,
    getAll,
  };
};