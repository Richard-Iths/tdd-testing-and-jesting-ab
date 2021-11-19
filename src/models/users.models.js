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
    if (!user || user.password !== password) {
      throw new Error("invalid credentials");
    }
    return user;
  };

  return User;
};
