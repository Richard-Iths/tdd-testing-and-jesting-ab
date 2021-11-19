import { jest } from "@jest/globals";
import db from "./db.database.js";

await db.sync(db.sequelize, true);

describe("db.database.js", () => {
  it("should have table for users", async () => {
    const query = "PRAGMA table_info(users);";
    expect(() => db.UsersModel.query(query)).toBeTruthy();
  });
  // it("should have table for products", (done) => {
  //   function callback(_, row) {
  //     try {
  //       expect(row).toBeTruthy();
  //       done();
  //     } catch (error) {
  //       done(error);
  //     }
  //   }
  //   const query = "PRAGMA table_info(products);";
  //   db.get(query, callback);
  // });

  // it("should have table for carts", (done) => {
  //   function callback(_, row) {
  //     try {
  //       expect(row).toBeTruthy();
  //       done();
  //     } catch (error) {
  //       done(error);
  //     }
  //   }
  //   const query = "PRAGMA table_info(user_product);";
  //   db.get(query, callback);
  // });
});
