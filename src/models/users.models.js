import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export default (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    user_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: " Username taken",
      },
    },
    role: {
      type: Sequelize.STRING,
      enum: ["user", "admin"],
      defaultValue: "user",
      allowNull: false,
    },
  });
  User.authenticate = async (password, login) => {
    const user = await User.findOne({ where: { login } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error("invalid credentials");
    }
    const token = jwt.sign(
      { id: user.user_id },
      process.env.JWT_SECRET || "secret"
    );
    return { token };
  };

  User.beforeCreate((user, options) => {
    const hashedPassword = bcrypt.hashSync(user.password, 12);
    user.password = hashedPassword;
  });

  User.validateToken = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || "secret");
    } catch {
      throw new Error();
    }
  };

  return User;
};
