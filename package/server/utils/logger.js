const { createLogger, format, transports } = require('winston');
module.exports = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
  ),
  defaultMeta: { service: 'Mixmax Test' },
  transports: [
    new transports.File({
      filename: `${process.cwd()}/logs/error.log`,
      level: 'error'
    }),
    new transports.File({ filename: `${process.cwd()}/logs/combinedlogs.log` })
  ]
});