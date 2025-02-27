const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
    product_name: { type: String, required: true },
    description: { type: String, required: true },
    starting_price: { type: String, required: true },
    increment_price: { type: String, required: true },
    quantity: { type: String, required: true },
    product_type: { type: String, required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: String, default: "Pending", enum: ["Active", "Pending", "Completed"], required: true},
    seller_id: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Auction", auctionSchema);
