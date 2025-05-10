import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CiSaveUp2, CiSaveDown2 } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";
import css from "./auction_page.module.css";
import styles from "./Button.module.css";

const Auction_Page = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);
  const [currentBidAmount, setCurrentBidAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuctionActive, setIsAuctionActive] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState("");

  const [latestBids, setLatestBids] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/auction/${id}`
          );
          setProduct(data);

          const token = localStorage.getItem("token");
          if (token) {
            const { data: savedRes } = await axios.get(
              `${import.meta.env.VITE_API_URL}/user/is-saved/${id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setIsSaved(savedRes.saved);
          }


          const { data: latestBidsData } = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/latest-bids/${id}`
          );
          setLatestBids(latestBidsData);

        }

        const { data: recData } = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/auction-recommend`
        );
        setRecommendations(recData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

  //     const hours = now.getHours();
  //     if (hours >= 16 || hours < 9) {
  //       setIsAuctionActive(false);
  //       setError("Auction is active from 9:00 AM to 4:00 PM.");

  //       const nextAuctionStart = new Date();
  //       nextAuctionStart.setHours(10, 0, 0, 0);

  //       if (hours >= 17) {
  //         nextAuctionStart.setDate(nextAuctionStart.getDate() + 1);
  //       }

  //       const timeDiff = nextAuctionStart - now;
  //       const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
  //       const minutesLeft = Math.floor(
  //         (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
  //       );
  //       const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

  //       setTimeLeft(
  //         `Auction starts in ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`
  //       );
  //     } else {
  //       setIsAuctionActive(true);
  //       setError("");
  //       setTimeLeft("");
  //       clearInterval(interval);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);


  
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
  
      if (hours < 9 || hours >= 16) {
        setIsAuctionActive(false);
        setError("Auction is active from 9:00 AM to 4:00 PM.");
  
        // Calculate next auction start time (9:00 AM)
        const nextAuctionStart = new Date();
        nextAuctionStart.setHours(9, 0, 0, 0);
  
        if (hours >= 16) {
          nextAuctionStart.setDate(nextAuctionStart.getDate() + 1);
        }
  
        const timeDiff = nextAuctionStart - now;
        const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
        setTimeLeft(
          `Auction starts in ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`
        );
      } else {
        setIsAuctionActive(true);
        setError("");
        setTimeLeft("");
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);  


  const handleSaveProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || localStorage.getItem("role") !== "user") {
        return alert("Login required to save product!");
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/auction-save`,
        { product_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsSaved(data.saved);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const validateBid = () => {
    const value = parseInt(currentBidAmount) || 0;
    if (value <= 0) {
      setError("Bid amount must be greater than zero.");
      return false;
    } else if (value < product.increment_price) {
      setError(`Minimum bid increment is ₹${product.increment_price}.`);
      return false;
    }



    setError("");
    return true;
  };

  const handleBid = async () => {
    if (!validateBid()) return;

    try {
      const token = localStorage.getItem("token");
      if (!token || localStorage.getItem("role") !== "user") {
        return alert("Login required to place a bid!");
      }
      setLoading(true);


      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/place-bid`,
        {
          product_id: id,
          bid_amount: product.current_bid + parseInt(currentBidAmount),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProduct((prev) => ({ ...prev, current_bid: data.current_bid }));
      alert(data.message);
      setBidAmount(0);
      setCurrentBidAmount("");

  
    //   fetchData(); 

    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  


  return (
    <div className="container-fluid p-5">
      <div className="d-flex justify-content-between mb-4 gap-3">
        <button
          className="nav-link mb-4 text-muted"
          onClick={() => navigate(-1)}
        >
          Previous
        </button>
        <p className="text-danger">{timeLeft}</p>
      </div>
      <div className={`d-flex mb-5 ${css["Auction_Product"]}`}>
        <div className="w-25">
          <figure className="position-relative border h-100 rounded">
            <img
              src={`http://localhost:5000/uploads/seller/${product?.image}`}
              alt={product?.product_name}
              className={css["productImage"]}
            />
            <button
              className={`${css.pStatus} w-25 border-0`}
              onClick={handleSaveProduct}
            >
              {isSaved ? <CiSaveUp2 size={25} /> : <CiSaveDown2 size={25} />}
            </button>
          </figure>
        </div>
        <div className="w-75 p-3">
          {product ? (
            <div className="h-100 d-flex gap-1">
              <div className="w-75 pe-3 border-end">
                <h3 className="text-muted">{product.product_name}</h3>
                <p className="text-muted h-75 p-3 overflow-auto">
                  {product.description}
                </p>
              </div>
              <div className="w-25 ps-3">
                <p>
                  <strong>Type:</strong> {product.product_type}
                </p>
                <p>
                  <strong>Quantity:</strong> {product.quantity}
                </p>
                <p>
                  <strong>Starting Price:</strong> ₹{product.starting_price}
                </p>
                <p>
                  <strong>Increment Price:</strong> ₹{product.increment_price}
                </p>
                <p>
                  <strong>Start Date:</strong> {product.start_date}
                </p>
                <p>
                  <strong>End Date:</strong> {product.end_date}
                </p>
                <p>
                  <strong>Status:</strong> {product.status}
                </p>
                <p>
                  <strong>Current Bid:</strong> {`₹${product.current_bid}`}
                </p>
                <div style={{ height: "70px" }} className="border-bottom mb-2">
                  {product.status === "Inactive" ? (
                    <span className="text-danger">
                      Bidding is temporarily paused.
                    </span>
                  ) : (
                    <>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        className={`input-group ${
                          error ? "border border-danger" : ""
                        }`}
                        value={currentBidAmount}
                        placeholder="Enter Your Bidding Amount"
                        onChange={(e) => setCurrentBidAmount(e.target.value)}
                        disabled={!isAuctionActive}
                      />
                      {error && <span className="text-danger">{error}</span>}
                    </>
                  )}
                </div>
 <div className={styles.buttonContainer}>
 <button
   className={`${styles.btn} btn btn-secondary w-100`}
   disabled={!isAuctionActive || loading}
   onClick={handleBid}
 >
   {loading
     ? "Placing Bid..."
     : product.status !== "Active"
     ? "Bidding Not Allowed"
     : `+ ₹${bidAmount}`}
 </button>
 </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="mb-1" style={{ height: "300px"}}>
        <h5 className="text-muted">Latest Bids</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Auction</th>
              <th>Status</th>
              <th>User</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Bid Amount</th>
              <th>Date / Time</th>
            </tr>
          </thead>
          <tbody>
            {latestBids.length > 0 ? (
              latestBids.map((bid) =>
                bid.users.map((user) =>
                  user.bids.slice(-1).map((b, index) => (
                    <tr key={index}>
                      <td>{bid.auction_id.product_name}</td>
                      <td>{bid.auction_id.status}</td>
                      <td>{user.user_id.fullName}</td>
                      <td>{user.user_id.email}</td>
                      <td>{user.user_id.mobile}</td>
                      <td>₹{b.amount}</td>
                      <td>{new Date(b.bid_time).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                    </tr>
                  ))
                )
              )
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No bids yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h5 className="text-muted">Recommend</h5>
      <div
        className={`d-flex justify-content-evenly gap-3 ${css["Auction_Product_Recommend"]}`}
      >
        {recommendations.map((rec) => (
          <Link
            key={rec._id}
            to={`/auction-product/${rec._id}`}
            className="w-25 h-100 text-decoration-none"
          >
            <div
              className={`border rounded h-100 p-2 ${css["Auction_Product_Recommend_box"]}`}
            >
              <figure className="position-relative h-100 rounded">
                <img
                  src={`http://localhost:5000/uploads/seller/${rec.image}`}
                  alt={rec.product_name}
                  className={css["productImage_Recommend_box"]}
                />
                <div className={`${css.pStatus} w-25`}>{`₹${
                  Number(rec.current_bid) + Number(rec.starting_price)
                }`}</div>
                <div className={`${css.overlay} rounded`}>
                  {rec.product_name}
                </div>
              </figure>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


export default Auction_Page;
