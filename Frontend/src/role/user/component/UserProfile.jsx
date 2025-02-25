import { Link } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { useState, useEffect } from 'react';
import axios from 'axios';  // Make sure to import axios

const UserProfile = () => {

  const API_URL = import.meta.env.VITE_API_URL;

  const [students, setStudents] = useState([]);

  useEffect(() => {
      const id = localStorage.getItem("email"); // Get the id from localStorage
      if (id) {
        fetchStudents(id);
      } else {
        console.error("No user ID found in localStorage.");
      }
  }, []);

  const fetchStudents = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/user/${id}`); 
      setStudents(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };
  

  return (
    <>
    <div  style={{backgroundColor:"silver",height:"100%", width:"100%"}}>
      <div>
        <Link to="/" className='userhome'>
          <IoHome />
        </Link>
      </div>

<div style={{backgroundColor:"silver",height:"100%", width:"100%",position:"relative",bottom:"40px",}}>
  
    <div class="container py-5">
        <div class="row">
            <div class="col-12 mb-4">
                <div class="text-center">
                    <div class="position-relative d-inline-block">
                        <img src="https://randomuser.me/api/portraits/men/40.jpg" class="rounded-circle profile-pic" alt="Profile Picture" />
                    </div>
                    <h3 class="mt-3 mb-1">{students.fullName}</h3>
                    <p class="text-muted mb-3">Senior Product Designer</p>
                    {/* <div class="d-flex justify-content-center gap-2 mb-4">
                        <button class="btn btn-outline-primary"><i class="fas fa-envelope me-2"></i>Message</button>
                        <button class="btn btn-primary"><i class="fas fa-user-plus me-2"></i>Connect</button>
                    </div> */}
                </div>
            </div>

            <div class="col-12">
                <div class="card border-0 shadow-sm">
                    <div class="card-body p-0">
                        <div class="row g-0">
                            <div class="col-lg-9">
                                <div class="p-4">
                                    <div class="mb-4">
                                        <h5 class="mb-4">Personal Information</h5>
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <label class="form-label">Name</label>
                                                <p>{students.fullName}</p>
                                            </div>
                                              
                                            <div class="col-md-6">
                                                <label class="form-label">Email</label>
                                                <p>{students.email}</p>
                                            </div>
                                            <div class="col-md-6">
                                                  <label class="form-label">BirthDate</label>
                                                  <p>{students.birthdate}</p>
                                              </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Phone</label>
                                                <p>{students.mobile}</p>
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label">Adreess</label>
                                                <p>{students.address
                                                }</p>
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label">Gender</label>
                                                <p>{students.gender
                                                }</p>
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label">Pincode</label>
                                                <p>{students.pincode
                                                }</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div class="row g-4 mb-4">
                                        <div class="col-md-6">
                                            <div class="settings-card card">
                                                <div class="card-body">
                                                    <div class="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h6 class="mb-1">Two-Factor Authentication</h6>
                                                            <p class="text-muted mb-0 small">Add an extra layer of
                                                                security</p>
                                                        </div>
                                                        <div class="form-check form-switch">
                                                            <input class="form-check-input" type="checkbox" checked="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="settings-card card">
                                                <div class="card-body">
                                                    <div class="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h6 class="mb-1">Email Notifications</h6>
                                                            <p class="text-muted mb-0 small">Receive activity updates
                                                            </p>
                                                        </div>
                                                        <div class="form-check form-switch">
                                                            <input class="form-check-input" type="checkbox" checked=""  />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h5 class="mb-4">Recent Activity</h5>
                                        <div class="activity-item mb-3">
                                            <h6 class="mb-1">Updated profile picture</h6>
                                            <p class="text-muted small mb-0">2 hours ago</p>
                                        </div>
                                        <div class="activity-item mb-3">
                                            <h6 class="mb-1">Changed password</h6>
                                            <p class="text-muted small mb-0">Yesterday</p>
                                        </div>
                                        <div class="activity-item">
                                            <h6 class="mb-1">Updated billing information</h6>
                                            <p class="text-muted small mb-0">3 days ago</p>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

    </>
  );
};

export default UserProfile;
