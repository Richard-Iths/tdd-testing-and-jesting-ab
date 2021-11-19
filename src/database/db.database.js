import { Sequelize } from "sequelize";
import { resolve, join } from "path";
import usersModel from "../models/users.models.js";

const dir = resolve("./src/database/");
const dbFilename = "testing-and-jesting.sqlite";

const sequelize = new Sequelize({
  host: "0,0,0,0",
  dialect: "sqlite",
  storage: join(dir, dbFilename),
  logging: false,
  
});

const UsersModel = usersModel(sequelize, Sequelize);

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
  sync: init,
};