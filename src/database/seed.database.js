import db from "./db.database.js";

const users = [
  { username: "barfooz", isAdmin: true },
  { username: "foo", isAdmin: true },
  { username: "bar", isAdmin: false },
](async () => {
  db.sync(db.sequelize, false);
})();
