import Latestlink from "./Latestlink";
import css from "./Latest.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from './SearchBar.module.css';
import axios from "axios";

// SearchBar component (you can define this inside this file or separately as shown before)
const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSearch(searchTerm);
    };
  
    return (
      <div className={styles.searchBarContainer}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search for items..."
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>Search</button>
        </form>
      </div>
    );
  };
const Latest = () => {
    const [auctions, setAuctions] = useState([]);
    const [filteredAuctions, setFilteredAuctions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/auction`);
                setAuctions(data);
                setFilteredAuctions(data.slice(0, 12));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleFilter = (selectedCategory) => {
        if (selectedCategory === "All") {
            setFilteredAuctions(auctions.slice(0, 12));
        } else {
            const filtered = auctions.filter(item => item.product_type.toLowerCase() === selectedCategory.toLowerCase());
            setFilteredAuctions(filtered.slice(0, 12));
        }
    };

    // Handle search filter
    const handleSearch = (query) => {
        setSearchQuery(query);
          // Update search term

        const filtered = auctions.filter(item =>
            console.log(item.product_name)
            
            // item.product_name.toLowerCase().includes(query.toLowerCase()) ||
            // item.product_description.toLowerCase().includes(query.toLowerCase())
        );
        // setFilteredAuctions(filtered.slice(0, 12)); // Show only the first 12 results
    };

    return (
        <div className="latest-products spad p-5">
            <div className="container-fluid">
                <SearchBar onSearch={handleSearch} /> {/* Add search bar */}
                <Latestlink onFilter={handleFilter} />
                <div className="row" id="product-list">
                    {filteredAuctions.length > 0 ? (
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default Latest;
