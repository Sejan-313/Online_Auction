const express = require("express");
const { getsellrAll } = require("../../controllers/seller/authController");
const { getUserAll} = require("../../controllers/user/authController");
const {get_Auction_All } = require("../../controllers/user/auctionController");
const {updateAuctionAprove,updateAuctionRejectDescription} = require("../../controllers/seller/auctionController");

const router = express.Router();
 
router.get("/all/user", getUserAll); 
router.get("/all/seller", getsellrAll);
router.get("/all/auction", get_Auction_All);
router.put('/approve/:id', updateAuctionAprove);
router.put('/rejectproduct/:id', updateAuctionRejectDescription);




module.exports = router;
