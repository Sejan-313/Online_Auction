import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

const UserDetails = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [userdata, setuserdata] = useState([]);
  const [msg, setmsg] = useState(false);

  useEffect(() => {
    fetchsellerdata();
  }, []);

  const fetchsellerdata = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/all/user`);
      setuserdata(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching Auction data:", error);
      setmsg(true);
    }
  };

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>User Tables</h1>
          {/* <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">Tables</li>
              <li className="breadcrumb-item active">Data</li>
            </ol>
          </nav> */}
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">User Data</h5>
               

                  <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                    <div className="datatable-top">
                      <div className="datatable-dropdown">
                        <label>
                          <select className="datatable-selector" name="per-page">
                            <option value="5">5</option>
                            <option value="10" defaultValue="">
                              10
                            </option>
                            <option value="15">15</option>
                            <option value="-1">All</option>
                          </select>{" "}
                          entries per page
                        </label>
                      </div>
                      <div className="datatable-search">
                        <input
                          className="datatable-input"
                          placeholder="Search..."
                          type="search"
                          name="search"
                          title="Search within table"
                        />
                      </div>
                    </div>
                    <div className="datatable-container">

                          {msg ? (
                            <p>Data not found</p>
                          ) : (
                            userdata.map((item) => {
                              return (

                                <div class="card mb-3" style={{maxwidth:" 540px"}}>
                                <div class="row g-0">
                                  <div class="col-md-4">
                                  <img
                                      src={`http://localhost:5000/uploads/user/${item?.image}`}
                                      alt="Auction Image"
                                      style={{ width: "500px", height: "100%" }}
                                    />
                                  </div>
                                  <div class="col-md-8">
                                    <div class="card-body">
                                      <h5 class="card-title">Name : {item.fullName}</h5>
                                      <p class="card-text">Email : {item.email}</p>
                                      <p class="card-text">Gender : {item.gender}</p>
                                      <p class="card-text">Mobile Number :{item.mobile}</p>
                                      <p class="card-text">Birthdatae :{item.birthdate}</p>
                                      <p class="card-text">Address : {item.address}</p>
                                      <p class="card-text">City : {item.city}</p>
                                      <p class="card-text">Pincode : {item.pincode}</p>
                                      <input type="submit" value="Delete" className="btn btn-danger"></input>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              );
                            })
                          )}

                    </div>
                    <div className="datatable-bottom">
                      <div className="datatable-info">
                        Showing 1 to 10 of 100 entries
                      </div>
                      <nav className="datatable-pagination">
                        <ul className="datatable-pagination-list">
                          <li className="datatable-pagination-list-item datatable-hidden datatable-disabled">
                            <button
                              data-page="1"
                              className="datatable-pagination-list-item-link"
                              aria-label="Page 1"
                            >
                              ‹
                            </button>
                          </li>
                          <li className="datatable-pagination-list-item datatable-active">
                            <button
                              data-page="1"
                              className="datatable-pagination-list-item-link"
                              aria-label="Page 1"
                            >
                              1
                            </button>
                          </li>
                          <li className="datatable-pagination-list-item">
                            <button
                              data-page="2"
                              className="datatable-pagination-list-item-link"
                              aria-label="Page 2"
                            >
                              2
                            </button>
                          </li>
                          <li className="datatable-pagination-list-item">
                            <button
                              data-page="3"
                              className="datatable-pagination-list-item-link"
                              aria-label="Page 3"
                            >
                              3
                            </button>
                          </li>
                          <li className="datatable-pagination-list-item">
                            <button
                              data-page="4"
                              className="datatable-pagination-list-item-link"
                              aria-label="Page 4"
                            >
                              4
                            </button>
                          </li>
                          <li className="datatable-pagination-list-item">
                            <button
                              data-page="5"
                              className="datatable-pagination-list-item-link"
                              aria-label="Page 5"
                            >
                              5
                            </button>
                          </li>
                          <li className="datatable-pagination-list-item">
                            <button
                              data-page="6"
                              className="datatable-pagination-list-item-link"
                              aria-label="Page 6"
                            >
                              6
                            </button>
                          </li>
                          <li className="datatable-pagination-list-item">
                            <button
                              data-page="7"
                              className="datatable-pagination-list-item-link"
                              aria-label="Page 7"
                            >
                              7
                            </button>
                          </li>
                          <li className="datatable-pagination-list-item datatable-ellipsis datatable-disabled">
                            <button className="datatable-pagination-list-item-link">
                              …
                            </button>
                          </li>
                          <li className="datatable-pagination-list-item">
                            <button
                              data-page="10"
                              className="datatable-pagination-list-item-link"
                              aria-label="Page 10"
                            >
                              10
                            </button>
                          </li>
                          <li className="datatable-pagination-list-item">
                            <button
                              data-page="2"
                              className="datatable-pagination-list-item-link"
                              aria-label="Page 2"
                            >
                              ›
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserDetails;
