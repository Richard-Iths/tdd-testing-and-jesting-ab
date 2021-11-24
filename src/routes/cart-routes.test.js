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
      const token = jwt.sign({ id: "e78f46de-6b6e-4c0c-8a88-dd460185869a" }, "secret");
      db.CartsModel.findAll = jest.fn().mockReturnValue({cart: [{1 : "trasiga skor" , 2: "strumpor"}]})
      try {
          
         const res = await request
            .get("/api/carts")
            .set("Authorization", "Bearer "+ token)
            expect(res).toBe("hello")
            
      } catch (error) {
          expect(error).toBeFalsy()
      }
      
      
  });
});
