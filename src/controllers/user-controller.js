//Importera usermodel
import db from "../database/db.database"
//Importera sequelize
//importera user-routes

//register user POST
async function registerUser(req, res, next) {
    try {
        const { name, password, login, role } = req.body;
        if (!name || !password || !login ||!role) {
            throw new Error()
        }
        const user = await db.UsersModel.createUser(name, password, login)
            res.json({
                data: { message } 
            });
    } catch (error) {
        next(error);
    }
}
//login user GET
async function loginUser(req, res, next) { 
    try {
        const { name, login, role } = req.body;
        res.json({
            data: { name, login, role }
        })
    } catch (error) {
        next(error)
    }
}
//delete user account DELETE
async function deleteUser(req, res, next) {
    try {
        const { id } = req.params 
        const user = await db.UsersModel.deleteUser(id)
        res.json({ message: `User successfully deleted` })
    } catch (error) {
        next(error)
    }
}

//get user profile GET
async function getUser(req, res, next) {
    try {
        const { id } = req.params //? Ta bort?
        const user = await db.UsersModel.findByPk(id);

        if(!user) {
            throw new Error()
        }
            res.json({ user })
    } catch(error) {
        next(error)
    }
}

async function getUsers(req, res, next) {
    try {
        const users = await db.UsersModel.findAll()
            res.json({ data:users })
    } catch(error) {
        next(error)
    }
}

export default { registerUser, loginUser, deleteUser, getUser, getUsers }

