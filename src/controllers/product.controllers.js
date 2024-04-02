import Controllers from "./class.controller.js";
import ProductService from "../services/product.services.js";
import errorsDictionary from "../utils/errors.dictionary.js";
import { HttpResponse } from "../utils/http.response.js";
import { sendGmail } from "../services/email.service.js";

const productService = new ProductService();
const httpResponse = new HttpResponse();

export default class ProductController extends Controllers {
    constructor() {
        super(productService);
    }
    async getProducts(req, res, next) {
        try {
            const { page = 1, limit = 10, sort, query, status } = req.query;

            const queryParams = {
                page,
                limit,
                sort,
                query,
                status
            };

            const response = await productService.getProducts(queryParams);
            const prevLink = response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}` : null;
            const nextLink = response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}` : null;
            res.status(200).json({
                status: 'success',
                payload: response.docs,
                totalPages: response.totalPages,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink,
                nextLink,
            });
        } catch (error) {
            next(error);
        }
    };

    async getByIdDTO(req, res, next) {
        try {
            const { id } = req.params;
            const prod = await productService.getByIdDTO(id);
            if (!prod) return httpResponse.NotFound(res, errorsDictionary.ITEM_NOT_FOUND);
            else return httpResponse.Ok(res, prod);
        } catch (error) {
            next(error);
        }
    };

    async createProdDTO(req, res, next) {
        try {
            const newItem = await productService.createProdDTO(req.body);
            if (!newItem) return httpResponse.BadRequest(res, errorsDictionary.ITEM_NOT_CREATED);
            else return httpResponse.Ok(res, newItem);
        } catch (error) {
            next(error);
        }
    };

    async getProductsMock(req, res, next) {
        try {
            const products = await productService.getProductsMock();
            return httpResponse.Ok(res, products);
        } catch (error) {
            next(error);
        }
    };

    async createProducts(req, res, next) {
        try {
            const prod = req.body
            const user = req.user

            if (!user || (user.role !== "admin" && user.role !== "premium")) {
                httpResponse.Forbidden(res, errorsDictionary.INVALID_CREDENTIALS);
                return;
            }

            const newProd = await productService.createProducts(prod, user.email);

            return newProd
                ? httpResponse.Ok(res, newProd)
                : httpResponse.NotFound(res, errorsDictionary.ITEM_NOT_FOUND);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const user = req.user;
            const { id } = req.params;
            const prod = req.body;

            const admin = user?.role === "admin";
            const premium = user?.role === "premium";

            if (!user || (!admin && !premium)) {
                httpResponse.Forbidden(res, errorsDictionary.INVALID_CREDENTIALS);
                return;
            }

            const product = await productService.getById(id);

            if (!product) {
                httpResponse.NotFound(res, errorsDictionary.ITEM_NOT_FOUND);
            }

            if (product.createdBy !== user.email && !admin) {
                httpResponse.Forbidden(res, errorsDictionary.INVALID_CREDENTIALS);
                return;
            }

            const updatedProd = await productService.update(id, prod);

            return updatedProd
                ? httpResponse.Ok(res, updatedProd)
                : httpResponse.NotFound(res, errorsDictionary.ITEM_NOT_FOUND);
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const user = req.user;
            const { id } = req.params;

            const admin = user?.role === "admin";
            const premium = user?.role === "premium";

            if (!user || (!admin && !premium)) {
                httpResponse.Forbidden(res, errorsDictionary.INVALID_CREDENTIALS);
                return;
            }

            const product = await productService.getById(id);

            if (!product) {
                httpResponse.NotFound(res, errorsDictionary.ITEM_NOT_FOUND);
            }

            if (product.createdBy !== user.email && !admin) {
                httpResponse.Forbidden(res, errorsDictionary.INVALID_CREDENTIALS);
                return;
            }

            const deletedProd = await productService.delete(id);
            if (premium) await sendGmail(user, 'deleteProd')

            return deletedProd
                ? httpResponse.Ok(res, "Product deleted")
                : httpResponse.NotFound(res, errorsDictionary.ITEM_NOT_FOUND);
        } catch (error) {
            next(error);
        }
    }
}



