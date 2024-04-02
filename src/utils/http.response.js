const HttpStatus = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};

export class HttpResponse {
    Ok(res, data) {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: "Success",
            data: data,
        });
    }

    BadRequest(res, data) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: "Bad Request",
            error: data,
        });
    }

    NotFound(res, data) {
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            message: "Not Found",
            error: data,
        });
    }

    Unauthorized(res, data) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            message: "Unauthorized",
            error: data,
        });
    }

    Forbidden(res, data) {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            message: "Forbidden",
            error: data,
        });
    }

    Conflict(res, data) {
        return res.status(HttpStatus.CONFLICT).json({
            status: HttpStatus.CONFLICT,
            message: "Conflict",
            error: data,
        });
    }

    ServerError(res, data) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
            error: data,
        });
    }
}