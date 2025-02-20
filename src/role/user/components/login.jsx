import { useState } from "react";
import { Link } from "react-router-dom";
import css from "./user_seller.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Submitted Data:", formData);
        }
    };

    return (
        <div className={`${css.container}`}>
            <div className={`${css.login}`}>
                <div className={`${css.login_form} border p-2 shadow-sm bg-white`}>
                    <h3 className="text-center mb-3 font-weight-bold text-secondary">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <div className={`${css.login_form_field}`}>
                            <label className="form-label">Email</label>
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
                            <label className="form-label">Password</label>
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
                        <div className={`${css.login_form_field} mb-2`}>
                            <label className="form-label">Role</label>
                            <select
                                name="role"
                                className={`form-select ${errors.role ? "border-danger" : ""}`}
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="user">User</option>
                                <option value="seller">Seller</option>
                                <option value="admin">Admin</option>
                            </select>
                            {errors.role && <small className="text-danger">{errors.role}</small>}
                        </div>
                        <button type="submit" className="w-100 btn btn-secondary"> Login </button>
                    </form>
                </div>
                <div className={`${css.login_link} border p-3 shadow-sm bg-white text-center`}>
                    <p className="text-black"> Don't have an account?  
                        <Link to="/signup_user" className="text-primary"> User</Link> |  
                        <Link to="/signup_seller" className="text-primary"> Seller</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
