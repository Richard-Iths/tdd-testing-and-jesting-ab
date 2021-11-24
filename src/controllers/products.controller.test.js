import productsController from "./products.controller.js";
import { jest } from "@jest/globals";
import db from "../database/db.database";

// jest.unstable_mockModule("../database/db.database.js", () => {
//   db.ProductsModel.findAll = jest.fn();
// });

describe("products controller", () => {
  const res = {};
  beforeEach(() => {
    res.json = jest.fn();
    // dbMock.findAll = jest.spyOn(db.ProductsModel, "findAll");
    db.ProductsModel.findAll = jest.fn();
    db.ProductsModel.findByPk = jest.fn();
  });

  it("should return all products", async () => {
    const expected = JSON.stringify({ data: [] });
    res.json.mockReturnValue(expected);
    await productsController.getAllProducts({}, res, {});
    expect(db.ProductsModel.findAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json()).toBe(expected);
  });

  it("should be able to get a single product", async () => {
    const dbData = {
      data: { name: "product-1", price: 500, id: "sad91239081" },
    };
    const req = {
      params: {
        id: "sad91239081",
      },
    };

    const expected = JSON.stringify(dbData);

    db.ProductsModel.findByPk.mockReturnValue(dbData);
    res.json.mockReturnValue(JSON.stringify(db.ProductsModel.findByPk()));

    try {
      const response = await productsController.getProduct(req, res);
      expect(res.json).toHaveBeenCalled();
      expect(db.ProductsModel.findByPk).toHaveBeenCalled();
      expect(response).toBe(expected);
    } catch (error) {
      console.log(error, "error");
      expect(error).be(undefined);
    }
  });
  it("should throw an error when a product is not found", async () => {
    const dbData = {
      data: null,
    };
    const req = {
      params: {
        id: "sad91239081",
      },
    };

    const expected = JSON.stringify(dbData);

    db.ProductsModel.findByPk.mockReturnValue(dbData);
    res.json.mockReturnValue(JSON.stringify(db.ProductsModel.findByPk()));

    try {
      const response = await productsController.getProduct(req, res);
      expect(res.json).toHaveBeenCalled();
      expect(db.ProductsModel.findByPk).toHaveBeenCalled();
      expect(response).toBe(expected);
    } catch (error) {
      console.log(error, "error");
      expect(error).be(undefined);
    }
  });
});
