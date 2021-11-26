import db from "./db.database.js";

const users = [
  { login: "admin", role: "admin", password: "grillkorv", name: "admin" },
  { login: "SquarePants", password: "grillkorv", name: "Sponge Bob" },
  { login: "test", password: "test", name: "test" },
];

(async () => {
  try {
    await db.sync(db.sequelize, true);
    await db.UsersModel.bulkCreate(users, { individualHooks: true });
  } catch (error) {
    console.log(error);
  }
})();
