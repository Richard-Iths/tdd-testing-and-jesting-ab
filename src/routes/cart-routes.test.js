import { jest } from "@jest/globals";
import supertest from "supertest";
import router from "./cart-routes";
import server from "../server.js";
import db from "../database/db.database.js";
import jwt from "jsonwebtoken";


await db.sync(db.sequelize, true);

const request = supertest(server);

describe("cart endpoints", () => {
  // it("should get cart items when user logged in", async () => {
  //   const token = jwt.sign(
  //     { id: "e78f46de-6b6e-4c0c-8a88-dd460185869a" },
  //     "secret"
  //   );
  //   const expected = [
  //     { user_id: "2180481084", product_id: "s98240891", amount: 2 },
  //   ];
  //   db.CartsModel.findAll = jest.fn().mockReturnValue(expected);
  //   try {
  //     const res = await request
  //       .get("/api/carts")
  //       .set("Authorization", "Bearer " + token);
  //     expect(res.status).toBe(200);
  //     expect(db.CartsModel.findAll).toHaveBeenCalled();
  //     const resBodyData = res.body.data[0];
  //     const expectedBodyData = expected[0];
  //     expect(resBodyData.user_id).toBe(expectedBodyData.user_id);
  //   } catch (error) {
  //     expect(error).toBeFalsy();
  //   }
  //   server.close();
  // });

  // it("should delete cart items when user logged in", async () => {
  //   const token = jwt.sign(
  //     { id: "e78f46de-6b6e-4c0c-8a88-dd460185869a" },
  //     "secret"
  //   );
  //   const expected = [
  //     { user_id: "12345678910", product_id: "k10987654321", amount: 5 },
  //   ];
  //   db.CartsModel.destroy = jest.fn().mockReturnValue(expected);
  //   try {
  //     const res = await request
  //       .delete("/api/carts")
  //       .set("Authorization", "Bearer " + token);
  //     expect(res.status).toBe(200);
  //     expect(db.CartsModel.destroy).toHaveBeenCalled();
  //     const resBodyData = res;
  //     const expectedMessage = { message: `Cart successfully deleted` };
  //     console.log(res);
  //     expect(res.body).toStrictEqual(expectedMessage);
  //   } catch (error) {
  //     console.log(error);
  //     expect(error).toBeFalsy();
  //   }
  // });
  // server.close;

  it("should update cart items when user logged in", async () => {
    const token = jwt.sign(
      { id: "e78f46de-6b6e-4c0c-8a88-dd460185869a" },
      "secret"
    );
    const expected = [
      { user_id: "456712389", product_id: "985462245", amount: 3 },
    ];
    db.CartsModel.create = jest.fn().mockReturnValue(expected);
    try {
      const res = await request
        .post("/api/carts")
        .set("Authorization", "Bearer " + token);
        expect(res.status).toBe(200)
        expect(db.CartsModel.create).toHaveBeenCalled()
        const expectedMessage = {message: `Cart successfully updated`}
        expect(res.body).toStrictEqual(expectedMessage)

    } catch (error) {
      // console.log(error);
        expect(error).toBeFalsy();
    }
  });
  server.close()
});
