import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./src/database/testing-and-jesting.db");

export const tableNames = {
  USERS: "users",
  PRODUCTS: "products",
  CART: "user_product",
};

export default db;
