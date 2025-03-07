const express = require("express");
const { registerUser, loginUser, getUser ,getUserAll} = require("../../controllers/user/userController");
const { submitContact } = require("../../controllers/user/contactController");
const authenticate = require("../../middlewares/authMiddleware");


const router = express.Router();


router.get("/:email", getUser);  
router.get("/", getUserAll); 
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/contact", authenticate, submitContact);

module.exports = router;
