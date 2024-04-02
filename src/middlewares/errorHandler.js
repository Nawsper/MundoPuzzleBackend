import { HttpResponse } from "../utils/http.response.js";
import errorsDictionary from "../utils/errors.dictionary.js";
import { logger } from "../utils/logger.js"

const httpResponse = new HttpResponse()

export const errorHandler = (error, req, res, next) => {

    logger.debug(error);

    const status = error.statusCode || 500;
    const message = error.message || errorsDictionary.DEFAULT;

    console.log(status);

    switch (status) {
        case 200:
            return httpResponse.Ok(res, message);
        case 400:
            logger.warning(message);
            return httpResponse.BadRequest(res, message);
        case 404:
            logger.warning(message);
            return httpResponse.NotFound(res, message);
        case 401:
            logger.warning(message);
            return httpResponse.Unauthorized(res, message);
        case 403:
            logger.warning(message);
            return httpResponse.Forbidden(res, message);
        case 409:
            logger.warning(message);
            return httpResponse.Conflict(res, message);
        default:
            logger.error(message);
            return httpResponse.ServerError(res, message);
    }

}