export default (sequelize, Sequelize) => {
  const carts = sequelize.define("Cart", {
    user_id: {
      type: Sequelize.UUID,
      references: "Users",
      referencesKey: "user_id",
    },
    products_id: {
      type: Sequelize.UUID,
      references: "Products",
      referencesKey: "product_id",
    },
    amount: {
      type: Sequelize.NUMBER,
    },
  });

  return carts;
};
