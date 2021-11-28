import db from "../database/db.database.js";
import InvalidBodyException from "../models/exceptions/invalidBody-exception.model.js";

//Importera sequelize
//importera user-routes

//register user POST
async function registerUser(req, res, next) {
  try {
    const { name, password, login, role } = req.body;
    if (!name || !password || !login) {
      throw new InvalidBodyException("invalid body provided");
    }

    await db.UsersModel.create({ name, password, login, role });
    return res.json({
      data: { message: "success" },
    });
  } catch (error) {
    next(error);
  }
}
//login user GET
async function loginUser(req, res, next) {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      throw new InvalidBodyException("login and password is required");
    }
    const token = await db.UsersModel.authenticate(password, login);
    return res.json({
      data: { token },
    });
  } catch (error) {
    next(error);
  }
}
//delete user account DELETE
async function deleteUser(req, res, next) {
  try {
    const { userId } = req;
    await db.UsersModel.destroy({ where: { user_id: userId } });
    res.json({ message: `User successfully deleted` });
  } catch (error) {
    next(error);
  }
}

//get user profile GET
async function getUser(req, res, next) {
  try {
    const { userId } = req; //? Ta bort?
    const user = await db.UsersModel.findByPk(userId);

    if (!user) {
      throw new Error();
    }
    res.json({ data: user.toObj() });
  } catch (error) {
    next(error);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await db.UsersModel.findAll();
    const modifiedUsers = users.map((user) => {
      return user.toObj();
    });
    res.json({ data: modifiedUsers });
  } catch (error) {
    next(error);
  }
}

export default { registerUser, loginUser, deleteUser, getUser, getUsers };
