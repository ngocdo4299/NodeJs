import winston from 'winston'
import 'winston-daily-rotate-file'
const transport = new winston.transports.DailyRotateFile({
    filename: '%DATE%.log',
    dirname: '../logs/',
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
});

const logger = winston.createLogger({
    transports: [
        transport
    ]
});

export const createErrorLog = (data) => {
    return logger.error(data)
}