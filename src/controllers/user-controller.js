//Importera usermodel
//importera fake db

module.exports = {

    //register user POST
    async registerUser(req, res, next) {
        try {
            const {name, login, password} = req.body;
            if(!name || !login || !password) {
                throw new Error()
            }
            const user = //await usermodel  
            res.json({
                data: {message}
            });
        } catch (error) {
            next(error);
        }
    },
    //login user GET
    async loginUser(req, res, next) {
        try{
            const {name, login, role} = req.body;
            res.json({
                data: {name, login, role}
            })
        } catch (error) {
            next(error)
        }
    },
    //delete user account DELETE
    async deleteUser(req, res, next) {
        try {
            const {id} = req.params //?
            //const user = hämta userid från usermodel kaske?
            res.json({message: `User with id ${userId} successfully deleted`}) 
        } catch (error) {
            next(error)
        }
    },

    //get user profile GET
    async getUser(req, res, next) {
        try {
            const {id} = req.params
            const user = //const user = Hämta user med userid från db
            res.json({data:})
        }
    },

    async getUsers(req, res, next) {
        try {
            const users = //const users = hämta alla users från db
            res.json({data})
        }
    } 
}

