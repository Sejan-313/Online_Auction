const Auction = require("../../models/seller/auctionModel");
const Notification = require("../../models/seller/NotificationModel");
const Bid = require("../../models/user/bidModel");
const FinalBid = require("../../models/user/finalBidModel");

const getAuctionsByStatus = async (req, res) => {
    try {
      const { status } = req.query;
      let query = {};
  
      if (status && status !== "All") {
        query.status = status;
      }
  
      const auctions = await Auction.find(query);
      res.status(200).json(auctions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching auctions", error });
    }
};

const getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find();
    if (!auctions.length) return res.status(404).json({ message: "No auctions found" });
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching auctions", error });
  }
};

const getPendingAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find({status: { $in: ['Pending', 'Inactive'] }});
    if (auctions.length === 0) return res.status(404).json({ message: "Auction not  found " });
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching auctions", error });
  }
};

const getCompleteAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find({status: { $in: ['Complete'] }});
    if (auctions.length === 0) return res.status(404).json({ message: "Auction not  found " });
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching auctions", error });
  }
};

const updateStatus = async (req, res) => {
  try {
      const auction = await Auction.findByIdAndUpdate(
          req.params.id,
          { status: "Approved" },
          { new: true }
      );

      if (!auction) {
          return res.status(404).json({ message: "Auction not found" });
      }

      res.json({ message: "Status updated", auction });
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
};

const rejectAuction = async (req, res) => {
  try {
    const { auctionId, reason } = req.body;

    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    auction.status = "Rejected";
    await auction.save();

    const notification = new Notification({
      auctionId,
      sellerId: auction.seller_id,
      message: `Auction rejected: ${reason}`,
      topic: "rejected",
    });
    await notification.save();

    res.status(200).json({ message: "Auction rejected successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting auction" });
  }
};

const updateAuctionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const auction = await Auction.findById(id);
    if (!auction) return res.status(404).json({ message: "Auction not found" });

    auction.status = status;
    await auction.save();

    res.status(200).json({ message: "Auction status updated", auction });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
};

const deleteAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const auction = await Auction.findByIdAndDelete(id);
    if (!auction) return res.status(404).json({ message: "Auction not found" });

    res.status(200).json({ message: "Auction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting auction", error });
  }
};

const completeAuction = async (req, res) => {
  try {
    const { id } = req.params;

    const auction = await Auction.findById(id);
    if (!auction) return res.status(404).json({ message: "Auction not found" });

    if (auction.status !== "Active") {
      return res.status(400).json({ message: "Only active auctions can be completed" });
    }

    const bidData = await Bid.findOne({ auction_id: id });
    if (!bidData) {
      return res.status(400).json({ message: "No bids found for this auction" });
    }

    let highestBid = { amount: 0, user_id: null };

    bidData.users.forEach(user => {
      user.bids.forEach(bid => {
        if (bid.amount > highestBid.amount) {
          highestBid = { amount: bid.amount, user_id: user.user_id };
        }
      });
    });

    if (!highestBid.user_id) {
      return res.status(400).json({ message: "No valid bids found" });
    }

    const finalBid = new FinalBid({
      auctionId: id,
      winnerId: highestBid.user_id,
      finalAmount: highestBid.amount,
      paymentStatus: "pending",
    });

    await finalBid.save();

    auction.status = "Completed";
    await auction.save();

    res.status(200).json({ message: "Auction completed successfully", finalBid });
  } catch (error) {
    console.error("Error completing auction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFinalBids = async (req, res) => {
  try {
      const finalBids = await FinalBid.find()
          .populate("auctionId")
          .populate("winnerId");

      res.status(200).json(finalBids);
  } catch (error) {
      res.status(500).json({ message: "Error fetching final bids", error });
  }
};

module.exports = { getAuctionsByStatus, getAllAuctions, getPendingAuctions, getCompleteAuctions, updateStatus, rejectAuction, updateAuctionStatus, deleteAuction, completeAuction, getFinalBids };