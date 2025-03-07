const express = require("express");
const { register, login, getUser ,getUserAll} = require("../../controllers/user/authController");
const { submitContact } = require("../../controllers/user/contactController");
const { get_Auction, get_AuctionById, get_RecommendAuction, toggleSave, place_Bid, getUserSavedProducts, checkSavedProduct } = require("../../controllers/user/auctionController");
const authenticate = require("../../middlewares/authMiddleware");


const router = express.Router();

// auth
router.post("/login", login);
router.post("/register", register);
router.get("/user-account/:id", getUser);

// router.get("/:email", getUser);  
// router.get("/", getUserAll); 

// auction
router.get("/auction", get_Auction);
router.get("/auction/:id", get_AuctionById);
router.get("/auction-recommend", get_RecommendAuction);
router.post("/auction-save", authenticate, toggleSave);
router.get("/is-saved/:product_id", authenticate, checkSavedProduct);
router.get("/auction-user-save/:userId", getUserSavedProducts);
router.post("/place-bid", authenticate, place_Bid);


router.post("/contact", authenticate, submitContact);

module.exports = router;
