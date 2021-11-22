export default (sequelize, Sequelize) => {
  const carts = sequelize.define("Cart", {
    amount: {
      type: Sequelize.NUMBER,
    },
  });

  return carts;
};
