const User = require("../models/user");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.register = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { email, password, username } = req.body;

  if (!email | !password | !username) {
    throw new MyError("Имэйл болон нууц үгээ дамжуулна уу", 400);
  }
  req.body.refPoint = 0;
  req.body.role = "user";
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

exports.login = asyncHandler(async (req, res, next) => {
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

exports.logout = asyncHandler(async (req, res, next) => {
  const cookieOption = {
    expires: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
    // httpOnly: true,
  };
  res.cookie("userId", null, cookieOption);
  res.cookie("email", null, cookieOption);

  res.status(200).cookie("my_blog_token", null, cookieOption).json({
    success: true,
    data: "logged out...",
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new MyError(id + " ID-тэй хэрэглэгч байхгүй.", 400);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  // console.log(req.cookies);
  const token = req.cookies["my-blog-token"];
  const users = await User.find();
  res.status(200).json({
    success: true,
    data: users,
  });
});
