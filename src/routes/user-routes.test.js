import supertest from "supertest"
import router from "./user-routes"
import { jest } from "@jest/globals"
import server from "../server"

const request = supertest(server)

describe("user endpoints", () => {
    it("should return users", done => {
        request.get("/api/users")
        .expect(200)
        .expect("Content-Type", /json/)
        .end(() => {
            return done()
        })
    })
})