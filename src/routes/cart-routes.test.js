import { jest } from "@jest/globals";
import supertest from "supertest";
import router from "./cart-routes";
import server from "../server.js";
import db from "../database/db.database.js";
import jwt from "jsonwebtoken";

await db.sync(db.sequelize, true);

const request = supertest(server);

describe("cart endpoints", () => {
  it("should get cart items when user logged in", async () => {
    const token = jwt.sign(
      { id: "e78f46de-6b6e-4c0c-8a88-dd460185869a" },
      "secret"
    );
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
    server.close();
  });
});
