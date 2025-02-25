const express = require("express");
const { registerUser, loginUser, getUser } = require("../../controllers/user/userController");

const router = express.Router();


router.get("/:email", getUser);  

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
