import { jest } from "@jest/globals";
import db from "./db.database";

describe("db.database.js", () => {
  it("should have table for users", async () => {
    const expected = "OK";
    const testData = "users";
    const result = await db.getFrom(testData);
    expect(result).toBe(expected);
  });

  it("should have table for products", async () => {
    const expected = "OK";
    const testData = "products";
    const result = await db.getFrom(testData);
    expect(result).toBe(expected);
  })

  it("should have table for carts", async () => {
    const expected = "OK";
    const testData = "carts";
    const result = await db.getFrom(testData);
    expect(result).toBe(expected);
  })
});