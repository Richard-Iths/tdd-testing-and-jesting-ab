import userController from "./user-controller";

describe("user controller", () => {
    it("should be able to get all users", () => {
        const expected = [];
        const actual = userController.getUsers();

        expect(actual).toStrictEqual(expected);
    });

    it("should be able to get own profile", () => {
        const expected = [];
        const actual = userController.getUser("id");
    
        expect(actual).toStrictEqual(expected);
    })
})