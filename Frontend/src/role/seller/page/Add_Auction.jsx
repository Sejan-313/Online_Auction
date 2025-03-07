import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import css from './page.module.css';
import axios from "axios"; 

const Add_Auction = () => {
    const fileInputRef = useRef(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        product_name: "",
        image: null,
        description: "",
        starting_price: "",
        increment_price: "",
        start_date: "",
        end_date: "",
        product_type: "",
        quantity: "",
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.product_name.trim()) newErrors.product_name = "Product Name is required";
        if (!formData.image) newErrors.image = "Upload an Image";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.starting_price.trim()) newErrors.starting_price = "Starting Price is required";
        if (!formData.increment_price.trim()) newErrors.increment_price = "Increment Price is required";
        if (!formData.start_date) newErrors.start_date = "Select Start Date";
        if (!formData.end_date) newErrors.end_date = "Select End Date";
        if (!formData.product_type) newErrors.product_type = "Select Product Type";
        if (!formData.quantity.trim()) newErrors.quantity = "Quantity is required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (validateForm()) {
            const formDataObj = new FormData();
            for (const key in formData) {
                formDataObj.append(key, formData[key]);
            }

            formDataObj.append("status", "pending");
            const seller_id = localStorage.getItem("seller_id")?.toString(); 
            formDataObj.append("seller_id", seller_id);

            try {
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/seller/add-auction`, formDataObj, { 
                    headers: { 
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}` 
                    } 
                });                
                setFormData({
                    product_name: "",
                    image: null,
                    description: "",
                    starting_price: "",
                    increment_price: "",
                    start_date: "",
                    end_date: "",
                    product_type: "",
                    quantity: "",
                });       
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }     
                alert(res.data.message);
            } catch (error) {
                alert(error.response?.data?.message || "Error occurred");
            }
        }
      };

    return (
        <div >
            <form className={css['Add_Auction']} onSubmit={handleSubmit}>
                <h3 className='text-start w-100 mb-4'>Product</h3>
                <div className={css['Auction_Row']}>
                    <div className="w-100">
                        <label className="form-label">Name</label>
                        <input type="text" name="product_name" placeholder="Enter Name" className={`form-control ${errors.product_name ? "border-danger" : ""}`} value={formData.product_name} onChange={handleChange} />
                        {errors.product_name && <small className="text-danger">{errors.product_name}</small>}
                    </div>
                    <div className="w-100">
                        <label className="form-label">Image</label>
                        <input type="file" name="image" className={`form-control ${errors.image ? "border-danger" : ""}`} accept="image/*" onChange={handleChange} ref={fileInputRef}/>
                        {errors.image && <small className="text-danger">{errors.image}</small>}
                    </div>
                </div>
                <div className={css['Auction_Row2']}>
                    <label className="form-label">Description</label>
                    <textarea name="description" placeholder="Enter Description" className={`form-control ${errors.description ? "border-danger" : ""} h-75`} value={formData.description} onChange={handleChange} ></textarea>
                    {errors.description && <small className="text-danger">{errors.description}</small>}
                </div>
                <div className={css['Auction_Row']}>
                    <div className="w-100">
                        <label className="form-label">Starting Price</label>
                        <input type="text" name="starting_price" placeholder="Enter Price" className={`form-control ${errors.starting_price ? "border-danger" : ""}`} value={formData.starting_price} onChange={handleChange} />
                        {errors.starting_price && <small className="text-danger">{errors.starting_price}</small>}
                    </div>
                    <div className="w-100">
                        <label className="form-label">Increment Price</label>
                        <input type="text" name="increment_price" placeholder="Enter Price" className={`form-control ${errors.increment_price ? "border-danger" : ""}`} value={formData.increment_price} onChange={handleChange} />
                        {errors.increment_price && <small className="text-danger">{errors.increment_price}</small>}
                    </div>
                </div>
                <div className={css['Auction_Row']}>
                    <div className="w-100">
                        <label className="form-label">Start Date</label>
                        <input type="date" name="start_date" className={`form-control ${errors.start_date ? "border-danger" : ""}`} value={formData.start_date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} />
                        {errors.start_date && <small className="text-danger">{errors.start_date}</small>}
                    </div>
                    <div className="w-100">
                        <label className="form-label">End Date</label>
                        <input type="date" name="end_date" className={`form-control ${errors.end_date ? "border-danger" : ""}`} value={formData.end_date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} />
                        {errors.end_date && <small className="text-danger">{errors.end_date}</small>}
                    </div>
                </div>
                <div className={css['Auction_Row']}>
                    <div className="w-100">
                        <label className="form-label">Type</label>
                        <select name="product_type" className={`form-select ${errors.product_type ? "border-danger" : ""}`} value={formData.product_type} onChange={handleChange}>
                            <option value="" className='text-secondary'>Type</option>
                            <option value="electronics">Electronics</option>
                            <option value="furniture">Furniture</option>
                            <option value="automobile">Automobile</option>
                            <option value="jewelry">Jewelry</option>
                            <option value="collectibles">Collectibles</option>
                        </select>
                        {errors.product_type && <small className="text-danger">{errors.product_type}</small>}
                    </div>
                    <div className="w-100">
                        <label className="form-label">Quantity</label>
                        <input type="number" name="quantity" placeholder="Enter Quantity" className={`form-control ${errors.quantity ? "border-danger" : ""}`} value={formData.quantity} onChange={handleChange} />
                        {errors.quantity && <small className="text-danger">{errors.quantity}</small>}
                    </div>
                </div>
                <div className={css['Auction_Row_Btn']}>
                    <button type="submit" className="btn btn-secondary w-100 text-start">Add Auction</button>
                </div>
            </form>
        </div>
    )
}

export default Add_Auction;

