import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import css from "./user_seller.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "user"
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};
        
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.role) {
            newErrors.role = "Please select a role";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/${formData.role}/login`, formData);
                if (data.success) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("fullName", data.fullName);
                    localStorage.setItem(`${data.role}_id`, data[`${data.role}_id`]);
                    localStorage.setItem("email", data.email);
                    localStorage.setItem("role", data.role);
    
                    if (data.role === "admin") {
                        navigate("/admin");
                    } else if (data.role === "seller") {
                        navigate("/seller");
                    } else {
                        navigate("/");
                    }
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Login Error:", error.response?.data);
                alert(error.response?.data?.message || "Login failed");
            }
        }
    }; 
    

    return (
         <>
        <div className={`${css.container}`}>
            <div className={`${css.login}`}>
                <div className={`${css.login_form} border border-white px-2`}>
                    <div className={`${css.login_form_container} border-bottom border-white d-flex flex-column justify-content-evenly`}>
                        <h3 className="text-center mb-3 font-weight-bold text-white">Login</h3>
                        <form onSubmit={handleSubmit}>
                            <div className={`${css.login_form_field}`}>
                                <label className="form-label text-white">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={`form-control ${errors.email ? "border-danger" : ""}`}
                                    placeholder="enter email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <small className="text-danger">{errors.email}</small>}
                            </div>
                            <div className={`${css.login_form_field}`}>
                                <label className="form-label text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className={`form-control ${errors.password ? "border-danger" : ""}`}
                                    placeholder="enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <small className="text-danger">{errors.password}</small>}
                            </div>
                            <div className={`${css.login_form_field}`}>
                                <label className="form-label text-white">Role</label>
                                <select
                                    name="role"
                                    className={`form-select ${errors.role ? "border-danger" : ""}`}
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="user" selected>User</option>
                                    <option value="seller">Seller</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {errors.role && <small className="text-danger">{errors.role}</small>}
                            </div>
                            <button type="submit" className="w-100 btn border-white text-white"> Login </button>
                        </form>
                    </div>
                    <Link to="/forgot-password" className={`text-white ${css['forgot_password_link']}`}>Forgot password?</Link>
                </div>
                <div className={`${css.login_link} border border-white p-3 text-center`}>
                    <p className="text-white"> Don't have an account?  
                        <Link to="/signup_user" className="text-white"> User</Link> |  
                        <Link to="/signup_seller" className="text-white"> Seller</Link>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
}
