const {constants} = require('../constants');
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500; // Set default to 500 if not set
//   res.status(statusCode);

   switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Bad Request",
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack trace in production
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
      });
      break;
    case constants.INTERNAL_SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: "An unexpected error occurred.",
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
      });
      break;
    default:
      res.json({
        title: "Default Error",
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
      });
    }
}

module.exports = errorHandler;