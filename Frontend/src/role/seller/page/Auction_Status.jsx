import { useState, useEffect } from "react";
import axios from "axios";
import css from "./Auction_Status.module.css"

const AuctionStatus = () => {
  const [auctionData, setAuctionData] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchAuctions = async (status) => {
    const token = localStorage.getItem("token");
    const seller_id = localStorage.getItem("seller_id");
    if (!token) return; 
  
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/seller/auctions-status`,
        {
          params: { status, seller_id },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAuctionData(data);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };  

  useEffect(() => {
    fetchAuctions("All");
  }, []);

  const handleFilterChange = (status) => {
    setFilter(status);
    fetchAuctions(status);
  };

  return (
    <div className="h-100 p-5">
      <div className="w-50 m-auto d-flex justify-content-center gap-2 mb-3">
        {["All", "Pending", "Active", "Rejected"].map((status) => (
          <button
            key={status}
            className={filter === status ? "text-primary bg-light" : "text-muted bg-light"}
            onClick={() => handleFilterChange(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="border-bottom mb-3"></div>
      <div className={css['auction-table']}>
        <table className="w-100">
          <thead className="border">
            <tr>
              <th>Product Name</th>
              <th>Status</th>
              <th>Quantity</th>
              <th>Starting Price</th>
              <th>Current Bid</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {auctionData.map((item) => (
              <tr key={item._id} className="border-top">
                <td>{item.product_name}</td>
                <td>{item.status}</td>
                <td>{item.quantity}</td>
                <td>{item.starting_price}</td>
                <td>{item.current_bid}</td>
                <td>{item.start_date}</td>
                <td>{item.end_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuctionStatus;
