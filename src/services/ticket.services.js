import { v4 as uuidv4 } from "uuid";
import Services from "./class.services.js";
import persistence from '../persistence/factory.js'

const { ticketDao, prodDao, cartDao, userDao } = persistence;

export default class TicketService extends Services {
    constructor() {
        super(ticketDao);
    }

    async generateTicket(userId, cartId) {
        try {
            const user = await userDao.getById(userId);
            if (!user) return false;

            const cart = await cartDao.getCartById(cartId);
            if (!cart) return false;

            let amountAcc = 0;
            for (const prod of cart.products) {
                const idProd = prod.product._id.toString();
                const prodDB = await prodDao.getById(idProd);
                if (prod.quantity <= prodDB.stock) {
                    const amount = prod.quantity * prodDB.price;
                    amountAcc += amount;
                }
            }

            const ticket = await ticketDao.create({
                code: uuidv4(),
                purchase_datetime: new Date().toLocaleString(),
                amount: amountAcc,
                purchaser: user.email
            });

            cart.products = [];
            cart.save();
            return ticket;

        } catch (error) {
            throw new Error(error.message);
        }
    }
}