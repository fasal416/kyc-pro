const errorHandler = (err, req, res, next) => {
  console.error("Error occurred:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "An unexpected error occurred.";

  res.status(statusCode).json({
    status: statusCode,
    message: message,
  });
};

module.exports = errorHandler;
