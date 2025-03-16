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
                                    <h5>Navsari</h5>
                                    <ul>
                                        <li>3445,LunsiKui</li>
                                        <li>Navsari,Guj-India</li>
                                    </ul>
                                </div>
                                <div className="cw-item">
                                    <h5>Phone</h5>
                                    <ul>
                                        <li>+91 7043834447</li>
                                        <li>+91 9313033208</li>
                                    </ul>
                                </div>
                                <div className="cw-item">
                                    <h5>E-mail</h5>
                                    <ul>
                                        <li>onlineauction12@gmail.com</li>
                                        <li>sezan3011@gmail.com</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="map" style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>

    <div className="map" style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
    <div className="row">
        <div className="col-lg-12">
            <iframe 
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=ssagrawal%20navsari+(Dental%20Health%20Care)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                height="560" 
                style={{ border: 0, width: "100%" }} 
                allowFullScreen="" 
                aria-hidden="false"     
                tabIndex="0">
            </iframe>
        </div>
    </div>
</div>

        
    </div>
</div>
    );
}

export default Contact;
