import userController from "./user-controller";

describe("user controller", () => {
    it("should be able to register", async () => {
        //const expected = {}
        //const actual = await userController.registerUser()
    
        expect(actual).toStrictEqual(expected);
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