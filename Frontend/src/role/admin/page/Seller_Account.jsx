import css from "./Seller_Account.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Seller_Account = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [sellerdata, setsellerdata] = useState([]);
    const [msg, setmsg] = useState(false);
  
    const fetchsellerdata = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/seller-account`);
        const formattedData = response.data.map(user => ({
            ...user,
            birthdate: new Date(user.birthdate).toLocaleDateString("en-GB"), 
        }));
        setsellerdata(formattedData);
      } catch (error) {
        console.error("Error fetching Auction data:", error);
        setmsg(true);
      }
    };

    useEffect(() => {
      fetchsellerdata();
    }, []);
  
    const handleDelete = async (pid) => {
      try {
        await axios.delete(`${API_URL}/admin/seller-account/${pid}`);
        fetchsellerdata();
      } catch (error) {
        console.error("Error deleting Auction:", error);
      }
    };
  
    return (
      <div className="p-5">
        <h3 className='text-start w-100 mb-4 border-bottom border-white text-white'>Seller Accounts</h3>
        <div className={css['auction-table']}>
          <table className="w-100">
            <thead className="border border-white" style={{height: "50px"}}>
            <tr>
              <th className="text-white">#</th>
              <th className="text-white">Image</th>
              <th className="text-white">Full Name</th>
              <th className="text-white">Email</th>
              <th className="text-white">Mobile</th>
              <th className="text-white">Address</th>
              <th className="text-white">City</th>
              <th className="text-white">Pincode</th>
              <th className="text-white">Gender</th>
              <th className="text-white">Birthdate</th>
              <th className="text-white">Action</th>
            </tr>
            </thead>
            <tbody>
              {msg ? (
                <tr> <td colSpan="9" className={css.noDataMessage}> Data not found </td> </tr>
              ) : (
              sellerdata.map((item, index) => {
                return (
                  <tr key={item._id} className="border-top border-white mt-5">
                    <td className="text-white">{index+1}</td>
                    <td className="text-white"><img src={`http://localhost:5000/uploads/seller/${item?.image}`} alt="Auction Image" style={{ width: "80px", height: "80px", padding: "7px" }}/></td>
                    <td className="text-white">{item.fullName}</td>
                    <td className="text-white">{item.email}</td>
                    <td className="text-white">{item.mobile}</td>
                    <td className="text-white">{item.address}</td>
                    <td className="text-white">{item.city}</td>
                    <td className="text-white">{item.pincode}</td>
                    <td className="text-white">{item.gender}</td>
                    <td className="text-white">{item.birthdate}</td>
                    <td>
                    <Link to={`/seller/update-auction/${item._id}`}>
                        <input type="submit" value="Active" className={`${css.updateButton} btn btn-outline-success`} />
                    </Link>
                    <input type="submit" value="Delete" className={`${css.deleteButton} ms-3 btn btn-outline-danger`}
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    />
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
}

export default Seller_Account