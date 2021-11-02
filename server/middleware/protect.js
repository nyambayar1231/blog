const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const MyError = require("../utils/myError");
const User = require("../models/user");

exports.protect = asyncHandler(async (req, res, next) => {
  let token = null;

  if (req.headers.authorization) {
    token = await req.headers.authorization.split(" ")[1];
  } else if (req.cookies) {
    token = req.cookies["amazon-token"];
  }

  if (!token) {
    throw new MyError(
      "Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна. Та эхлээд логин хийнэ үү. Authorization header-ээр эсвэл Cookie  ашиглан токеноо дамжуулна уу",
      401
    );
  }

  const tokenObj = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = tokenObj.id;
  req.userRole = tokenObj.role;
  next();
});

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      throw new MyError(
        "Таны эрх [" +
          req.userRole +
          "] энэ үйлдэлийг гүйцэтгэхэд хүрэлцэхгүй байна.",
        403
      );
    }
    next();
  };
};
