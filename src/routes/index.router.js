import { Router } from 'express'
import productRouter from './product.router.js'
import cartRouter from './cart.router.js'
import userRouter from './user.router.js'
import viewsRouter from './views.router.js'
import loggerRouter from "./logger.router.js";

const router = Router()


router.use('/api/products', productRouter)
router.use('/api/carts', cartRouter)
router.use('/', viewsRouter)
router.use('/users', userRouter)
router.use("/logger", loggerRouter);

export default router