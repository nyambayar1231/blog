const express = require("express");
const { createUser, AdminLogin } = require("../controllers/admins");
const { getUsers } = require("../controllers/users");

const router = express.Router();
const { protect, authorize } = require("../middleware/protect");

router.route("/createAdmin").post(createUser);
router.route("/login").post(AdminLogin);
router.route("/users").get(getUsers);

router.use(protect);

// router.route("/").get(getUser);

module.exports = router;
