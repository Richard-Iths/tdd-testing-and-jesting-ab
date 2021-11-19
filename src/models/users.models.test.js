//import { jest } from '@jest/globals'
import usersModels from "./users.models";

describe("user models", () => {
  it("should get users from users table", () => {
    const expected = [];
    const actual = usersModels.getUsers();

    expect(actual).toStrictEqual(expected);
  });
  it("should get single user from users table", () => {
    const expected = [];
    const actual = usersModels.getUser("id");

    expect(actual).toStrictEqual(expected);
  });
  it("should create user to users table", () => {
    const expected = [];
    const actual = usersModels.createUser("name", "password", "login", "role");

    expect(actual).toStrictEqual(expected);
  });
  it("should update user to users table", () => {
    expect(actual).toStrictEqual(expected);
  });
  it("should delete user from users table", () => {
    expect(actual).toStrictEqual(expected);
  });
});
