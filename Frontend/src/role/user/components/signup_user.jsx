import { useState } from "react";
import { Link } from "react-router-dom";
import css from "./user_seller.module.css";
import { AiFillHome } from "react-icons/ai";    

export default function Signup_User() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        address: "",
        city: "",
        pincode: "",
        mobile: "",
        gender: "",
        birthdate: "",
        image: null,
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

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
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.pincode.match(/^\d{6}$/)) newErrors.pincode = "Enter a valid 6-digit Pincode";
        if (!formData.mobile.match(/^\d{10}$/)) newErrors.mobile = "Enter a valid 10-digit Mobile number";
        if (!formData.gender) newErrors.gender = "Select Gender";
        if (!formData.birthdate) newErrors.birthdate = "Select Birthdate";
        if (!formData.image) newErrors.image = "Upload an Image";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form Data:", formData);
        }
    };

    return (
        <>
        {/* <div> <Link to="/"><AiFillHome className={`${css.icon}`}/></Link> </div> */}
        <div className={`${css.container}`}>
            <div className={`${css.signup}`}>
                <div className={`${css.signup_form} border p-4 shadow-sm bg-white`}>
                    <h4 className="text-center mb-3 font-weight-bold text-secondary">Sign Up</h4>
                    <form onSubmit={handleSubmit}>
                        <div className={`${css.signup_form_field} d-flex gap-3`}>
                            <div className="w-100">
                                <label className="form-label">Full Name</label>
                                <input type="text" name="fullName" placeholder="enter fullName" className={`form-control ${errors.fullName ? "border-danger" : ""}`} value={formData.fullName} onChange={handleChange} />
                                {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                            </div>
                            <div className="w-100">
                                <label className="form-label">Email</label>
                                <input type="email" name="email" placeholder="enter email" className={`form-control ${errors.email ? "border-danger" : ""}`} value={formData.email} onChange={handleChange} />
                                {errors.email && <small className="text-danger">{errors.email}</small>}
                            </div>
                        </div>  
                        <div className={`${css.signup_form_field_textarea}`}>
                            <label className="form-label">Address</label>
                            <textarea name="address" placeholder="enter address" className={`form-control ${errors.address ? "border-danger" : ""}`} value={formData.address} onChange={handleChange}></textarea>
                            {errors.address && <small className="text-danger">{errors.address}</small>}
                        </div>

                        <div className={`${css.signup_form_field} d-flex gap-3`}>
                            <div className="w-100">
                                <label className="form-label">City</label>
                                <input type="text" name="city" placeholder="enter city" className={`form-control ${errors.email ? "border-danger" : ""}`} value={formData.city} onChange={handleChange} />
                                {errors.city && <small className="text-danger">{errors.city}</small>}
                            </div>
                            <div className="w-100">
                                <label className="form-label">Pincode</label>
                                <input type="text" name="pincode" placeholder="enter pincode" className={`form-control ${errors.pincode ? "border-danger" : ""}`} value={formData.pincode} onChange={handleChange} />
                                {errors.pincode && <small className="text-danger">{errors.pincode}</small>}
                            </div>
                        </div>

                        <div className={`${css.signup_form_field} d-flex gap-3`}>
                            <div className="w-100">
                                <label className="form-label">Birthdate</label>
                                <input type="date" name="birthdate" className={`form-control ${errors.birthdate ? "border-danger" : ""}`} value={formData.birthdate} onChange={handleChange} />
                                {errors.birthdate && <small className="text-danger">{errors.birthdate}</small>}
                            </div>
                            <div className="w-100">
                                <label className="form-label">Gender</label>
                                <div className={`form-control ${errors.gender ? "border-danger" : ""} border rounded p-2`}>
                                    <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
                                    <input type="radio" name="gender" value="Female" className="ms-3" onChange={handleChange} /> Female
                                </div>
                                {errors.gender && <small className="text-danger">{errors.gender}</small>}
                            </div>
                        </div>

                        <div className={`${css.signup_form_field} d-flex gap-3`}>
                            <div className="w-100">
                                <label className="form-label">Mobile</label>
                                <input type="text" name="mobile" placeholder="enter fullName" className={`form-control ${errors.mobile ? "border-danger" : ""}`} value={formData.mobile} onChange={handleChange} />
                                {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
                            </div>
                            <div className="w-100">
                                <label className="form-label">Profile Image</label>
                                <input type="file" name="image" className={`form-control ${errors.image ? "border-danger" : ""}`} accept="image/*" onChange={handleChange} />
                                {errors.image && <small className="text-danger">{errors.image}</small>}
                            </div>
                        </div>

                        <div className={`${css.signup_form_field} d-flex gap-3`}>
                            <div className="w-100">
                                <label className="form-label">Password</label>
                                <input type="password" name="password" placeholder="enter password" className={`form-control ${errors.password ? "border-danger" : ""}`} value={formData.password} onChange={handleChange} />
                                {errors.password && <small className="text-danger">{errors.password}</small>}
                            </div>
                            <div className="w-100">
                                <label className="form-label">Confirm Password</label>
                                <input type="password" name="confirmPassword" placeholder="enter confirmPassword" className={`form-control ${errors.confirmPassword ? "border-danger" : ""}`} value={formData.confirmPassword} onChange={handleChange} />
                                {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-secondary w-100">sign up</button>
                    </form>
                </div>

                <div className={`${css.signup_link} border p-3 shadow-sm bg-white text-center`}>
                    <p className="m-0 text-black">Don't have an account? <Link to="/signup_seller" className="text-primary">Seller</Link></p>
                    <p className="m-0 text-black">Already have an account? <Link to="/login" className="text-primary">Login</Link></p>
                </div>
            </div>
        </div>
        </>
    );
}
