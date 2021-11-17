const db = require("../database");

function getUsers() {
  const users = []; //get all users from database
  return users;
}

function getUser(id) {
    const user = {}; //get a single user from database
    return user;
  }

function postUser(name, login, password, role) {
  //post user to database
  return { message: "succesfuly register a new user" };
}

function deleteUser(id) {
  //delete user from database
  return { message: `succesfuly delete user ${id}` };
}



module.exports = {
    getUsers,
    getUser,
    postUser,
    deleteUser
}