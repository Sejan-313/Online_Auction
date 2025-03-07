const express = require("express");
const { createAuction,getAuction,deleteAuction  ,getAuctionAll} = require("../../controllers/seller/auctionController");
const authenticate = require("../../middlewares/authMiddleware");
const { registerSeller, loginSellerr,getsellrAll } = require("../../controllers/seller/sellerController");

const router = express.Router();
router.post("/register", registerSeller);
router.post("/login", loginSellerr);

router.post("/add-auction", authenticate, createAuction);
router.get("/auction/:seller_id", getAuction); 
router.get("/all", getAuctionAll);

router.delete("/:id",deleteAuction);
router.get("/", getsellrAll);


module.exports = router;
