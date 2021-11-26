import db from "./db.database.js";

const users = [
  { login: "admin", role: "admin", password: "grillkorv", name: "admin" },
  { login: "SquarePants", password: "grillkorv", name: "Sponge Bob" },
  { login: "test", password: "test", name: "test" },
];
const products = [
  { name: "Broken shoes", price: 5000 },
  { name: "Bottle of wine", price: 30 },
  { name: "Jeans Jacket", price: 430 },
  { name: "Lottery ticket", price: 30 },
  { name: "Walker", price: 1500 },
];
(async () => {
  try {
    await db.sync(db.sequelize, true);
    await db.UsersModel.bulkCreate(users, { individualHooks: true });
    await db.ProductsModel.bulkCreate(products);
  } catch (error) {
    console.log(error);
  }
})();
