import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import css from './Manage_Auctions.module.css';

const Manage_Auctions = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  
  const [sellerdata, setsellerdata] = useState([]);
  const [msg, setmsg] = useState(false);
  const [filter, setFilter] = useState("");

  const fetchsellerdata = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/admin/seller-auctions`);
      setsellerdata(data);
    } catch (error) {
      console.error("Error fetching Auction data:", error);
      setmsg(true);
    }
  };

  useEffect(() => {
    fetchsellerdata();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = sellerdata.filter(item => {
    const today = new Date().toISOString().split("T")[0];
    switch (filter) {
      case "future":
        return item.start_date > today;
      case "start_today":
        return item.start_date === today && item.status === "Approved";
      case "close_today":
        return item.end_date === today && item.status === "Active";
      case "active":
        return item.status === "Active";
      case "inactive":
        return item.status === "InActive";
      case "rejected":
        return item.status === "Rejected";
      default:
        return true;
    }
  });

  const handleStatusChange = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to ${newStatus} this auction?`)) return;
    try {
      await axios.put(`${API_URL}/admin/auction-status/${id}`, { status: newStatus });
      fetchsellerdata(); 
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleComplete = async (id, status) => {
    if (!window.confirm(`Are you sure you want to mark this auction as ${status}?`)) return;
    try {
        await axios.put(`${import.meta.env.VITE_API_URL}/admin/auction-complete/${id}`);
        alert("Auction marked as completed!");
        fetchsellerdata();  
    } catch (error) {
        console.error("Error updating status:", error);
    }
};

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this auction?")) return;
    try {
      await axios.delete(`${API_URL}/admin/auction/${id}`);
      fetchsellerdata(); 
    } catch (error) {
      console.error("Error deleting auction:", error);
    }
  };

  return (
    <div className="p-5">
      <div className="border-bottom border-white mb-3 d-flex justify-content-between w-100 align-items-center px-5" style={{ height: "50px" }}>
        <h3 className="text-white mb-4">Manage Auction</h3>
        <select className="p-2 border-1 border-white w-25 text-white" style={{backgroundColor: "transparent"}} value={filter} onChange={handleFilterChange}>
          <option style={{color: "white", backgroundColor: "#85CFFE"}} value="">All Auctions</option>
          <option style={{color: "white", backgroundColor: "#85CFFE"}} value="future">Future Auctions</option>
          <option style={{color: "white", backgroundColor: "#85CFFE"}} value="start_today">Today's Auctions (Bidding to Start)</option>
          <option style={{color: "white", backgroundColor: "#85CFFE"}} value="close_today">Today's Auctions (Bidding to Close)</option>
          <option style={{color: "white", backgroundColor: "#85CFFE"}} value="active">Active Auctions</option>
          <option style={{color: "white", backgroundColor: "#85CFFE"}} value="inactive">Inactive Auctions</option>
          <option style={{color: "white", backgroundColor: "#85CFFE"}} value="rejected">Rejected Auctions</option>
        </select>
      </div>

      <div className={css['auction-table']}>
        <table className="w-100">
          <thead className="border border-white" style={{ height: "50px" }}>
            <tr>
              <th className="text-white">#</th>
              <th className="text-white">Image</th>
              <th className="text-white">Product Name</th>
              <th className="text-white">Starting Price</th>
              <th className="text-white">Increment Price</th>
              <th className="text-white">Start Date</th>
              <th className="text-white">End Date</th>
              <th className="text-white">Type</th>
              <th className="text-white">Quantity</th>
              <th className="text-white">Status</th>
              <th className="text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {msg ? (
              <tr>
                <td colSpan="9" className={`text-muted ${css.noDataMessage}`}>Data not found</td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item._id} className="border-top border-white mt-5">
                  <td className="text-white">{index + 1}</td>
                  <td>
                    <img src={`http://localhost:5000/uploads/seller/${item?.image}`} alt="Auction" style={{ width: "100px", height: "100px", padding: "7px" }} />
                  </td>
                  <td className="text-white">{item.product_name}</td>
                  <td className="text-white">{item.starting_price}</td>
                  <td className="text-white">{item.increment_price}</td>
                  <td className="text-white">{item.start_date}</td>
                  <td className="text-white">{item.end_date}</td>
                  <td className="text-white">{item.product_type}</td>
                  <td className="text-white">{item.quantity}</td>
                  <td className="text-white">{item.status}</td>
                  <td className="text-center">
                    {(item.status === "Active" && item.end_date === new Date().toISOString().split("T")[0]) ? (
                      <input
                        type="submit"
                        value="Completed"
                        className={`${css.deleteButton} ms-3 w-75 btn btn-outline-secondary`}
                        onClick={() => handleComplete(item._id, "Completed")}
                      />
                    ) : (
                      <>
                        {(item.status === "Approved" || item.status === "Active" || item.status === "Inactive" || item.status === "Pending") && (
                          <input
                            type="submit"
                            value={item.status === "Active" ? "Inactive" : "Active"}
                            className={`${css.deleteButton} ms-3 btn btn-outline-success`}
                            onClick={() => handleStatusChange(item._id, item.status === "Active" ? "Inactive" : "Active")}
                          />
                        )}
                        <input
                          type="submit"
                          value="Delete"
                          className={`${css.deleteButton} ms-3 btn btn-outline-danger`}
                          onClick={() => handleDelete(item._id)}
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manage_Auctions;
