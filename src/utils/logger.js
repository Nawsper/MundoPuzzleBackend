import { createLogger, format, transports } from "winston";
import 'dotenv/config'
import { __dirName } from "../dirname.js";


const { combine, printf, timestamp, colorize } = format;


const loggerLevels = {
    debug: 'debug',
    http: 'http',
    info: 'info',
    warning: 'warning',
    error: 'error',
    fatal: 'fatal'
};

const loggerConfigENV = process.env.NODE_ENV === 'dev' ? loggerLevels.debug : loggerLevels.info

const loggerConfig = {

    level: loggerConfigENV,
    format: combine(
        timestamp({
            format: 'MM-DD-YYYY HH:mm:ss'
        }),
        colorize(),
        printf((info) => `${info.level} | ${[info.timestamp]} | ${info.message}`)
    ),

    transports: [
        // produccion
        new transports.File({
            filename: __dirName + "/utils/logs/errors.log",
            level: "error",
        }),

        //desarrollo
        new transports.Console({
            level: loggerConfigENV,
        }),
    ],
}

export const logger = createLogger(loggerConfig)
console.log(loggerConfigENV);

