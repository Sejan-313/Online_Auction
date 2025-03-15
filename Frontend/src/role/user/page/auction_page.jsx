import { useNavigate, useParams } from "react-router-dom";
import { CiSaveUp2, CiSaveDown2 } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import css from "./auction_page.module.css";

const Auction_Page = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/auction/${id}`);
                    setProduct(data);
    
                    const token = localStorage.getItem("token");
                    if (token) {
                        const { data: savedRes } = await axios.get(
                            `${import.meta.env.VITE_API_URL}/user/is-saved/${id}`,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        setIsSaved(savedRes.saved);
                    }
                }
    
                const { data: recData } = await axios.get(`${import.meta.env.VITE_API_URL}/user/auction-recommend`);
                setRecommendations(recData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id]);
    
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
    
    const handleBid = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token || localStorage.getItem("role") !== "user") {
                return alert("Login required to place a bid!");
            }
    
            setLoading(true);
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/user/place-bid`, 
                { product_id: id, bid_amount: product.current_bid + product.increment_price }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            setProduct(prev => ({ ...prev, current_bid: data.current_bid }));
            alert(data.message);
        } catch (error) {
            alert(error.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };    

    return (
        <div className="container-fluid p-5">
            <div className="d-flex mb-4 gap-3">
                <button className="nav-link mb-4 text-muted" onClick={() => navigate(-1)}>Previous</button>
            </div>
            <div className={`d-flex mb-5 ${css['Auction_Product']}`}>
                <div className="w-25">
                    <figure className="position-relative border h-100 rounded">
                        <img src={`http://localhost:5000/uploads/seller/${product?.image}`} alt={product?.product_name} className={css['productImage']} />
                        <button className={`${css.pStatus} w-25 border-0`} onClick={handleSaveProduct}>
                            {isSaved ? <CiSaveUp2 size={25} /> : <CiSaveDown2 size={25} />}
                        </button>
                    </figure>
                </div>
                <div className="w-75 p-3">
                    {product ? (
                        <div className="h-100 d-flex gap-1">
                            <div className="w-75 pe-3 border-end">
                                <h3 className="text-muted">{product.product_name}</h3>
                                <p className="text-muted">{product.description}
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit expedita, voluptatibus dicta amet non ipsa perferendis? Molestiae, sunt minus ea sapiente praesentium asperiores suscipit tenetur, quia veritatis ullam adipisci error, voluptatum sequi doloremque! Ipsa qui rem reprehenderit velit ad est asperiores expedita animi, consectetur, natus iure et, sint sed corrupti at doloremque earum eum error incidunt eligendi iste veniam. Unde, sint corporis eaque molestiae dolorum repellat illo maxime enim facilis officiis laborum dicta asperiores cum explicabo reiciendis sit autem. Repellat odit, error animi sunt laboriosam cum dolorum dolor. Molestias ab odit exercitationem atque autem praesentium vero incidunt obcaecati suscipit doloribus, quibusdam temporibus consequuntur? Voluptatum libero unde aut ratione odit suscipit doloribus, deserunt veritatis corrupti aspernatur, possimus, exercitationem ullam facere doloremque temporibus qui officiis nam error! Vel earum aut nesciunt ipsam quas nulla! Aut </p>
                            </div>
                            <div className="w-25 ps-3">
                                <p><strong>Type:</strong> {product.product_type}</p>
                                <p><strong>Quantity:</strong> {product.quantity}</p>
                                <p><strong>Starting Price:</strong> ₹{product.starting_price}</p>
                                <p><strong>Start Date:</strong> {product.start_date}</p>
                                <p><strong>End Date:</strong> {product.end_date}</p>
                                <p><strong>Status:</strong> {product.status}</p>
                                <p><strong>Current Bid:</strong> {`₹${product.starting_price + product.current_bid}`}</p>
                                <button className="btn btn-secondary w-100" onClick={handleBid} disabled={loading}>
                                    {loading ? "Placing Bid..." : product.status !== "Active" ? "Bidding Not Allowed" : `+ ₹${product.increment_price}`}
                                </button>
                            </div>
                        </div>
                    ) : ( <p>Loading...</p> )}
                </div>
            </div>
            <h5 className="text-muted">Recommend</h5>
            <div className={`d-flex justify-content-evenly gap-3 ${css['Auction_Product_Recommend']}`}>
                {recommendations.map((rec) => (
                    <Link key={rec._id} to={`/auction-product/${rec._id}`} className="w-25 h-100 text-decoration-none">
                        <div className={`border rounded h-100 p-2 ${css['Auction_Product_Recommend_box']}`}>
                            <figure className="position-relative h-100 rounded">
                                <img src={`http://localhost:5000/uploads/seller/${rec.image}`} alt={rec.product_name} className={css['productImage_Recommend_box']} />
                                <div className={`${css.pStatus} w-25`}>{`₹${Number(rec.current_bid) + Number(rec.starting_price)}`}</div>
                                <div className={`${css.overlay} rounded`}>{rec.product_name}</div>
                            </figure>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Auction_Page