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

        const existingEntry = await Save_Auction.findOne({ user_id, product_id });

        if (existingEntry) {
            await Save_Auction.deleteOne({ user_id, product_id });
            return res.json({ saved: false });
        } else {
            await Save_Auction.create({ user_id, product_id });
            return res.json({ saved: true });
        }
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const checkSavedProduct = async (req, res) => {
    try {
        const { product_id } = req.params;
        const user_id = req.user.id;

        const existingEntry = await Save_Auction.findOne({ user_id, product_id });

        res.json({ saved: !!existingEntry });
    } catch (error) {
        console.error("Error checking saved product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getUserSavedProducts = async (req, res) => {
    try {
        const savedProducts = await Save_Auction.find({ user_id: req.params.userId }).populate("product_id");

        res.json(savedProducts);
    } catch (error) {
        console.error("Error fetching saved products:", error); 
        res.status(500).json({ message: "Error fetching saved products", error: error.message });
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

        const newBid = new Bid({ auction_id: product_id, user_id, amount: bid_amount });
        await newBid.save();

        auction.current_bid = bid_amount;
        await auction.save();

        res.json({ message: "Bid placed successfully", current_bid: auction.current_bid });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};



module.exports = { get_Auction, get_AuctionById, get_RecommendAuction, toggleSave, checkSavedProduct, getUserSavedProducts, place_Bid };

