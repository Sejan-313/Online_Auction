import axios from "axios";
import { useState,useEffect } from "react";
import css from "./UserProfile.module.css";
 
const UserProfile = () =>
{


  const API_URL = import.meta.env.VITE_API_URL;

  const [userdata, setuserdata] = useState([]);
  useEffect(() => {
      const id = localStorage.getItem("seller_id"); 
      if (id) {
        fetchuserdata(id);
      } else {
        console.error("No user ID found in localStorage.");
      }
  }, []);

  const fetchuserdata = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/seller/user/${id}`); 
      setuserdata(response.data);
      
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div class={`${css['UserProfile']} p-5`}>
      <div className="h-50 w-100 d-flex gap-5">
        <div>
              <img  src={`http://localhost:5000/uploads/seller/${userdata?.image}`} class="img" alt="Profile Picture" className="rounded"  style={{ width: '200px', height: '200px',  }}/>
        </div>
        <div className="w-50">
                <div class="about-text go-to">
                    <h3 class="text-white mb-4 border-bottom border-white">{userdata.fullName}</h3>
                    <div class="row about-list">
                        <div class="col-md-6">
                            <div class="media">
                                <label className="text-white">Birthday</label>
                                <p className="text-white">{new Date(userdata.birthdate).toLocaleDateString('en-GB')}</p>
                            </div>
                            <div class="media">
                                <label className="text-white">Gender</label>
                                <p className="text-white">{userdata.gender}</p>
                            </div>
                            <div class="media">
                                <label className="text-white">Address </label>
                                <p className="text-white"> {userdata.address}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="media">
                                <label className="text-white">E-mail</label>
                                <p className="text-white">{userdata.email}</p>
                            </div>
                            <div class="media">
                                <label className="text-white">Phone</label>
                                <p className="text-white">{userdata.mobile}</p>
                            </div>
                            <div class="media">
                                <label className="text-white">City</label>
                                <p className="text-white">{userdata.city}</p>
                            </div>
                            <div class="media">
                                <label className="text-white">Pincode</label>
                                <p className="text-white">{userdata.pincode}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
      </div>
    </div>
  )
};

export default UserProfile;