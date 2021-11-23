import {Router} from "express";
import cartController from "../controllers/cart-controller.js";
const router = new Router();

router.get("/carts/:userLogin", cartController.getCart);