import supertest from "supertest";
import jwt from "jsonwebtoken";
import { jest } from "@jest/globals";
import server from "../server";
import db from "../database/db.database";

const request = supertest(server);
describe("user endpoints", () => {
  let token;
  beforeEach(() => {
    token = jwt.sign({ id: "e78f46de-6b6e-4c0c-8a88-dd460185869a" }, "secret");
    db.UsersModel.findByPk = jest.fn();
  });
  afterEach(() => {
    // server.close();
    jest.resetAllMocks();
  });

  it("should register a user", async () => {
    db.UsersModel.create = jest.fn();
    const expectedMessage = { data: { message: "success" } };

    try {
      const res = await request
        .post("/api/users")
        .send({ name: "test", login: "test", password: "test" });

      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(expectedMessage);
      expect(db.UsersModel.create).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("should throw an error if wrong args are passed with body", async () => {
    db.UsersModel.create = jest.fn();
    const expectedMessage = { data: { message: "invalid body provided" } };

    try {
      const res = await request
        .post("/api/users")
        .send({ name: "test", login: "test" });

      expect(res.status).toBe(400);

      expect(res.body).toStrictEqual(expectedMessage);
      expect(db.UsersModel.create).not.toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
  it("should get all user without password as an admin", async () => {
    const user = {
      user_id: "123131",
      login: "test",
    };
    const testData = [user];
    const expectMessage = { data: [{ user_id: "123131", login: "test" }] };
    db.UsersModel.findAll = jest.fn().mockReturnValue(testData);
    db.UsersModel.findByPk = jest.fn().mockReturnValue({ role: "admin" });

    try {
      const res = await request
        .get("/api/users")
        .set("Authorization", "Bearer " + token);
      expect(res.body).toStrictEqual(expectMessage);
      expect(res.status).toBe(200);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
  it("should return 500 when a user whom is not an admin requests all users", async () => {
    db.UsersModel.findByPk = jest.fn().mockReturnValue({ role: "user" });
    try {
      const res = await request
        .get("/api/users")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(500);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("should be able to login", async () => {
    const testData = { token: "skljadjakldjka" };
    const expectMessage = { data: { token: testData } };
    db.UsersModel.authenticate = jest.fn().mockReturnValue(testData);
    try {
      const res = await request
        .post("/api/users/login")
        .send({ login: "test", password: "grillkorv" });

      // console.log(res, "res");
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(expectMessage);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("should throw an error when mismatched passwords", async () => {
    db.UsersModel.authenticate = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    const expectMessage = {
      data: { message: "Something went wrong, please try again" },
    };
    try {
      const res = await request
        .post("/api/users/login")
        .send({ login: "test", password: "grillkorv" });

      // console.log(res, "res");
      expect(res.status).toBe(500);
      expect(res.body).toStrictEqual(expectMessage);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("Should return a invalid body exception when login and password is omitted", async () => {
    const expectMessage = {
      data: { message: "login and password is required" },
    };

    try {
      const res = await request
        .post("/api/users/login")
        .send({ login: "test" });

      // console.log(res, "res");
      expect(res.status).toBe(400);
      expect(res.body).toStrictEqual(expectMessage);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
  it("should get own profile without password field", async () => {
    const testData = {
      login: "test",
      role: "user",
      name: "test",
    };
    db.UsersModel.findByPk = jest.fn().mockReturnValue(testData);
    const expectMessage = {
      data: { ...testData },
    };
    try {
      const res = await request
        .get("/api/users/profile")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(expectMessage);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
  it("should throw an error when user does not exist", async () => {
    const testData = null;
    db.UsersModel.findByPk = jest.fn().mockReturnValue(testData);
    const expectMessage = {
      data: { message: "Something went wrong, please try again" },
    };
    try {
      const res = await request
        .get("/api/users/profile")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(500);
      expect(res.body).toStrictEqual(expectMessage);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("should be able to delete user account", async () => {
    db.UsersModel.destroy = jest.fn();
    const expectMessage = { message: "User successfully deleted" };
    try {
      const res = await request
        .delete("/api/users")
        .set("Authorization", "Bearer " + token);

      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(expectMessage);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
});

//kom ihåg att mocka loginuser bla
