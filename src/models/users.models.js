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

//create user to database
export async function createUser(name, login, password, role) {
  const user = await User.create({ name, password, login, role });
  if (user) {
    return { message: "succesfuly register a new user" };
  } else {
    throw new Error();
  }
}

//loggin a user from the database
async function login(login, password) {
  try {
    const user = await User.authenticate(password, login);
    if (user) {
      return { message: "Logged In" };
    }
  } catch (error) {
    return error;
  }
}

//get all users from database
function getUsers() {
  const users = User.findAll();
  return users;
}

//get a single user from database
function getUser(id) {
  const user = User.findOne({ where: { id } });
  return user;
}

//delete user from database
async function deleteUser(id) {
  const user = User.findOne({ where: { id } });
  if (user.UserId !== id) {
    return false;
  } else {
    await user.destroy();
    return { message: `succesfuly delete user ${id}` };
  }
}

// export default {
//   login,
//   getUsers,
//   getUser,
//   createUser,
//   deleteUser,
// };
