import { Router } from "express";
import userController from "../controllers/user-controller.js";
const router = new Router();

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUser);
router.post("/users", userController.registerUser);
router.post("/users/login", userController.loginUser);
router.delete("/users/:id", userController.deleteUser);

export default router;
