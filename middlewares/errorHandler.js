const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    error: err.message,
    // STACK SE PRODUCTION
    stack: process.env.DEV_MODE === "development" ? err.stack : null,
  });
};

module.exports = { errorHandler };
