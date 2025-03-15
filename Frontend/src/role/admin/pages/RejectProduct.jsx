import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './RejectAuction.css'; 
import { useLocation } from 'react-router-dom';


const RejectProduct = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const id = new URLSearchParams(location.search).get("id");
  const API_URL = import.meta.env.VITE_API_URL;
  const [productId, setProductId] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
   
    if (id) {
      setProductId(id);
    } else {
      navigate("/admin/auctiondata"); 
    }
  }, [navigate]);

  const validateForm = () => {
    if (!description || description.trim() === "") {
      setError("Rejection description is required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleReject = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
 
     try {
          const response = await axios.put(`${API_URL}/admin/rejectproduct/${id}`,{description});
          console.log('Auction rejected:', response.data);
          navigate("/admin"); 
        } catch (error) {
          console.error('Error rejecting auction:', error);
        }finally {
          setIsSubmitting(false);
        }
    
        navigate("/admin/auctiondata"); 
  };

  return (
    <div className="container">
      <h2>Reject Auction</h2>
      <form onSubmit={(e) => e.preventDefault()}>

        <div className="form-group">
          <label>Product ID</label>
          <input
            type="text"
            className="form-control"
            value={productId}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
          {error && <div className="text-danger">{error}</div>}
        </div>

        <div className="form-group">
          <button
            className="btn btn-danger"
            onClick={handleReject}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Rejecting..." : "Reject Auction"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RejectProduct;

