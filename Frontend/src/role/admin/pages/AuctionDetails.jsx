import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

const AuctionDetails = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [aucdata, setaucdata] = useState([]);
  const [msg, setmsg] = useState(false);

  useEffect(() => {
    fetchaucdata();
  }, []);

  const fetchaucdata = async () => {
    try {
      const response = await axios.get(`${API_URL}/seller/all`);
      setaucdata(response.data);
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
                      <table className="table datatable datatable-table">
                        <thead>
                          <tr>
                            <th
                              data-sortable="true"
                              style={{ width: "20.825852782764812%" }}
                            >
                              Name
                            </th>
                            <th
                              data-sortable="true"
                              style={{ width: "11.131059245960502%" }}
                            >
                              Image
                            </th>
                            <th
                              data-sortable="true"
                              style={{ width: "26.750448833034113%" }}
                            >
                              Email
                            </th>
                            <th
                              data-format="YYYY/DD/MM"
                              data-sortable="true"
                              data-type="date"
                              style={{ width: "18.850987432675044%" }}
                            >
                              Gender
                            </th>
                            <th
                              data-sortable="true"
                              className="red"
                              style={{ width: "22.44165170556553%" }}
                            >
                              Mobile No
                            </th>
                            <th
                              data-sortable="true"
                              className="red"
                              style={{ width: "22.44165170556553%" }}
                            >
                              Birthdate
                            </th>
                            <th
                              data-sortable="true"
                              className="red"
                              style={{ width: "22.44165170556553%" }}
                            >
                              City
                            </th>
                            <th
                              data-sortable="true"
                              className="red"
                              style={{ width: "22.44165170556553%" }}
                            >
                              Address
                            </th>
                            <th
                              data-sortable="true"
                              className="red"
                              style={{ width: "22.44165170556553%" }}
                            >
                              Pincode
                            </th>
                            <th
                              data-sortable="true"
                              className="red"
                              style={{ width: "22.44165170556553%" }}
                            >
                              Operations
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                        {msg ?
                  <tr>
                    <td colSpan="9" className="no-data-message">
                      Data not found
                    </td>
                  </tr>
                       :aucdata.map((item) => {
                    
                    return (
                      <tr key={item._id}>
                        <td>{item.product_name}</td>
                        <td>
                          <img
                            src={`http://localhost:5000/uploads/seller/${item?.image}`}
                            alt="Auction Image"
                            style={{ width: '100px', height: 'auto' }}
                          />
                        </td>
                        <td>{item.starting_price}</td>
                        <td>{item.increment_price}</td>
                        <td>{item.start_date}</td>
                        <td>{item.end_date}</td>
                        <td>{item.product_type}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <Link to="update">
                            <input type="submit" value="Update" />
                          </Link>
                          <input type="submit" value="Delete" onClick={() => { handleDelete(item._id) }} />
                        </td>
                      </tr>
                    );
                  })}
                        </tbody>
                      </table>
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

export default AuctionDetails;
