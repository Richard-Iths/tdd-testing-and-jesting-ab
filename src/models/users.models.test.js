import { jest } from "@jest/globals";
import db from "../database/db.database.js";

await db.sync(db.sequelize, true);

describe("user models", () => {
  it("should get users from users table", () => {
    expect(() => db.UsersModel.findAll()).not.toThrow();
  });

  it("should get a single user from users table", () => {
    expect(() => db.UsersModel.findOne()).not.toThrow();
  });

  it("should create user to users table", async () => {
    const expected = "alice";
    const orExpected = "username taken";
    try {
      const testData = {
        name: "alice",
        login: "admin",
        password: "grillkorv",
        role: "admin",
      };
      const actual = await db.UsersModel.create(testData);

      expect(actual.name).toStrictEqual(expected);
    } catch (error) {
      expect(error.message.toLowerCase().trim()).toStrictEqual(orExpected);
    }
  });

  it("should authenticate user", () => {
    expect(() =>
      db.UsersModel.authenticate("grillkorv", "admin")
    ).not.toThrow();
  });

  it("should throw error when wrong password is provided", async () => {
    try {
      await db.UsersModel.authenticate("wrong_password", "admin");
    } catch (error) {
      expect(error.message).toBeTruthy();
    }
  });

  it("should throw error when user is not found", async () => {
    try {
      await db.UsersModel.authenticate("grillkorv", "wrong_user");
    } catch (error) {
      expect(error.message).toBeTruthy();
    }
  });

  it("should update user to users table", async () => {
    const expected = "tom";
    expect(() =>
      db.UsersModel.update({ name: "tom" }, { where: { role: "admin" } })
    ).not.toThrow();
    const User = await db.UsersModel.findOne({ where: { name: "tom" } });
    expect(User.name).toBe(expected);
  });

  it("should delete user from users table", async () => {
    expect(() =>
      db.UsersModel.destroy({ where: { role: "admin" } })
    ).not.toThrow();
    const User = await db.UsersModel.findOne({ where: { name: "tom" } });
    expect(User).toBeFalsy();
  });
});
