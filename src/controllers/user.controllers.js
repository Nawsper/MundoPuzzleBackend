import Controllers from './class.controller.js';
import UserService from '../services/user.services.js';
import errorsDictionary from "../utils/errors.dictionary.js";
import { HttpResponse } from "../utils/http.response.js";

const httpResponse = new HttpResponse();
const userService = new UserService();

export default class UserControllers extends Controllers {
    constructor() {
        super(userService)
    }

    async register(req, res, next) {
        try {
            const newUser = await userService.register(req.body);
            if (!newUser) return httpResponse.Conflict(res, errorsDictionary.USER_EXISTS);
            else return httpResponse.Ok(res, newUser)
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await userService.login({ email, password });
            if (!user) {
                return httpResponse.Unauthorized(res, errorsDictionary.INVALID_CREDENTIALS);
            } else {
                res
                    .cookie('token', user, { httpOnly: true })
                    .json({ msg: 'Login OK', user })
            }
        } catch (error) {
            next(error);
        }
    }

    async getByIdDTO(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.getByIdDTO(id);
            if (!user) return httpResponse.NotFound(res, errorsDictionary.ITEM_NOT_FOUND);
            else return httpResponse.Ok(res, user);
        } catch (error) {
            next(error);
        }
    };


    async deleteUsers(req, res) {
        try {
            const response = await userService.deleteUsers();
            if (!response) return httpResponse.Unauthorized(res, errorsDictionary.INVALID_CREDENTIALS);
            return httpResponse.Ok(res, `${response.deletedCount} users have been deleted`)
        } catch (error) {
            next(error);
        }
    }

}
