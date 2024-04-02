import Controllers from "./class.controller.js";
import TicketService from "../services/ticket.services.js";
import errorsDictionary from "../utils/errors.dictionary.js";
import { HttpResponse } from "../utils/http.response.js";

const httpResponse = new HttpResponse();
const ticketService = new TicketService();

export default class TicketController extends Controllers {
    constructor() {
        super(ticketService);
    }

    async generateTicket(req, res, next) {
        try {
            const { _id } = req.user;
            const { cid } = req.params;
            const ticket = await ticketService.generateTicket(_id, cid);
            if (!ticket) return httpResponse.BadRequest(res, errorsDictionary.ITEM_NOT_CREATED);
        } catch (error) {
            next(error);
        }
    }
}