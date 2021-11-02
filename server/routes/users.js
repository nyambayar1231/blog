const express = require("express");
const { login, register, logout, getUser } = require("../controllers/users");
const router = express.Router();
const { protect, authorize } = require("../middleware/protect");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.use(protect);

router.route("/").get(getUser);

module.exports = router;
