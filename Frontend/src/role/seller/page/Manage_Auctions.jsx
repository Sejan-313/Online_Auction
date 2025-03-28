import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from './Manage_Auctions.module.css';

const Manage_Auctions = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [sellerdata, setsellerdata] = useState([]);
  const [msg, setmsg] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("seller_id");

    if (id) {
      fetchsellerdata(id);
      console.log(id);
    } else {
      console.error("No user ID found in localStorage.");
    }
  }, []);

  const fetchsellerdata = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/seller/auction/${id}`);
      setsellerdata(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching Auction data:", error);
      setmsg(true);
    }
  };

  const handleDelete = async (pid) => {
    try {
      const id = localStorage.getItem("seller_id");
      await axios.delete(`${API_URL}/seller/${pid}`);
      fetchsellerdata(id);
    } catch (error) {
      console.log(pid);
      console.error("Error deleting Auction:", error);
    }
  };

  return (
    <>
      <main className={styles.main}>
        <section className="">
          <div className="row">
            <div className="col-md-11">
              <h2 className={styles.title}>Auctions details</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-11 p-3">
              <input
                type="text"
                placeholder="Search"
                id="myInput"
                className={styles.searchInput}
              />
            </div>
            <div className="col-md-1 p-3">
              <button className={styles.addButton}>
                <Link to="/seller/add-auction" style={{ color: "white" }}>
                  Add
                </Link>
              </button>
            </div>
            <br />
          </div>

          <div className="row">
            <div className="12">
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Image</th>
                      <th>Starting Price</th>
                      <th>Increament Price</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Type</th>
                      <th>Quantity</th>
                      <th>UPDATE/Delete</th>
                    </tr>
                  </thead>
                  <tbody id="myTable">
                    {msg ? (
                      <tr>
                        <td colSpan="9" className={styles.noDataMessage}>
                          Data not found
                        </td>
                      </tr>
                    ) : (
                      sellerdata.map((item) => {
                        return (
                          <tr key={item._id}>
                            <td>{item.product_name}</td>
                            <td>
                              <img
                                src={`http://localhost:5000/uploads/seller/${item?.image}`}
                                alt="Auction Image"
                                style={{ width: "100px", height: "auto" }}
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
                                <input
                                  type="submit"
                                  value="Update"
                                  className={`${styles.updateButton} btn btn-info`} />
                              </Link>
                              <input
                                type="submit"
                                value="Delete"
                                className={`${styles.deleteButton} btn btn-danger`}
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
          </div>
        </section>
      </main>
    </>
  );
};

export default Manage_Auctions;
