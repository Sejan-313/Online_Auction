const express = require("express");
const { register, login, getUser ,getUserById, updateUser, changePassword } = require("../../controllers/user/authController");
const { submitContact } = require("../../controllers/user/contactController");
const { get_Auction, get_AuctionById, get_RecommendAuction, toggleSave, place_Bid, getUserSavedProducts, checkSavedProduct, getUserBiddedAuctions, getUserBiddingHistory } = require("../../controllers/user/auctionController");
const authenticate = require("../../middlewares/authMiddleware");


const router = express.Router();

// auth
router.post("/login", login);
router.post("/register", register);
router.get("/user-account/:id", getUser);
router.get("/user/:id", getUserById);
router.post("/update-user", authenticate, updateUser);
router.post("/change-password", authenticate, changePassword);

// router.get("/:email", getUser);  
// router.get("/", getUserAll); 

router.get("/auction", get_Auction);
router.get("/auction/:id", get_AuctionById);
router.get("/auction-recommend", get_RecommendAuction);
router.post("/auction-save", authenticate, toggleSave);
router.get("/is-saved/:product_id", authenticate, checkSavedProduct);
router.get("/auction-user-save", authenticate, getUserSavedProducts);
router.post("/place-bid", authenticate, place_Bid);
router.get("/user-bids", authenticate, getUserBiddedAuctions);
router.get("/bidding-history", authenticate, getUserBiddingHistory);


router.post("/contact", authenticate, submitContact);

module.exports = router;
