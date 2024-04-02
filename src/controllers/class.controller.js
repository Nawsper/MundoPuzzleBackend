import errorsDictionary from "../utils/errors.dictionary.js";
import { HttpResponse } from "../utils/http.response.js";

const httpResponse = new HttpResponse();

export default class Controllers {
    constructor(service) {
        this.service = service;
    }

    getAll = async (req, res, next) => {
        try {
            const items = await this.service.getAll();
            return httpResponse.Ok(res, items);
        } catch (error) {
            next(error);
        }
    };

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await this.service.getById(id);
            if (!item)
                return httpResponse.NotFound(res, errorsDictionary.ITEM_NOT_FOUND);
            else return httpResponse.Ok(res, item);
        } catch (error) {
            next(error);
        }
    };

    create = async (req, res, next) => {
        try {
            const newItem = await this.service.create(req.body);
            if (!newItem)
                return httpResponse.BadRequest(res, errorsDictionary.ITEM_NOT_CREATED);
            else return httpResponse.Ok(res, newItem);
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await this.service.getById(id);
            if (!item) return httpResponse.NotFound(res, errorsDictionary.ITEM_NOT_FOUND);
            else {
                const itemUpd = await this.service.update(id, req.body);
                return httpResponse.Ok(res, itemUpd);
            }
        } catch (error) {
            next(error);
        }
    };

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await this.service.getById(id);
            if (!item) return httpResponse.NotFound(res, errorsDictionary.ITEM_NOT_FOUND)
            else {
                const itemDel = await this.service.delete(id);
                return httpResponse.Ok(res, itemDel);
            }
        } catch (error) {
            next(error);
        }
    };
}