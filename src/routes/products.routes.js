import { Router } from 'express'
import productsController from '../controllers/products.controller.js'
import auth from '../middleware/auth.js'
const router = new Router()

router.get('/', productsController.getAllProducts)
router.get('/:id', productsController.getProduct)
router.post('/', auth.auth, auth.authRole('admin'), productsController.postProduct)

export default router
