import db from "./db.database.js";

export const up = () => {
  db.serialize(() => {
    db.run("PRAGMA foreign_keys = ON;");
    db.run(
      `
    CREATE TABLE IF NOT EXISTS users (
      user_id STRING PRIMARY KEY,
      password STRING, 
      role VARCHAR(10), 
      name VARCHAR(50),
      login VARCHAR(50) UNIQUE
      );
      `
    );
    db.run(
      `
    CREATE TABLE IF NOT EXISTS products (
      product_id STRING PRIMARY KEY,
      name VARCHAR(50) UNIQUE,
      price REAL
      );
      `
    );
    db.run(
      `
    CREATE TABLE IF NOT EXISTS user_product (
      user_login String,
      product_id String,
      amount INT,
      FOREIGN KEY(user_login) REFERENCES users(login),
      FOREIGN KEY(product_id) REFERENCES products(product_id)
      );
      `
    );
    db.close();
  });
};

up();
