// src/ContactUs.jsx
import React, { useState } from 'react';
import styles from './ContactUs.module.css';
import axios from "axios"
import { useNavigate } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;


const ContactUs = () => {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    contactdate: '',
    fullname: '',
    contactno: '',
    emailid: '',
    details: '',
  });

  const [errors, setErrors] = useState({
    contactdate: '',
    fullname: '',
    contactno: '',
    emailid: '',
    details: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    if (!formData.contactdate) {
      formErrors.contactdate = 'Contact Date is required';
      valid = false;
    }

    if (!formData.fullname) {
      formErrors.fullname = 'Full Name is required';
      valid = false;
    }

    if (!formData.contactno) {
      formErrors.contactno = 'Contact Number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(formData.contactno)) {
      formErrors.contactno = 'Contact Number should be 10 digits';
      valid = false;
    }

    if (!formData.emailid) {
      formErrors.emailid = 'Email ID is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.emailid)) {
      formErrors.emailid = 'Email ID is invalid';
      valid = false;
    }

    if (!formData.details) {
      formErrors.details = 'Details are required';
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    

    try {
      await axios.post(API_URL, formData);
      navigate("/");
      console.log("sended");
      
  } catch (error) {
      console.error("Error adding student:", error);
  }

    if (validateForm()) {
      alert('Form submitted successfully!');
      setFormData({
        contactdate: '',
        fullname: '',
        contactno: '',
        emailid: '',
        details: '',
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="contactdate">Contact Date</label>
          <input
            type="date"
            id="contactdate"
            name="contactdate"
            value={formData.contactdate}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.contactdate && <p className={styles.error}>{errors.contactdate}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.fullname && <p className={styles.error}>{errors.fullname}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="contactno">Contact Number</label>
          <input
            type="text"
            id="contactno"
            name="contactno"
            value={formData.contactno}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.contactno && <p className={styles.error}>{errors.contactno}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="emailid">Email ID</label>
          <input
            type="email"
            id="emailid"
            name="emailid"
            value={formData.emailid}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.emailid && <p className={styles.error}>{errors.emailid}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="details">Details</label>
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            className={styles.textarea}
          />
          {errors.details && <p className={styles.error}>{errors.details}</p>}
        </div>
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
