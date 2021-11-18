const { Router } = require("express");
const userController = require("../controllers/user-controller");
const router = new Router();

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUser);
router.post("/users", userController.registerUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;