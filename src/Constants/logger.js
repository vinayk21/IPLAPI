// Import necessary modules from winston
const { createLogger, transports, format } = require('winston');
const { combine, timestamp, label, printf } = format;

// Define log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// Create a logger instance
const logger = createLogger({
  format: combine(
    label({ label: 'IPLAPI' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(), // Log to console
  ]
});

// Export the logger instance to be used in other modules
module.exports = logger;
