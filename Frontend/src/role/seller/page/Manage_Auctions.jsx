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
     <h3 className='text-start w-100 mb-4 border-bottom border-white text-white'>Manage Auctions</h3>
      <div className={css['auction-table']}>
        <table className="w-100">
          <thead className="border border-white" style={{height: "50px"}}>
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
                <td colSpan="9" className={css.noDataMessage}> Data not found </td>
              </tr>
            ) : (
            sellerdata.map((item, index) => {
              return (
                <tr key={item._id} className="border-top border-white mt-5">
                  <td className="text-center text-white">{index+1}</td>
                  <td><img src={`http://localhost:5000/uploads/seller/${item?.image}`} alt="Auction Image" style={{ width: "100px", height: "100px", padding: "7px" }}/></td>
                  <td className="text-white">{item.product_name}</td>
                  <td className="text-white">{item.starting_price}</td>
                  <td className="text-white">{item.increment_price}</td>
                  <td className="text-white">{item.start_date}</td>
                  <td className="text-white">{item.end_date}</td>
                  <td className="text-white">{item.product_type}</td>
                  <td className="text-white">{item.quantity}</td>
                  <td className="text-white">{item.status}</td>
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
