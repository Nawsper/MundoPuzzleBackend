import { Router } from "express";
import CartController from '../controllers/cart.controllers.js';
import TicketController from "../controllers/ticket.controllers.js";
import { verifyToken } from '../middlewares/verifyToken.js';
import { authorize } from "../middlewares/authorize.js";

const controller = new CartController()
const ticketcontroller = new TicketController()

const router = Router()

// rutas

router.get('/', authorize('admin'), controller.getAll)

router.get('/:cid', controller.getCartById);

router.put('/:cid', authorize('user'), controller.updateCart);

router.put('/:cid/products/:pid', authorize('user'), controller.updateQtyProductFromCart);

router.post('/', controller.create);

router.post('/add/:cid/:pid', authorize('user'), controller.addProductToCart);

router.post('/:cid/purchase', authorize('user'), verifyToken, ticketcontroller.generateTicket)

router.delete('/:cid/products/:pid', authorize('user'), controller.deleteProductFromCart);

router.delete('/:cid', authorize('user'), controller.deleteAllProductsFromCart);

export default router