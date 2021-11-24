import db from "../database/db.database.js";
import jwt from "jsonwebtoken";
const { UsersModel } = db;
const authRole = (req, res, next) => async (role) => {
  const { userId } = req;
  try {
    const existingUser = await UsersModel.findByPk(userId);
    if (!existingUser || existingUser.role !== role) {
      throw new Error("invalid user");
    }
    req.user = existingUser;
    next();
  } catch (error) {
    next(error);
  }
};

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace("bearer ", "");
  try {
    if (!token) {
      throw new Error("no token");
    }
    const user = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.userId = user.id;
  } catch (error) {
    next(error);
  }
};

export default {
  authRole,
  auth,
};
