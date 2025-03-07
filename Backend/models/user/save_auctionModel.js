const mongoose = require("mongoose");

const saved_auctionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Auction", required: true }
}, { timestamps: true });

module.exports = mongoose.model("save_auction", saved_auctionSchema);

