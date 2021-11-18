import db from "./db.database.js";
import { v4 as uuidv4 } from "uuid";

(() => {
  db.serialize(() => {
    db.run(
      `
      INSERT OR IGNORE INTO users(user_id,password,role,name,login) VALUES(
        ?, 
        ?,
        ?,
        ?,
        ?
        );
    `,
      [uuidv4(), "grillkorv", "admin", "Patrick", "admin"]
    );
    db.run(
      `
      INSERT OR IGNORE INTO products(product_id,name,price) VALUES(
        ?, 
        ?,
        ?
        );
    `,
      [uuidv4(), "Nike Shoes", 500]
    );
    db.run(
      `
      INSERT OR IGNORE INTO products(product_id,name,price) VALUES(
        ?, 
        ?,
        ?
        );
    `,
      [uuidv4(), "Nike Shoes", 500]
    );
    db.run(
      `
      INSERT OR IGNORE INTO user_product(product_id,user_login,amount) VALUES(
        ?, 
        ?,
        ?
        );
    `,
      [
        "bc35eed8-f5e2-4c95-be1a-964eeb0eee47",
        "2496abe9-cefd-4448-a451-5ffb10965f58",
        3,
      ]
    );
  });
  db.close();
})();
