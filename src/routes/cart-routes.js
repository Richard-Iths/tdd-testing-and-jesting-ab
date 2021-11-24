import {Router} from "express";
import cartController from "../controllers/cart-controller.js";
import auth from "../middleware/auth.js";
const router = new Router();

router.get("/carts",auth.auth,cartController.getCart);

export default router;