import css from "./User_Account.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const User_Account = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [sellerdata, setsellerdata] = useState([]);
    const [msg, setmsg] = useState(false);
  
    const fetchsellerdata = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/user-account`);
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
        await axios.delete(`${API_URL}/admin/user-account/${pid}`);
        fetchsellerdata();
      } catch (error) {
        console.error("Error deleting Auction:", error);
      }
    };
  
    return (
      <div className="p-5">
        <h3 className='text-start w-100 mb-4 border-bottom text-primary'>User Accounts</h3>
        <div className={css['auction-table']}>
          <table className="w-100">
            <thead className="border" style={{height: "50px"}}>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>City</th>
              <th>Pincode</th>
              <th>Gender</th>
              <th>Birthdate</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
              {msg ? (
                <tr> <td colSpan="9" className={css.noDataMessage}> Data not found </td> </tr>
              ) : (
              sellerdata.map((item, index) => {
                return (
                  <tr key={item._id} className="border-top mt-5">
                    <td className="text-muted">{index+1}</td>
                    <td><img src={`http://localhost:5000/uploads/user/${item?.image}`} alt="Auction Image" style={{ width: "80px", height: "80px", padding: "7px" }}/></td>
                    <td className="text-muted">{item.fullName}</td>
                    <td className="text-muted">{item.email}</td>
                    <td className="text-muted">{item.mobile}</td>
                    <td className="text-muted">{item.address}</td>
                    <td className="text-muted">{item.city}</td>
                    <td className="text-muted">{item.pincode}</td>
                    <td className="text-muted">{item.gender}</td>
                    <td className="text-muted">{item.birthdate}</td>
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

export default User_Account