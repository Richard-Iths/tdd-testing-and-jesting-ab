import { Sequelize } from "sequelize";
import { resolve, join } from "path";
import usersModel from "../models/users.models.js";

const dir = resolve("./src/database/");
const dbFilename = "testing-and-jesting.sqlite";

const sequelize = new Sequelize({
  host: "0,0,0,0",
  dialect: "sqlite",
  storage: join(dir, dbFilename),
});

const UsersModel = usersModel(sequelize, Sequelize);

const init = async (sequelize) => {
  try {
    await sequelize.sync({force:true});
    console.log("db synced");
  } catch (e) {
    console.log(e);
  }
};
await init(sequelize);

export default {
  db: sequelize,
  UsersModel,
};
