import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import css from './Manage_Auctions.module.css';

const Manage_Auctions = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [sellerdata, setsellerdata] = useState([]);
  const [msg, setmsg] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("seller_id");

    if (id) {
      fetchsellerdata(id);
    } else {
      console.error("No user ID found in localStorage.");
    }
  }, []);

  const fetchsellerdata = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/seller/auction/${id}`);
      setsellerdata(response.data);
    } catch (error) {
      console.error("Error fetching Auction data:", error);
      setmsg(true);
    }
  };

  const handleDelete = async (pid) => {
    if (!window.confirm("Are you sure you want to delete this auction?")) return;
    try {
      const id = localStorage.getItem("seller_id");
      await axios.delete(`${API_URL}/seller/${pid}`);
      fetchsellerdata(id);
    } catch (error) {
      console.error("Error deleting Auction:", error);
    }
  };

  return (
     <div className="p-5">
     <h3 className='text-start w-100 mb-4 border-bottom' style={{color: "#4A90E2"}}>Manage Auctions</h3>
      <div className={css['auction-table']}>
        <table className="w-100">
          <thead className="border" style={{height: "50px"}}>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Starting Price</th>
            <th>Increment Price</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
            {msg ? (
              <tr>
                <td colSpan="9" className={`text-secondary ${css.noDataMessage}`}> Data not found </td>
              </tr>
            ) : (
            sellerdata.map((item, index) => {
              return (
                <tr key={item._id} className="border-top border-white mt-5">
                  <td className="text-center text-secondary">{index+1}</td>
                  <td><img src={`http://localhost:5000/uploads/seller/${item?.image}`} alt="Auction Image" style={{ width: "100px", height: "100px", padding: "7px" }}/></td>
                  <td className="text-secondary">{item.product_name}</td>
                  <td className="text-secondary">{item.starting_price}</td>
                  <td className="text-secondary">{item.increment_price}</td>
                  <td className="text-secondary">{item.start_date}</td>
                  <td className="text-secondary">{item.end_date}</td>
                  <td className="text-secondary">{item.product_type}</td>
                  <td className="text-secondary">{item.quantity}</td>
                  <td className="text-secondary">{item.status}</td>
                  <td>
                  <Link to={`/seller/update-auction/${item._id}`}>
                      <input type="submit" value="Update" className={`${css.updateButton} btn btn-outline-success`} />
                  </Link>
                  <input type="submit" value="Delete" className={`${css.deleteButton} ms-3 btn btn-outline-danger`} onClick={() => handleDelete(item._id)}/>
                  </td>
                </tr>
              );
            })
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manage_Auctions;
