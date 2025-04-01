import { useState, useEffect } from "react";
import axios from "axios";
import css from "./Auction_Status.module.css"

const AuctionStatus = () => {
  const [auctionData, setAuctionData] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchAuctions = async (status) => {
    const token = localStorage.getItem("token");
    if (!token) return; 
  
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/auctions-status`,
        {
          params: { status },
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
        {["All", "Active", "Inactive", "Pending", "Rejected", "Approved", "Completed"].map((status) => (
          <button
            key={status}
            style={{border: "none", width: "100px", height: "40px", backgroundColor: "transparent"}}
            className={filter === status ? "text-primary bg-white" : "text-white"}
            onClick={() => handleFilterChange(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="border-bottom border-white mb-3"></div>
      <div className={css['auction-table']}>
        <table className="w-100">
          <thead className="border border-white">
            <tr>
              <th className="text-white">Product Name</th>
              <th className="text-white">Status</th>
              <th className="text-white">Quantity</th>
              <th className="text-white">Starting Price</th>
              <th className="text-white">Current Bid</th>
              <th className="text-white">Start Date</th>
              <th className="text-white">End Date</th>
            </tr>
          </thead>
          <tbody>
            {auctionData.map((item) => (
              <tr key={item._id} className="border-top border-white">
                <td className="text-white">{item.product_name}</td>
                <td className="text-white">{item.status}</td>
                <td className="text-white">{item.quantity}</td>
                <td className="text-white">{item.starting_price}</td>
                <td className="text-white">{item.current_bid}</td>
                <td className="text-white">{item.start_date}</td>
                <td className="text-white">{item.end_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuctionStatus;
