const express = require("express");
const { createAuction,getAuction,deleteAuction,getAuctionreg} = require("../../controllers/seller/auctionController");
const authenticate = require("../../middlewares/authMiddleware");
const { register, login} = require("../../controllers/seller/authController");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);

router.post("/add-auction", authenticate, createAuction);

router.get("/auction/:seller_id", getAuction);
router.get("/auctionreg/:seller_id", getAuctionreg); 


router.delete("/:id",deleteAuction);



module.exports = router;
