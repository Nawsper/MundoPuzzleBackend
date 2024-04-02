import { CartModel } from "./models/cart.model.js";
import { ProductModel } from "./models/product.model.js";
import MongoDao from "./mongo.dao.js";

export default class CartDaoMongo extends MongoDao {
    constructor() {
        super(CartModel)
    }

    async getCartById(cid) {
        try {
            const response = await CartModel.findById(cid).populate('products.product');
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateCart(cid, productsArray) {
        try {
            const cart = await CartModel.findById(cid);

            cart.products = [];

            for (const productItem of productsArray) {
                const product = await ProductModel.findById(productItem.product);
                cart.products.push({
                    product,
                    quantity: productItem.quantity,
                });
            }

            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const product = await ProductModel.findById(pid);
            const cart = await CartModel.findById(cid);
            const productInCart = cart.products.find(
                (products) => products.product._id.toString() === product._id.toString()
            );

            if (productInCart) productInCart.quantity++;
            else
                cart.products.push({
                    product,
                    quantity: 1,
                });

            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateQtyProductInCart(cid, pid, quantity) {
        try {
            const cart = await CartModel.findById(cid);
            const productInCart = cart.products.find(
                (product) => product.product.toString() === pid
            );

            if (productInCart) productInCart.quantity = quantity;

            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteProductFromCart(cid, pid) {
        try {
            const cart = await CartModel.findById(cid);
            cart.products = cart.products.filter(
                (product) => product.product.toString() !== pid
            );
            cart.save();
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteAllProductsFromCart(cid) {
        try {
            const cart = await CartModel.findByIdAndUpdate(cid, { products: [] }, { new: true });

            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}