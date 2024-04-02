import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import MongoStore from 'connect-mongo';
import { connectionString } from '../config/connection.js';
import { faker } from "@faker-js/faker";

const currentDir = dirname(fileURLToPath(import.meta.url));
export const __dirname = dirname(currentDir);
// export const __dirname = dirname(fileURLToPath(import.meta.url));


export const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        ttl: 120,
        crypto: {
            secret: '1234'
        }
    }),
    secret: '1234',
    cookie: { maxAge: 60000 },
    saveUninitialized: false,
    resave: false,
}

//registro
export const createHash = (password) => {
    return hashSync(password, genSaltSync(10));
};

//login
export const isValidPass = (password, user) => {
    return compareSync(password, user.password);
};

//mocks

export const generateProduct = () => ({
    _id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.datatype.number(),
    price: faker.commerce.price(),
    stock: faker.datatype.number(),
    status: faker.datatype.boolean(),
    category: faker.commerce.department(),
    thumbnails: Array.from({ length: 3 }, () => faker.image.imageUrl()),
});

export const generateProducts = (count = 100) =>
    Array.from({ length: count }, generateProduct);