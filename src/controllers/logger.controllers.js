import { logger } from "../utils/logger.js";

export const loggerTest = (req, res) => {
    logger.debug("Debug logger message");
    logger.http("HTTP logger message");
    logger.info("Info logger message");
    logger.warn("Warning logger message");
    logger.error("Error logger message");
    logger.error("Fatal logger message");

    const response = {
        message: "Logger test",
        levelsTested: ["debug", "http", "info", "warning", "error", "fatal"]
    };

    res.json(response);
};