import axios from "axios";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
 

const UserProfile = () =>
{


  const API_URL = import.meta.env.VITE_API_URL;

  const [userdata, setuserdata] = useState([]);

  useEffect(() => {
      const id = localStorage.getItem("user_id"); 
      if (id) {
        fetchuserdata(id);
      } else {
        console.error("No user ID found in localStorage.");
      }
  }, []);

  const fetchuserdata = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/user/user/${id}`); 
      setuserdata(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (<>
  <section class="section about-section gray-bg body" id="about">
          <div>
            <div class="container">
                <div class="row align-items-center flex-row-reverse">
                    <div class="col-lg-6">
                        <div class="about-text go-to">
                            <h3 class="dark-color">{userdata.fullName}</h3>
                            {/* <h6 class="theme-color lead">A Lead UX &amp; UI designer based in Canada</h6>
                            <p>I <mark>design and develop</mark> services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.</p> */}
                            <div class="row about-list">
                                <div class="col-md-6">
                                    <div class="media">
                                        <label>Birthday</label>
                                        <p>{userdata.birthdate}</p>
                                    </div>
                                    <div class="media">
                                        <label>Gender</label>
                                        <p>{userdata.gender}</p>
                                    </div>
                                    <div class="media">
                                        <label>Residence</label>
                                        <p>India</p>
                                    </div>
                                    <div class="media">
                                        <label>Address</label>
                                        <p>{userdata.address}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="media">
                                        <label>E-mail</label>
                                        <p>{userdata.email}</p>
                                    </div>
                                    <div class="media">
                                        <label>Phone</label>
                                        <p>{userdata.mobile}</p>
                                    </div>
                                    <div class="media">
                                        <label>City</label>
                                        <p>{userdata.city}</p>
                                    </div>
                                    <div class="media">
                                        <label>Pincode</label>
                                        <p>{userdata.pincode}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link to="update-profile"><input type="submit" value="Update Profile" className="btn btn-info mt-5"></input></Link>

                    </div>
                    <div class="col-lg-6">
                        <div class="about-avatar">
                            <img  src={`http://localhost:5000/uploads/user/${userdata?.image}`} class="img" alt="Profile Picture"  style={{ width: '400px', height: 'auto' }}/>
                            </div>
                        </div>
                    </div>
                    
                </div>
                {/* <div class="counter">
                    <div class="row">
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="500" data-speed="500">500</h6>
                                <p class="m-0px font-w-600">Happy Clients</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="150" data-speed="150">150</h6>
                                <p class="m-0px font-w-600">Project Completed</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="850" data-speed="850">850</h6>
                                <p class="m-0px font-w-600">Photo Capture</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="190" data-speed="190">190</h6>
                                <p class="m-0px font-w-600">Telephonic Talk</p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
   </section>
  </>)
};

export default UserProfile;