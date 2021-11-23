import { jest } from "@jest/globals";
import supertest from "supertest";
import server from "../server.js";
import db from "../database/db.database.js";
await db.sync(db.sequelize, true);

const request = supertest(server);

describe("user endpoints", () => {
  let user = null;
  it("should create a single user", (done) => {
    request
      .post("/api/users",)
      .send({ name: "test", login: "test", password: "test" })
      .expect(200)
      .expect("Content-Type", /json/)
      .end((error) => {

        server.close(() => {
          if (error) return done(error);


          done()

        })

      })

  });

  it("should return users", (done) => {
    request
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        user = res.body.data[0]
        server.close(() => done())

      })
      .catch((err) => done(err));
  });

  it("should be able to get own profile", (done) => {
    console.log(user, "LOGGINUSER");
    request
      .get("/api/users/" + user.user_id)
      .expect(200)
      .expect("Content-Type", /json/)
      .then(() => {
        server.close(() => done())

      })
      .catch((err) => done(err))

  });

  it("should login a single user", (done) => {
    request
      .post("/api/users/login",)
      .send({ login: "test", password: "test" })
      .expect(200)
      .expect("Content-Type", /json/)
      .end((error) => {

        server.close(() => {
          if (error) return done(error);


          done()

        })

      })

  });

  it("should be able to delete account", (done) => {
    console.log(user);
    request
      .delete("/api/users/" + user.user_id)
      .expect(200)
      .expect("Content-Type", /json/)
      .then(() => {
        server.close(() => done())
      })
      .catch((err) => done(err))
  });

});

// should be able to delete account
// should be able to get own profile
// should throw error when wrong login credentials