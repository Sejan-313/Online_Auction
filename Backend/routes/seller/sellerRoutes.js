const express = require("express");
const { registerSeller, loginSellerr } = require("../../controllers/seller/sellerController");

const router = express.Router();
router.post("/register", registerSeller);
router.post("/login", loginSellerr);

module.exports = router;
