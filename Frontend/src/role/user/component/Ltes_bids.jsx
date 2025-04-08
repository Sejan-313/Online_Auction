import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./LtesBids.module.css"; // Import the module CSS

const Ltes_bids = () => {
  const [latestBids, setLatestBids] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch the latest bids for all auctions
  const fetchLatestBidsForAllAuctions = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/latest-bids-all-auctions`
      );
      setLatestBids(data);
    } catch (error) {
      console.error("Error fetching latest bids:", error);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch data when the component mounts
  useEffect(() => {
    fetchLatestBidsForAllAuctions();
  }, []);

  return (
    <div className="container-fluid p-5">
      <h3 className="mb-4 text-center">Latest Bids on Auctions</h3>
      {loading ? (
        <p>Loading latest bids...</p>
      ) : (
        <div className={styles.tableContainer}>
          {latestBids.length === 0 ? (
            <p>No bids yet</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Latest Bid</th>
                  <th>Bidding Ends</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {latestBids.map((auction) => (
                  <tr key={auction.auction_id}>
                    <td>{auction.product_name}</td>
                    <td>₹{auction.latest_bid}</td>
                    <td>{new Date(auction.end_date).toLocaleString()}</td>
                    <td>
                      <Link
                        to={`/auction-product/${auction.auction_id}`}
                        className="btn btn-dark"
                      >
                        View Auction
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Ltes_bids;
