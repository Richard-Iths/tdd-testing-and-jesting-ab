/*
import userController from "./user-controller"
import db from "../database/db.database"
await db.sync(db.sequelize, true)


describe("user controller", () => {
    const res = {json: (values) => {
        return JSON.stringify(values)
    }}

    const req = {body: {

    }}

    const next = () => {
        return;
    }

    it("should be able to register", async () => {
        //const expected = {}
        //const actual = await userController.registerUser()

        req.body = {name: "kalle", password: "grillkorv", login: "kalle123"}
        const expected = JSON.stringify({data: {message: "success"}})

        console.log("KOLLA HÄR", res.json(expected))
        expect(() => userController.registerUser(req, res, next)).deepEqual(expected)
    })

    it("should be able to login", async () => {
        const expected = {}
        const actual = await userController.loginUser()
    
        expect(actual).toStrictEqual(expected);
    })

    it("should be able to delete account", async () => {
        const expected = {}
        const actual = await userController.deleteUser("id")
    
        expect(actual).toStrictEqual(expected);
    })

    it("should be able to get own profile", async () => {
        const expected = {}
        const actual = await userController.getUser("id")
    
        expect(actual).toStrictEqual(expected);
    })

    it("should be able to get all users", async () => {
        const expected = {}
        const actual = await userController.getUsers() //detta awaitar en asynkron funktion

        expect(actual).toStrictEqual(expected);
    });
})
*/