
import { Router } from "express";

import userController from "../controllers/user-controller.js";
import auth from "../middleware/auth.js";
const router = new Router();

router.get(
  "/",
  auth.auth,
  auth.authRole("admin"),
  userController.getUsers
);
router.get("/:id", userController.getUser);
router.post("/", userController.registerUser);
router.post("/login", userController.loginUser);
router.delete("/:id", userController.deleteUser);

export default router;
