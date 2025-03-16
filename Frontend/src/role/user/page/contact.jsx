import { useState } from "react";
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
        console.log("Form Data:", formData);
         console.log("Token:", token);
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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", flexDirection: "column" }}>
            <section className="page-add" style={{ width: "100%" }}>
                <div className="" style={{ textAlign: "center" }}>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="page-breadcrumb">
                                <h2>Contact us<span>.</span></h2>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <img src="img/add.jpg" alt="Add Section" style={{ width: "100%", maxWidth: "500px" }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <div className="contact-section" style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
                <div className="">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <input 
                                            type="text" 
                                            name="fullName" 
                                            className={`form-control ${errors.fullName ? "border-danger" : ""}`} 
                                            placeholder="Full Name" 
                                            value={formData.fullName} 
                                            onChange={handleChange} 
                                        />
                                        {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                                    </div>
                                    <div className="col-lg-6">
                                        <input 
                                            type="email" 
                                            name="email" 
                                            className={`form-control ${errors.email ? "border-danger" : ""}`} 
                                            placeholder="Email" 
                                            value={formData.email} 
                                            onChange={handleChange} 
                                        />
                                        {errors.email && <small className="text-danger">{errors.email}</small>}
                                    </div>
                                    <div className="col-lg-12">
                                        <input 
                                            type="text" 
                                            name="phone" 
                                            className={`form-control ${errors.phone ? "border-danger" : ""}`} 
                                            placeholder="Phone" 
                                            value={formData.phone} 
                                            onChange={handleChange} 
                                        />
                                        {errors.phone && <small className="text-danger">{errors.phone}</small>}
                                    </div>
                                    <div className="col-lg-12">
                                        <input 
                                            type="text" 
                                            name="subject" 
                                            className={`form-control ${errors.subject ? "border-danger" : ""}`} 
                                            placeholder="Subject" 
                                            value={formData.subject} 
                                            onChange={handleChange} 
                                        />
                                        {errors.subject && <small className="text-danger">{errors.subject}</small>}
                                    </div>
                                    <div className="col-lg-12">
                                        <textarea 
                                            name="message" 
                                            placeholder="Message" 
                                            className={`form-control ${errors.message ? "border-danger" : ""}`} 
                                            value={formData.message}
                                            onChange={handleChange} 
                                        />
                                        {errors.message && <small className="text-danger">{errors.message}</small>}
                                    </div>
                                    <div className="col-lg-12 text-right">
                                        <button type="submit" className="btn btn-secondary">Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-lg-3 offset-lg-1">
                            <div className="contact-widget">
                                <div className="cw-item">
                                    <h5>Location</h5>
                                    <ul>
                                        <li>1525 Awesome Lane, </li>
                                        <li>Los Angeles, CA</li>
                                    </ul>
                                </div>
                                <div className="cw-item">
                                    <h5>Phone</h5>
                                    <ul>
                                        <li>+1 (603) 535-4592</li>
                                        <li>+1 (603) 535-4556</li>
                                    </ul>
                                </div>
                                <div className="cw-item">
                                    <h5>E-mail</h5>
                                    <ul>
                                        <li>contact@violetstore.com</li>
                                        <li>www.violetstore.com</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Google Map Section */}
            <div className="map" style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
                <div className="row">
                    <div className="col-lg-12">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26440.72384129847!2d-118.24906619231132!3d34.06719475913053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c659f50c318d%3A0xe2ffb80a9d3820ae!2sChinatown%2C%20Los%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1570213740685!5m2!1sen!2sbd"
                            height="560" style={{ border: 0, width: "100%" }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
