const express = require("express");
const { createAuction } = require("../../controllers/seller/auctionController");
const authenticate = require("../../middlewares/authMiddleware");
const { registerSeller, loginSellerr } = require("../../controllers/seller/sellerController");

const router = express.Router();
router.post("/register", registerSeller);
router.post("/login", loginSellerr);

router.post("/add-auction", authenticate, createAuction);

module.exports = router;
