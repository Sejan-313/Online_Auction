import Latestlink from "./Latestlink";
import css from "./Latest.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Latest = () => {
    const [auctions, setAuctions] = useState([]);
    const [filteredAuctions, setFilteredAuctions] = useState([]);
    // const [isAuctionAvailable, setIsAuctionAvailable] = useState(true); 
    // const [countdown, setCountdown] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/auction`);
                setAuctions(data);
                setFilteredAuctions(data.slice(0, 12))
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleFilter = (selectedCategory) => {
        if (selectedCategory === "All") {
            setFilteredAuctions(auctions.slice(0, 12))
        } else {
            const filtered = auctions.filter(item => item.product_type.toLowerCase() === selectedCategory.toLowerCase());
            setFilteredAuctions(filtered.slice(0, 12))
        }
    };

    // const startCountdown = () => {
    //     const currentTime = new Date();
    //     let nextAvailableTime = new Date();

    //     if (currentTime.getHours() >= 17) {
    //         nextAvailableTime.setHours(9, 0, 0, 0);
    //     } else {
    //         nextAvailableTime.setHours(9, 0, 0, 0); 
    //     }

    //     const timeDifference = nextAvailableTime - currentTime;
    //     setCountdown(timeDifference); 

    //     const interval = setInterval(() => {
    //         setCountdown(prevCountdown => {
    //             if (prevCountdown <= 0) {
    //                 clearInterval(interval);
    //                 return 0;
    //             }
    //             return prevCountdown - 1000;
    //         });
    //     }, 1000);
    // };

    // const checkAuctionAvailability = () => {
    //     const currentTime = new Date();
    //     const currentHour = currentTime.getHours();

    //     if (currentHour >= 9 && currentHour <= 17) {
    //         setIsAuctionAvailable(true); 
    //     } else {
    //         setIsAuctionAvailable(false); 
    //         startCountdown(); 

    //     }   
    // };

    // const startCountdownTo5PM = () => {
    //     const currentTime = new Date();
    //     const currentHour = currentTime.getHours();
    //     const currentMinute = currentTime.getMinutes();
    //     const currentSecond = currentTime.getSeconds();

    //     let next5PM = new Date();
    //     next5PM.setHours(9, 0, 0, 0); 

    //     if (currentHour >= 9) {
    //         next5PM.setDate(next5PM.getDate() + 1); 
    //     }

    //     const timeRemaining = next5PM - currentTime; 
    //     setCountdown(timeRemaining);

    //     const interval = setInterval(() => {
    //         setCountdown((prevCountdown) => {
    //             if (prevCountdown <= 0) {
    //                 clearInterval(interval);
    //                 return 0;
    //             }
    //             return prevCountdown - 1000; 
    //         });
    //     }, 1000);
    // };

    // const formatTime = (time) => {
    //     const hours = Math.floor(time / (1000 * 60 * 60));
    //     const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    //     const seconds = Math.floor((time % (1000 * 60)) / 1000);

    //     return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
    //         .toString()
    //         .padStart(2, "0")}`;
    // };

    // const expireAllAuctions = async () => {
    //     try {
    //         await axios.put(`${import.meta.env.VITE_API_URL}/admin/auctionexpired/all`);
    //         console.log("All auctions have been expired!");
    //     } catch (error) {
    //         console.error('Error expiring auctions:', error);
    //     }
    // };

    // const checkAuctionStatus = () => {
    //     const currentTime = new Date();
    //     const currentHour = currentTime.getHours();

    //     if (currentHour >= 17) {
    //         setIsAuctionAvailable(false); 
    //     } else {
    //         setIsAuctionAvailable(true); 
    //     }
    // };

    // useEffect(() => {
    //     checkAuctionAvailability();
    //     startCountdownTo5PM();
    //     checkAuctionStatus();
    // }, []);

    // useEffect(() => {
    //     if (!isAuctionAvailable) {
    //         setFilteredAuctions([]); 
    //     }
    // }, [isAuctionAvailable]);

 


    return (
        <div className="latest-products spad bg-white p-5">
        <div className="container-fluid">
            <Latestlink onFilter={handleFilter} />
            <div className="row" id="product-list">
                {
                    filteredAuctions.length > 0 ? (
                        filteredAuctions.map((item) => (
                            <Link key={item.id} to={`/auction-product/${item._id}`} className="col-lg-3 col-sm-6">
                                <div className={css.productItem}>
                                    <figure className="position-relative border rounded">
                                        <img
                                            src={`http://localhost:5000/uploads/seller/${item.image}`}
                                            alt={item.product_name}
                                            className={css.productImage}
                                        />
                                        <div className={`${css.pStatus} w-25}`}>
                                            ₹ {item.current_bid + item.starting_price}
                                        </div>
                                        <div className={css.overlay}>{item.product_name}</div>
                                                          
                                        </figure>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>No Products Available</p>
                    )
                }
                {/* {isAuctionAvailable ? (
                    filteredAuctions.length > 0 ? (
                        filteredAuctions.map((item) => (
                            <Link key={item.id} to={`/auction-product/${item._id}`} className="col-lg-3 col-sm-6">
                                <div className={css.productItem}>
                                    <figure className="position-relative border rounded">
                                        <img
                                            src={`http://localhost:5000/uploads/seller/${item.image}`}
                                            alt={item.product_name}
                                            className={css.productImage}
                                        />
                                        <div className={`${css.pStatus} w-25}`}>
                                            ₹ {item.current_bid + item.starting_price}
                                        </div>
                                        <div className={css.overlay}>{item.product_name}</div>
                                      
                                    </figure>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>No Products Available</p>
                    )
                ) : (
                    <div className={`${css.countdown_timer}`}>
                        <p>Auction is currently closed. Next auction starts in:</p>
                        <span>{formatTime(countdown)}</span>
                    </div>
                )} */}
            </div>
        </div>
    </div>
    );
};

export default Latest;
