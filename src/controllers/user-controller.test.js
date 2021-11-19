import userController from "./user-controller";

describe("user controller", () => {
    it("should be able to get all users", async () => {
        const expected = {};
        const actual = await userController.getUsers();

        expect(actual).toStrictEqual(expected);
    });

    it("should be able to get own profile", () => {
        const expected = [];
        const actual = userController.getUser("id");
    
        expect(actual).toStrictEqual(expected);
    })
})