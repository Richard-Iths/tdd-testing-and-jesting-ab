import { jest } from "@jest/globals";
import db from "./db.database";

describe("db.database.js", () => {
  it("should have table for users", async () => {
    const expected = "OK";
    const testData = "users";
    const result = await db.getFrom(testData);
    expect(result).toBe(expected);
  });
});
