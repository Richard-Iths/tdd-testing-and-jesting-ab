import supertest from "supertest";
import { jest } from "@jest/globals";
import server from "../server.js";
import db from "../database/db.database.js";
import jwt from "jsonwebtoken";

describe("Products Routes", () => {
  const request = supertest(server);
  let token;
  beforeEach(() => {
    token = jwt.sign({ id: "e78f46de-6b6e-4c0c-8a88-dd460185869a" }, "secret");
    db.UsersModel.findByPk = jest.fn();
  });
  afterEach(async () => {
    // server.close();
    jest.resetAllMocks();
  });

  it("Should get all products", async () => {
    const testData = [
      { name: "Skjorta", price: 100, product_id: "321" },
      { name: "Vinflaska", price: 75, product_id: "123" },
    ];

    db.ProductsModel.findAll = jest.fn().mockReturnValue(testData);

    const expected = { data: testData };

    try {
      const response = await request.get("/api/products");
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(expected);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("Should return an error when getProducts fails", async () => {
    db.ProductsModel.findAll = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    const expected = {
      data: { message: "Something went wrong, please try again" },
    };

    try {
      const response = await request.get("/api/products");
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual(expected);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("Should be able to get a single product", async () => {
    const testData = { name: "Skjorta", price: 100, product_id: "321" };

    db.ProductsModel.findByPk = jest.fn().mockReturnValue(testData);

    const expected = { data: { product: testData } };

    try {
      const response = await request.get("/api/products/321");
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(expected);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("Should return an error when product does not exist", async () => {
    db.ProductsModel.findByPk = jest.fn().mockReturnValue(null);

    const expected = {
      data: { message: "the product seems to be out of stock" },
    };

    try {
      const response = await request.get("/api/products/123");
      expect(response.statusCode).toBe(404);
      expect(response.body).toStrictEqual(expected);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("Should be able as an admin to post new products", async () => {
    db.UsersModel.findByPk.mockReturnValue({ role: "admin", user_id: "123" });
    db.ProductsModel.create = jest.fn();

    const expected = { data: { message: "success" } };

    try {
      const response = await request
        .post("/api/products")
        .send({
          name: "Skjorta",
          price: 100,
        })
        .set("Authorization", "Bearer " + token);

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(expected);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("Should return an invalid body exception when fields are not included", async () => {
    db.UsersModel.findByPk.mockReturnValue({ role: "admin", user_id: "123" });
    db.ProductsModel.create = jest.fn();
    const expected = {
      data: { message: "price and name needs to be included" },
    };

    try {
      const response = await request
        .post("/api/products")
        .set("Authorization", "Bearer " + token)
        .set({
          name: "Skjorta",
        });
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual(expected);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("Should be able as an admin to delete product", async () => {
    db.UsersModel.findByPk.mockReturnValue({ role: "admin", user_id: "123" });
    db.ProductsModel.destroy = jest.fn();

    const expected = { data: { message: "success" } };
    try {
      const response = await request
        .delete("/api/products/123")
        .set("Authorization", "Bearer " + token);
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(expected);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
  it("Should return error when deleteProduct fails", async () => {
    db.UsersModel.findByPk.mockReturnValue({ role: "admin", user_id: "123" });
    db.ProductsModel.destroy = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    const expected = {
      data: { message: "Something went wrong, please try again" },
    };

    try {
      const response = await request
        .delete("/api/products/123")
        .set("Authorization", "Bearer " + token);

      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual(expected);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("Should be able as an admin to update product", async () => {
    db.UsersModel.findByPk.mockReturnValue({ role: "admin", user_id: "123" });
    db.ProductsModel.update = jest.fn();
    db.ProductsModel.findByPk.mockReturnValue({ product_id: "ksajdkaljd" });

    const expected = { data: { message: "success" } };
    try {
      const response = await request
        .put("/api/products/123")
        .set("Authorization", "Bearer " + token)
        .send({
          name: "broken shoes",
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(expected);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
  it("Should return an invalid body exception no valid fields are included", async () => {
    db.UsersModel.findByPk.mockReturnValue({ role: "admin", user_id: "123" });
    db.ProductsModel.update = jest.fn();

    const expected = {
      data: { message: "price or name needs to be included" },
    };
    try {
      const response = await request
        .put("/api/products/123")
        .set("Authorization", "Bearer " + token);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual(expected);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
});
