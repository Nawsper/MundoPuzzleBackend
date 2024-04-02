import { ProductModel } from "./models/product.model.js";
import MongoDao from "./mongo.dao.js";


export default class ProductDaoMongo extends MongoDao {
    constructor() {
        super(ProductModel)
    }

    async getProducts(queryParams) {
        try {
            const { limit = 10, page = 1, sort, query, status } = queryParams;

            const options = {
                page: parseInt(page),
                limit: parseInt(limit),
            };

            const filter = {};

            if (query) {
                filter.category = { $regex: query, $options: "i" };
            }

            if (status === 'available') {
                filter.stock = { $gt: 0 };
            } else if (status === 'unavailable') {
                filter.stock = { $eq: 0 };
            }


            let sortOptions = {};

            if (sort === "asc") {
                sortOptions.price = 1;
            } else if (sort === "desc") {
                sortOptions.price = -1;
            }

            const response = await this.model.paginate(filter, {
                ...options,
                sort: sortOptions,
            });

            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}        