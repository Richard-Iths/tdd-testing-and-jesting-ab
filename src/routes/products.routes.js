import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import auth from "../middleware/auth.js";
const router = new Router();

router.get("/", productsController.getAllProducts);
router.post(
  "/",
  auth.auth,
  auth.authRole("admin"),
  productsController.postProduct
);
router.get("/:id", productsController.getProduct);
router.delete(
  "/:id",
  auth.auth,
  auth.authRole("admin"),
  productsController.deleteProduct
);
router.put(
  "/:id",
  auth.auth,
  auth.authRole("admin"),
  productsController.putProduct
);

export default router;
