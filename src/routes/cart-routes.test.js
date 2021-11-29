import { jest } from "@jest/globals";
import supertest from "supertest";
import server from "../server.js";
import db from "../database/db.database.js";
import jwt from "jsonwebtoken";

const request = supertest(server);
describe("cart endpoints", () => {
  let token;
  beforeEach(() => {
    token = jwt.sign({ id: "e78f46de-6b6e-4c0c-8a88-dd460185869a" }, "secret");
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should get cart items when user logged in", async () => {
    const expected = [
      { user_id: "2180481084", product_id: "s98240891", amount: 2 },
    ];
    db.CartsModel.findAll = jest.fn().mockReturnValue(expected);
    try {
      const res = await request
        .get("/api/carts")
        .set("Authorization", "Bearer " + token);

      expect(res.status).toBe(200);
      expect(db.CartsModel.findAll).toHaveBeenCalled();
      const resBodyData = res.body.data[0];
      const expectedBodyData = expected[0];
      expect(resBodyData.user_id).toBe(expectedBodyData.user_id);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("should delete cart items when user logged in", async () => {
    const expected = [
      { user_id: "12345678910", product_id: "k10987654321", amount: 5 },
    ];
    db.CartsModel.destroy = jest.fn().mockReturnValue(expected);
    try {
      const res = await request
        .delete("/api/carts")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(200);
      expect(db.CartsModel.destroy).toHaveBeenCalled();
      const resBodyData = res;
      const expectedMessage = { message: `Cart successfully deleted` };

      expect(res.body).toStrictEqual(expectedMessage);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("should post cart items when user logged in", async () => {
    db.CartsModel.create = jest.fn();
    db.CartsModel.findOne = jest.fn();

    try {
      const res = await request
        .post("/api/carts")
        .set("Authorization", "Bearer " + token)
        .send({ product: { product_id: 123 } });

      expect(res.status).toBe(200);
      expect(db.CartsModel.create).toHaveBeenCalled();
      expect(db.CartsModel.findOne).toHaveBeenCalled();
      const expectedMessage = { message: `Cart successfully updated` };
      expect(res.body).toStrictEqual(expectedMessage);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("should return error when posting a product that exist", async () => {
    db.CartsModel.create = jest.fn();
    db.CartsModel.findOne = jest
      .fn()
      .mockReturnValue({ user_id: 123, product_id: 123, amount: 2 });

    try {
      const res = await request
        .post("/api/carts")
        .set("Authorization", "Bearer " + token)
        .send({ product: { product_id: 123 } });

      expect(res.status).toBe(400);
      expect(db.CartsModel.create).not.toHaveBeenCalled();
      expect(db.CartsModel.findOne).toHaveBeenCalled();
      const expectedMessage = {
        data: { message: `product exist cannot post` },
      };
      expect(res.body).toStrictEqual(expectedMessage);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("should patch cart items when user logged in", async () => {
    db.CartsModel.update = jest.fn();
    db.CartsModel.destroy = jest.fn();
    try {
      const res = await request
        .put("/api/carts/123")
        .set("Authorization", "Bearer " + token)
        .send({ amount: 2 });
      expect(res.status).toBe(200);
      expect(db.CartsModel.update).toHaveBeenCalled();
      const expectedMessage = { message: `Cart successfully patched` };
      expect(res.body).toStrictEqual(expectedMessage);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
});
