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
    server.close();
    jest.resetAllMocks();
  });

  it("should create a user", async () => {
    db.UsersModel.create = jest.fn();
    const expectedMessage = { data: { message: "success" } };

    try {
      const res = await request
        .post("/api/users")
        .send({ name: "test", login: "test", password: "test" });
        
        expect(res.status).toBe(200)
        expect(res.body).toStrictEqual(expectedMessage)
        expect(db.UsersModel.create).toHaveBeenCalled()
    } catch (error) {
      expect(error).toBeFalsy()
    }
  });

  it("should throw an error if wrong args are passed with body", async () => {
    db.UsersModel.create = jest.fn();
    const expectedMessage = { data: { message: "invalid body provided" } };

    try {
      const res = await request
        .post("/api/users")
        .send({ name: "test", login: "test", });
        
        expect(res.status).toBe(400)
        
        expect(res.body).toStrictEqual(expectedMessage)
        expect(db.UsersModel.create).not.toHaveBeenCalled()
    } catch (error) {
      expect(error).toBeFalsy()
    }
  });
});

//kom ihåg att mocka loginuser bla
