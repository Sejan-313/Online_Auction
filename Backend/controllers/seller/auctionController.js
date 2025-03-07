const Auction = require("../../models/seller/auctionModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "uploads/seller/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage }).single("image");

const createAuction = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ error: err.message });
        if (!req.file) return res.status(400).json({ error: "Image is required" });

        try {
            const { product_name, description, starting_price, increment_price, quantity, product_type, start_date, end_date, seller_id } = req.body;

            if (!seller_id) return res.status(400).json({ error: "Seller ID is required" });

            const auction = new Auction({
                product_name,
                description,
                starting_price,
                increment_price,
                quantity,
                product_type,
                start_date,
                end_date,
                image: req.file.filename,
                status: "Active", 
                seller_id, 
            });

            await auction.save();
            res.status(201).json({ message: "Auction added successfully", auction });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    });
};

const getAuction = async (req, res) => {
    try {
      const seller_id = req.params.seller_id;
      const auction = await Auction.find({ seller_id });
      if (auction.length === 0) return res.status(404).json({ message: "Auction not  found" });
      res.status(200).json(auction);
    } catch (error) {
      console.error("Error in getAuction:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  const deleteAuction = async (req, res) => {
    try {
        await Auction.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Auction deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getAuctionAll = async (req, res) => {
  try {  
    const Auction = await Auction.find(); 
    if (!Auction) return res.status(404).json({ message: "User not found" });
    res.status(200).json(seller);  
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
  
  

module.exports = { createAuction,getAuction,deleteAuction,getAuctionAll};
