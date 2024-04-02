import fs from "fs";
import FsDao from "./fs.dao.js";
const path = "./src/persistence/daos/filesystem/data/products.json";

export default class ProductDaoFS extends FsDao {
    constructor() {
        super(path)
    }
    async getProducts() {
        try {
            if (fs.existsSync(path)) {
                const products = await fs.promises.readFile(path, 'utf-8')
                const productsJSON = JSON.parse(products)
                return productsJSON
            } else {
                console.log("List empty")
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }

}        