const createError = require("http-errors");

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    console.log(err);
    res.status(err.statusCode).json({
      success: false,
      errMessage: err.message,
      stack: err.stack,
      error: err,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };

    error.message = err.message;

    // Wrong Mongoose Object ID Error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      createError(400, message);
    }

    // Handling Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      createError(400, message);
    }

    // Handling Mongoose duplicate key errors
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      createError(400, message);
    }

    // Handling wrong JWT error
    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is invalid. Try Again!!!";
      createError(400, message);
    }

    // Handling Expired JWT error
    if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token is expired. Try Again!!!";
      createError(400, message);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = errorHandler;
