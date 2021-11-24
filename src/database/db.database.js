import { Sequelize } from "sequelize";
import { resolve, join } from "path";
import usersModel from "../models/users.models.js";
import productsModel from "../models/products.model.js";
import cartsModel from "../models/carts.model.js";

const dir = resolve("./src/database/");
const dbFilename = "testing-and-jesting.sqlite";

const sequelize = new Sequelize({
  host: "0,0,0,0",
  dialect: "sqlite",
  storage: join(dir, dbFilename),
  logging: false,
});

const UsersModel = usersModel(sequelize, Sequelize);
const ProductsModel = productsModel(sequelize, Sequelize);
const CartsModel = cartsModel(sequelize, Sequelize);

UsersModel.belongsToMany(ProductsModel, {
  through: CartsModel,
  foreignKey: "user_id",
});
ProductsModel.belongsToMany(UsersModel, {
  through: CartsModel,
  foreignKey: "product_id",
});

const init = async (sequelize, force) => {
  try {
    await sequelize.sync({ force });
    console.log("db synced");
  } catch (e) {
    console.log(e);
  }
};

export default {
  sequelize,
  UsersModel,
  ProductsModel,
  CartsModel,
  sync: init,
};
