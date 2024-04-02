import { createHash, isValidPass } from '../../../utils/utils.js';
import { UserModel } from './models/user.models.js'
import { sendGmail } from '../../../services/email.service.js';
import MongoDao from "./mongo.dao.js";

export default class UserDaoMongo extends MongoDao {
    constructor() {
        super(UserModel)
    }

    async register(user) {
        try {
            const { email, password } = user;
            const existUser = await this.getByEmail(email);
            if (!existUser) {
                if (email === 'admin@mail.com' && password === '100') {
                    const newUser = await this.model.create({
                        ...user,
                        password: createHash(password),
                        role: 'admin',
                        last_connection: Date.now()
                    });
                    return newUser;
                }
                const newUser = await this.model.create({
                    ...user,
                    password: createHash(password),
                    last_connection: Date.now()
                });
                return newUser;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async login(user) {
        try {
            const { email, password } = user;
            const userExist = await this.getByEmail(email);
            if (userExist) {
                const passValid = isValidPass(password, userExist)
                if (!passValid) return false
                else {
                    this.update(userExist._id, { last_connection: Date.now() });
                    return userExist
                }
            } return false
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getByEmail(email) {
        try {
            const userExist = await this.model.findOne({ email });
            if (userExist) {
                return userExist
            } return false
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteUsers() {
        try {
            const filter = {
                $and: [
                    { role: { $ne: 'admin' } },
                    { last_connection: { $lte: new Date(new Date().setDate(new Date().getDate() - 2)) } }
                ]
            };

            const expiredUser = await this.find(filter)
            for (let index = 0; index < expiredUser.length; index++) {
                await sendGmail(expiredUser[index], 'deleteUsers');
            }

            const deleteUsers = await this.deleteMany(filter);
            if (!deleteUsers) return false;
            else return deleteUsers;

        } catch (error) {
            throw new Error(error.message);
        }
    }
}