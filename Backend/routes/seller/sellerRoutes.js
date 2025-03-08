const express = require("express");
const { createAuction,getAuction,deleteAuction} = require("../../controllers/seller/auctionController");
const authenticate = require("../../middlewares/authMiddleware");
const { register, login} = require("../../controllers/seller/authController");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);

router.post("/add-auction", authenticate, createAuction);

router.get("/auction/:seller_id", getAuction); 


router.delete("/:id",deleteAuction);



module.exports = router;
