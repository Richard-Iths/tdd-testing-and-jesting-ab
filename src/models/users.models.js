export default (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
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
    if (user) {
      if (user.password === password) {
        return true;
      } else {
        return false;
      }
    } else {
      throw new Error("User Not Registered");
    }
  };
  return User;
};




