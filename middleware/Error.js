module.exports.ErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";
  
    console.log(err);
  
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  };
