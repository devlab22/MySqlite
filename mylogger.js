const winston = require('winston');
const { format, transports, createLogger } = require('winston');
const { combine, timestamp, printf, errors, json } = format;
const path = require('path')
const dirname = process.cwd();

class MyLogger {

    constructor(params = {}) {

        const logname = params['logname'] || path.join(dirname, 'logs', 'app.log')
        const exceptions = params['exceptions'] || path.join(dirname, 'logs', 'exceptions.log')
        const rejections = params['rejections'] || path.join(dirname, 'logs', 'rejections.log')
        const debug = params['debug'] || false


        const myFormat = printf(({ level, message, timestamp }) => {
            return `${timestamp} :: ${level} :: ${message}`;
        });

        this.logger = createLogger({
            format: combine(
                errors({ stack: true }),
                json(),
                timestamp(),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                myFormat
            ),
            transports: [new transports.File({ filename: logname })],
            exceptionHandlers: [new transports.File({ filename: exceptions })],
            rejectionHandlers: [new transports.File({ filename: rejections })],
        });

        if (debug) {
            const console = new winston.transports.Console();
            this.logger.add(console)
        }


    }

    getLogger() {
        return this.logger;
    }

    static getInstance(params = {}) {
        return new MyLogger(params).getLogger();
    }

}

module.exports = MyLogger