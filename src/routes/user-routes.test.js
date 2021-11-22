import supertest from "supertest";
import router from "./user-routes";
import { jest } from "@jest/globals";
import server from "../server";
import db from "../database/db.database";
await db.sync(db.sequelize, true);

const request = supertest(server);

describe("user endpoints", () => {
  it("should return users", (done) => {
    request
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /json/)
      .then( () => {
         server.close(()=>done())
       
      })
      .catch((err) => done(err));
  });

  it("should be able to get own profile", (done)=>{
    request
    .get("/api/users/:id")
    .expect(200)
    .expect("Content-Type", /json/)
    .then(()=>{
      server.close(()=>done())
      
    })
    .catch((err) => done(err))

  })







  it("should create a single user", (done) => {
    request
      .post("/api/users",)
      .send({name: "test", login: "test", password: "test"})
      .expect(200)
      .expect("Content-Type", /json/)
      .end( (error) => {
       
         server.close(()=>{
             if (error) return done(error);
             
         
             done()
            
        })
       
      })
      
  });

  it("should login a single user", (done) => {
    request
      .post("/api/users/login",)
      .send({login: "test", password: "test"})
      .expect(200)
      .expect("Content-Type", /json/)
      .end( (error) => {
       
         server.close(()=>{
             if (error) return done(error);
             
         
             done()
            
        })
       
      })
      
  });

});

// should be able to delete account
// should be able to get own profile
// should throw error when wrong login credentials