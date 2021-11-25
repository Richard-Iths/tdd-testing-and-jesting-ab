import productsController from "./products.controller.js";
import { jest } from "@jest/globals";
import db from "../database/db.database";
import InvalidBodyException from "../models/exceptions/invalidBody-exception.model.js";
import NotFoundException from "../models/exceptions/notFound-exepction.model.js";

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
    db.ProductsModel.create = jest.fn();
    db.ProductsModel.destroy = jest.fn();
    db.ProductsModel.update = jest.fn();
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
      expect(error).be(undefined);
    }
  });

  it("should throw not found exception when no product is found", async () => {
    const dbData = null;
    const req = {
      params: {
        id: "sad91239081",
      },
    };
    const next = jest.fn();
    next.mockImplementation(() => {
      throw new NotFoundException();
    });
    db.ProductsModel.findByPk.mockReturnValue(dbData);

    try {
      await productsController.getProduct(req, res, next);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(error instanceof NotFoundException);
    }
  });

  it("should be able post new product", async () => {
    const req = {
      body: {
        price: 500,
        name: "a product",
      },
    };
    const expected = JSON.stringify({ message: "success" });
    res.json.mockReturnValue(expected);

    try {
      const response = await productsController.postProduct(req, res);
      expect(res.json).toHaveBeenCalled();
      expect(db.ProductsModel.create).toHaveBeenCalled();
      expect(response).toBe(expected);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("should be able delete product", async () => {
    const req = {
      params: {
        id: "djakldjad8130190",
      },
    };
    const expected = JSON.stringify({ message: "success" });
    res.json.mockReturnValue(expected);

    try {
      const response = await productsController.deleteProduct(req, res);
      expect(res.json).toHaveBeenCalled();
      expect(db.ProductsModel.destroy).toHaveBeenCalled();
      expect(response).toBe(expected);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
  it("should be able to update a product", async () => {
    const req = {
      params: {
        id: "skalfjklajf19839139",
      },
      body: {
        name: "broken shoes",
      },
    };
    const expected = JSON.stringify({ message: "success" });
    res.json.mockReturnValue(expected);

    try {
      const response = await productsController.putProduct(req, res);
      expect(db.ProductsModel.update).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
      expect(response).toBe(expected);
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
  it("should throw invalid body exception when nothing is provided", async () => {
    const next = jest.fn();
    next.mockImplementation((error) => {
      throw new InvalidBodyException();
    });
    const req = {
      params: {
        id: "skalfjklajf19839139",
      },
      body: {},
    };
    try {
      await productsController.putProduct(req, res, next);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(error instanceof InvalidBodyException).toBe(true);
    }
  });
});
