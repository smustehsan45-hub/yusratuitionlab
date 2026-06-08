const errorHandler = (err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    details: err.details || null,
  });
};

const notFound = (req, res, next) => {
  res.status(404).json({ message: "Route not found." });
};

module.exports = {
  errorHandler,
  notFound,
};
