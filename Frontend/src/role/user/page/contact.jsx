import { useState } from "react";
import css from './contact.module.css'
import axios from "axios"; 

const Contact = () => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Enter a valid 10-digit Phone number";
        if (!formData.subject.trim()) newErrors.subject = "Subject is required";
        if (!formData.message.trim()) newErrors.message = "Message is required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You need to log in before submitting the contact form!");
            return;
        }
        if (validateForm()) {
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/user/contact`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                });
                alert(data.message);
            } catch (error) {
                alert(error.response?.data?.error || "Something went wrong!");
            }
        }
    };

    return (
        <div className={css['contact_container']}>
            <div className={css['contact_box']}>
                <form onSubmit={handleSubmit}>
                    <div className={`${css['contact_field']} d-flex justify-content-between gap-4`}>
                        <div className='w-100'>
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                className={`form-control ${errors.fullName ? "border-danger" : ""}`}
                                placeholder="enter name"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                            {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                        </div>
                        <div className='w-100'>
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
                        <div className='w-100'>
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                className={`form-control ${errors.phone ? "border-danger" : ""}`}
                                placeholder="enter number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && <small className="text-danger">{errors.phone}</small>}
                        </div>
                    </div>
                    <div className={css['contact_field']}>
                        <div>
                            <label className="form-label">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                className={`form-control ${errors.subject ? "border-danger" : ""}`}
                                placeholder="enter subject"
                                value={formData.subject}
                                onChange={handleChange}
                            />
                            {errors.subject && <small className="text-danger">{errors.subject}</small>}
                        </div>
                    </div>
                    <div className={css['contact_textarea']}>
                        <label className="form-label">Message</label>
                        <textarea 
                            name="message" 
                            placeholder="enter message" 
                            className={`form-control h-75 ${errors.message ? "border-danger" : ""}`} 
                            value={formData.message}
                            onChange={handleChange}
                        />
                        {errors.message && <small className="text-danger">{errors.message}</small>}
                    </div>
                    <button type="submit" className="btn btn-secondary w-100 text-start">submit</button>
                </form>
            </div>
        </div>
    )
}

export default Contact