//import { jest } from '@jest/globals'
import usersModels from "./users.models";

describe("user models", () => {
  it("should get users from users table", () => {
    const expected = [];
    const actual = usersModels.getUsers();

    expect(actual).toStrictEqual(expected);
  });
  it("should get users from users table", () => {
    const expected = [];
    const actual = usersModels.createUser("name", "password", "login", "role");

    expect(actual).toStrictEqual(expected);
  });
});
