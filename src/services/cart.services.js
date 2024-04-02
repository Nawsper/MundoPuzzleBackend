import Services from "./class.services.js";

// import CartDaosFS from "../persistence/daos/filesystem/cart.dao.js";
// import ProductDaoFS from "../persistence/daos/filesystem/product.dao.js";
// const cartDao = new CartDaosFS();
// const prodDao = new ProductDaoFS();

// import CartDaoMongoDB from "../persistence/daos/mongodb/cart.dao.js";
// import ProductDaoMongoDB from "../persistence/daos/mongodb/product.dao.js";
// const cartDao = new CartDaoMongoDB();
// const prodDao = new ProductDaoMongoDB();

import persistence from '../persistence/factory.js'
const { cartDao } = persistence
const { prodDao } = persistence

export default class CartServices extends Services {
    constructor() {
        super(cartDao);
    }

    async getCartById(cid) {
        try {
            const item = await cartDao.getCartById(cid);
            if (!item) return false;
            else return item;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateCart(cid, productsArray) {
        try {
            const updatedCart = await cartDao.updateCart(cid, productsArray);
            return updatedCart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cart = await cartDao.getCartById(cid);
            const product = await prodDao.getById(pid);

            if (!product) throw new Error("Product not found");
            if (!cart) throw new Error("Cart not found");

            const newProdCart = await cartDao.addProductToCart(cid, pid);
            return newProdCart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateQtyProductFromCart(cid, pid, quantity) {
        try {
            const updatedQty = await cartDao.updateQtyProductInCart(cid, pid, quantity);
            return updatedQty;
        } catch (error) {
            throw new Error(error.message);
        }
    };


    async deleteProductFromCart(cid, pid) {
        try {
            const deleteProdCart = await cartDao.deleteProductFromCart(cid, pid);
            return deleteProdCart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteAllProductFromCart(cid) {
        try {
            const deleteAllProdCart = await cartDao.deleteAllProductsFromCart(cid);
            return deleteAllProdCart;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}




