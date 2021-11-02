const User = require("../models/user");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.createUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { email, password, username } = req.body;
  req.body.role = "admin";
  if (!email | !password | !username) {
    throw new MyError("Имэйл болон нууц үгээ дамжуулна уу", 400);
  }
  const user = await User.create(req.body);
  const token = user.getJsonWebToken();

  const cookieOption = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    // httpOnly: true,
  };

  res
    .status(200)
    .cookie(["my-blog-token", "userId"], [token, user._id], cookieOption)
    .json({
      success: true,
      token,
      user,
    });
});

exports.AdminLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email | !password) {
    throw new MyError("Имэйл болон нууц үгээ дамжуулна уу", 400);
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    throw new MyError("Имэйл болон нууц үгээ зөв оруулна уу", 401);
  }

  const ok = await user.checkPassword(password);

  if (!ok) {
    throw new MyError("Имэйл болон нууц үгээ зөв оруулна уу", 401);
  }

  if (user.role !== "admin") {
    throw new MyError("Уучлаарай заавал Админ хэрэглэгч орох боломтой", 401);
  }

  const token = user.getJsonWebToken();

  const cookieOption = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    // httpOnly: true,
  };

  res.cookie("userId", user._id, cookieOption);
  res.cookie("email", user.email, cookieOption);
  res.status(200).cookie("my_blog_token", token, cookieOption).json({
    success: true,
    token,
    user: user,
  });
});
