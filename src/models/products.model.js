export default (sequelize, Sequelize) => {
  const product = sequelize.define("Product", {
    product_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      required: true,
    },
    price: {
      type: Sequelize.NUMBER,
      required: true,
    },
  });

  return product;
};
