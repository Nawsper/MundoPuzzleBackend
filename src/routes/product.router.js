import { Router } from "express";
import ProductController from '../controllers/product.controllers.js'
import { productValidator } from "../middlewares/productValidator.js";
import { authorize } from "../middlewares/authorize.js";

const controller = new ProductController()

const router = Router()

// rutas

router
    .get('/', controller.getProducts)
    .get('/no-dto/:id', controller.getById)
    .get('/dto/:id', controller.getByIdDTO)
    .get("/mockingproducts", controller.getProductsMock)
    .post('/', productValidator, controller.createProducts)
    .post('/dto', authorize('admin'), controller.createProdDTO)
    .put('/:id', controller.updateProduct)
    .delete('/:id', controller.deleteProduct);

export default router