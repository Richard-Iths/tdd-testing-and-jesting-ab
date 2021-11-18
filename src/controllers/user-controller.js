//Importera usermodel
//importera fake db
//Importera sequelize
//importera user-routes

//register user POST
async function registerUser(req, res, next) {
    try {
        const { name, password, login, role } = req.body;
        if (!name || !password || !login ||!role) {
            throw new Error()
        }
        const user = await Usermodel.createUser()
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
        const user = await Usermodel.deleteUser(id)
        res.json({ message: `User successfully deleted` })
    } catch (error) {
        next(error)
    }
}

//get user profile GET
async function getUser(req, res, next) {
    try {
        const { id } = req.params //? Ta bort?
        const user = await Usermodel.getUser(id);

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
        const users = await Usermodel.getUsers()
            res.json({ data })
    } catch(error) {
        next(error)
    }
}

export default { registerUser, loginUser, deleteUser, getUser, getUsers }
