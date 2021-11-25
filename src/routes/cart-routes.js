import { Router } from "express";
import cartController from "../controllers/cart-controller.js";
import auth from "../middleware/auth.js";
const router = new Router();

router.get("/", auth.auth, cartController.getCart);
router.delete("/", auth.auth, cartController.deleteCart);
router.post("/", auth.auth, cartController.postCart);


export default router;
