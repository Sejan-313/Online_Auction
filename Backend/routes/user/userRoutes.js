const express = require("express");
const { registerUser, loginUser } = require("../../controllers/user/userController");
const { submitContact } = require("../../controllers/user/contactController");
const authenticate = require("../../middlewares/authMiddleware");

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/contact", authenticate, submitContact);

module.exports = router;
