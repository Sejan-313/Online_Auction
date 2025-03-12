const Auction = require("../../models/seller/auctionModel");
const Save_Auction = require("../../models/user/save_auctionModel");
const Bid = require("../../models/user/bidModel");

const get_Auction = async (req, res) => {
    try {
        const auction = await Auction.find({ status: "Active" }).sort({ createdAt: -1 });
        res.json(auction);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const get_Auction_All = async (req, res) => {
    try {
        const auction = await Auction.find();
        res.json(auction);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const get_AuctionById = async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.id);
        if (!auction) {
            res.status(404).json({ message: "Auction not found" });
        }
        res.json(auction);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const get_RecommendAuction = async (req, res) => {
    try {
        const auction = await Auction.aggregate([
            { $match: { status: "Active" } }, 
            { $sample: { size: 4 } }  
        ]);
        res.json(auction);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const toggleSave = async (req, res) => {
    try {
        const { product_id } = req.body;
        const user_id = req.user.id;

        let savedAuction = await Save_Auction.findOne({ user_id });

        if (!savedAuction) {
            savedAuction = new Save_Auction({ user_id, products: [{ product_id }] });
        } else {
            const index = savedAuction.products.findIndex(p => p.product_id.toString() === product_id);
            if (index !== -1) {
                savedAuction.products.splice(index, 1); // Remove if already saved
            } else {
                savedAuction.products.push({ product_id }); // Add new saved product
            }
        }

        await savedAuction.save();
        res.json({ saved: savedAuction.products.some(p => p.product_id.toString() === product_id) });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const checkSavedProduct = async (req, res) => {
    try {
        const { product_id } = req.params;
        const user_id = req.user.id;

        const savedAuction = await Save_Auction.findOne({ user_id, "products.product_id": product_id });
        res.json({ saved: !!savedAuction });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const getUserSavedProducts = async (req, res) => {
    try {
        const savedAuction = await Save_Auction.findOne({ user_id: req.user.id }).populate("products.product_id");
        res.json(savedAuction ? savedAuction.products.map(p => p.product_id) : []);
    } catch (error) {
        res.status(500).json({ message: "Error fetching saved products" });
    }
};

const getUserBiddedAuctions = async (req, res) => {
    try {
        const userId = req.user.id; 
        const userBids = await Bid.find({ "users.user_id": userId }).populate("auction_id").populate("users.user_id");
        const auctions = userBids.map(bid => bid.auction_id);
        res.status(200).json(auctions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const place_Bid = async (req, res) => {
    try {
        const { product_id, bid_amount } = req.body;
        const user_id = req.user.id;

        const auction = await Auction.findById(product_id);
        if (!auction) return res.status(404).json({ error: "Auction not found" });

        if (bid_amount < auction.current_bid + auction.increment_price) {
            return res.status(400).json({ error: "Bid must be higher than the current bid + increment price" });
        }

        let bid = await Bid.findOne({ auction_id: product_id });

        if (!bid) {
            bid = new Bid({ auction_id: product_id, users: [{ user_id, bids: [{ amount: bid_amount }] }] });
        } else {
            const userBid = bid.users.find(u => u.user_id.toString() === user_id);
            if (userBid) {
                userBid.bids.push({ amount: bid_amount });
            } else {
                bid.users.push({ user_id, bids: [{ amount: bid_amount }] });
            }
        }

        await bid.save();
        auction.current_bid = bid_amount;
        await auction.save();

        res.json({ message: "Bid placed successfully", current_bid: auction.current_bid });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const getUserBiddingHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const userBids = await Bid.find({ "users.user_id": userId }).populate("auction_id");

        let biddingHistory = [];
        userBids.forEach(bid => {
            const user = bid.users.find(u => u.user_id.toString() === userId);
            if (!user || !user.bids.length) return;
        
            user.bids.forEach((userBid, index, bidsArray) => {
                biddingHistory.push({
                    product: bid.auction_id?.product_name || "Unknown Product",
                    amount: userBid.amount,
                    lastBid: index > 0 ? bidsArray[index - 1]?.amount || 0 : 0,
                    bidCount: bidsArray.length,
                    status: "Winning",
                    bidDate: new Date(userBid.bid_time).toLocaleDateString("en-GB"), 
                    bidTime: new Date(userBid.bid_time).toLocaleTimeString("en-GB", {hour: "2-digit", minute: "2-digit"})
                });
            });
        });

        res.status(200).json(biddingHistory);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


module.exports = { get_Auction, get_AuctionById, get_RecommendAuction, toggleSave, checkSavedProduct, getUserSavedProducts, place_Bid,get_Auction_All, getUserBiddedAuctions, getUserBiddingHistory };

