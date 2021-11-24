import { jest } from "@jest/globals";
import supertest from "supertest";
import router from "./cart-routes";
import server from "../server.js";
import db from "../database/db.database.js";

await db.sync(db.sequelize, true);

const request = supertest(server);

describe("cart endpoints", () => {
  it("should get cart items when user logged in", (done) => {
    request
      .get("/api/carts/test")
      
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        carts = res.body.data; //Kanske fix?
        console.log(carts);
        server.close(() => done());
      })
      .catch((err) => done(err));
  });
});
