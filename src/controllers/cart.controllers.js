import Controllers from "./class.controller.js";
import CartServices from "../services/cart.services.js";
import errorsDictionary from "../utils/errors.dictionary.js";
import { HttpResponse } from "../utils/http.response.js";

const cartService = new CartServices();
const httpResponse = new HttpResponse();

export default class CartController extends Controllers {
    constructor() {
        super(cartService);
    }

    async getCartById(req, res, next) {
        try {
            const { cid } = req.params;
            const cart = await cartService.getCartById(cid);
            if (!cart) return httpResponse.NotFound(res, errorsDictionary.ITEM_NOT_FOUND);
            else return httpResponse.Ok(res, cart);
        } catch (error) {
            next(error);
        }
    };

    async updateCart(req, res, next) {
        try {
            const { cid } = req.params;
            const productsArray = req.body;
            const updatedCart = await cartService.updateCart(cid, productsArray);
            if (!updatedCart) return httpResponse.NotFound(res, errorsDictionary.ITEM_NOT_FOUND)
            else return httpResponse.Ok(res, updatedCart);
        } catch (error) {
            next(error);
        }
    }


    async addProductToCart(req, res, next) {
        try {
            const { cid, pid } = req.params;
            const newProdCart = await cartService.addProductToCart(cid, pid);
            if (!newProdCart) return httpResponse.NotFound(res, errorsDictionary.ITEM_NOT_FOUND)
            else return httpResponse.Ok(res, newProdCart);
        } catch (error) {
            next(error);
        }
    }

    async updateQtyProductFromCart(req, res, next) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const updatedQtyCart = await cartService.updateQtyProductFromCart(cid, pid, Number(quantity));
            if (!updatedQtyCart) return httpResponse.NotFound(res, errorsDictionary.ITEM_NOT_FOUND)
            else return httpResponse.Ok(res, updatedQtyCart);
        } catch (error) {
            next(error);
        }
    };

    async deleteProductFromCart(req, res, next) {
        try {
            const { cid } = req.params;
            const { pid } = req.params;
            const deleteProduct = await cartService.deleteProductFromCart(cid, pid);
            if (!deleteProduct) return httpResponse.NotFound(res, errorsDictionary.ITEM_NOT_FOUND)
            else return httpResponse.Ok(res, deleteProduct);
        } catch (error) {
            next(error);
        }
    }

    async deleteAllProductsFromCart(req, res, next) {
        try {
            const { cid } = req.params;
            const deleteAllProducts = await cartService.deleteAllProductFromCart(cid);
            if (!deleteAllProducts) return httpResponse.NotFound(res, errorsDictionary.ITEM_NOT_FOUND)
            else return httpResponse.Ok(res, deleteAllProducts);
        } catch (error) {
            next(error);
        }
    };

}

