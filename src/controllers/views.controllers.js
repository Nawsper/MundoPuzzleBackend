import ProductService from "../services/product.services.js";
const productService = new ProductService();
import CartServices from "../services/cart.services.js";
const cartService = new CartServices();


export const getProducts = async (req, res, next) => {
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
        res.render('home', {
            products: response.docs.map(item => item.toJSON()),
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

export const getCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const response = await cartService.getCartById(cid);
        res.render('cart', response);
    }
    catch (error) {
        next(error);
    }
}

export const register = (req, res) => {
    res.render('register')
}
export const errorRegister = (req, res) => {
    res.render('errorRegister')
}
export const login = (req, res) => {
    res.render('login')
}
export const errorLogin = (req, res) => {
    res.render('errorLogin')
}
export const profile = (req, res) => {
    console.log("req.user", req.user);
    const user = req.user.toObject();
    res.render('profile', { user })
    console.log(req.session);
}