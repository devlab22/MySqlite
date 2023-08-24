const winston = require('winston')
const { format, transports, createLogger } = require('winston');
const { combine, timestamp, printf } = format;

class MyLogger {

    constructor(logname = 'app.log', exceptions='exceptions.log', rejections='rejections.log') {

        const myFormat = printf(({ level, message, timestamp }) => {
            return `${timestamp} :: ${level} :: ${message}`;
        });


        this.logger = createLogger({
            format: combine(
                timestamp(),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                myFormat
            ),
            transports: [
                new transports.Console(),
                new transports.File({ filename: logname })
            ],
            exceptionHandlers: [new transports.File({ filename: exceptions })],
            rejectionHandlers: [new transports.File({ filename: rejections })],
        });
    }

    getLogger() {
        return this.logger;
    }

}

module.exports = MyLogger