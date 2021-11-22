
import db from "../database/db.database.js"
//Importera sequelize
//importera user-routes

//register user POST
async function registerUser(req, res, next) {
    try {
        const { name, password, login, role  } = req.body
        if (!name || !password || !login) {
            throw new Error()
        }

        await db.UsersModel.create({name, password, login, role})
            return res.json({
                data: { message: "success" }
            })
    } catch (error) {
        next(error)
    }
}
//login user GET
async function loginUser(req, res, next) { 
    try {
        const { login, password } = req.body;
        await db.UsersModel.authenticate(password, login)
        res.json({
            data: { message: "success" }
        })
    } catch (error) {
        next(error)
    }
}
//delete user account DELETE
async function deleteUser(req, res, next) {
    try {
        const { id } = req.params 
        await db.UsersModel.deleteUser(id)
        res.json({ message: `User successfully deleted` })
    } catch (error) {
        next(error)
    }
}

//get user profile GET
async function getUser(req, res, next) {
    try {
        const { id } = req.params //? Ta bort?
        await db.UsersModel.findByPk(id);

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

