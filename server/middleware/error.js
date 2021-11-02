const errorHandler = (err, req, res, next) => {
  console.log(err.stack.cyan.underline);

  const error = { ...err };

  error.message = err.message;

  // if(err.name === 'CastError') {
  //     error.message = 'Энэ ID буруу бүтэцтэй байна!';
  //     error.statusCode = 400;
  // }

  // jwt malformed

  if (err.message === "jwt malformed") {
    error.message = "Та логин хийж байж энэ үйлдэлийг хийх боломжтой";
    error.statusCode = 401;
  }

  if (
    (err.name === "JsonWebTokenError" && err.message === "invalid token") ||
    err.message === "invalid signature"
  ) {
    error.message = "Буруу токен дамжуулсан байна";
    error.statusCode = 400;
  }
  if (error.code === 11000) {
    error.message = "Энэ талбарын утгыг давхардуулж өгч болохгүй ээ.!";
    error.statusCode = 400;
  }
  res.status(err.statusCode || 500).json({
    success: false,
    error,
  });
};

module.exports = errorHandler;
