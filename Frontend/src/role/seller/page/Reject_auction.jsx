import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./RejectAuction.module.css"; 

const Reject_auction = () => {
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
      const response = await axios.get(`${API_URL}/seller/auctionreg/${id}`);
      setsellerdata(response.data); // You no longer need to reverse this here if you want to keep order
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
        <section>
          <div className="row">
            <div className="col-md-11">
              <h2 className={styles.title}>Rejected Auctions details</h2>
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
            <br />
          </div>
          <div className="row">
            <div className="col-12">
              <div className={styles.cardContainer}>
                {msg ? (
                  <div className={styles.noDataMessage}>Data not found</div>
                ) : (
                  sellerdata.map((item) => {
                    return (
                      <div key={item._id} className={styles.card}>
                        <img
                          src={`http://localhost:5000/uploads/seller/${item?.image}`}
                          alt="Auction Image"
                          className={styles.cardImgTop}
                        />
                        <div className={styles.cardBody}>
                          <h5 className={styles.cardTitle}>
                            Product ID: {item._id}
                          </h5>
                          <p className={styles.cardText}>
                            Product Name: {item.product_name}
                          </p>
                          <p className={styles.cardTitle}>
                            Product rejection Reasons:
                            <br />
                            <u className={styles.cardText}>{item.Rejection}</u>
                          </p>
                          <Link to="update">
                            <input
                              type="submit"
                              value="Update"
                              className={`${styles.updateButton} btn btn-info`}
                            />
                          </Link>
                          <input
                            type="submit"
                            value="Delete"
                            className={`${styles.deleteButton} btn btn-danger ml-3`}
                            onClick={() => {
                              handleDelete(item._id);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Reject_auction;
