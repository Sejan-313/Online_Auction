const express = require("express");
const { getsellrAll } = require("../../controllers/seller/authController");
const {  getUser ,getUserAll} = require("../../controllers/user/authController");
const {get_Auction_All} = require("../../controllers/user/auctionController");

const router = express.Router();
router.get("/:email", getUser);  
router.get("/all/user", getUserAll); 
router.get("/all/seller", getsellrAll);
router.get("/all/auction", get_Auction_All);

module.exports = router;
