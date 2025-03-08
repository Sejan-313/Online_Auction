const express = require("express");
const { createAuction,getAuction,deleteAuction  ,getAuctionAll} = require("../../controllers/seller/auctionController");
const authenticate = require("../../middlewares/authMiddleware");
const { register, login, getsellrAll } = require("../../controllers/seller/authController");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);

router.post("/add-auction", authenticate, createAuction);
router.get("/:seller_id", getAuction); 


router.delete("/:id",deleteAuction);
// router.get("/", getsellrAll);


module.exports = router;
