import { Router } from "express";

import userController from "../controllers/user-controller.js";
import auth from "../middleware/auth.js";
const router = new Router();

router.post("/login", userController.loginUser);
router.get("/", auth.auth, auth.authRole("admin"), userController.getUsers);
router.get("/profile", auth.auth, userController.getUser);
router.post("/", userController.registerUser);
router.delete("/", auth.auth, userController.deleteUser);

export default router;
