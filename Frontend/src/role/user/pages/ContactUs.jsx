import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from './ContactUs.module.css';

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

  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: '' }); // Clear error when the user focuses on the field
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

    if (validateForm()) {
      try {
        await axios.post(API_URL, formData);
        navigate("/");
        console.log("Form submitted successfully.");
      } catch (error) {
        console.error("Error submitting form:", error);
      }

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
            onFocus={handleFocus}
            className={`${styles.input} form-control ${errors.contactdate ? 'is-invalid' : ''}`}
          />
          {errors.contactdate && <div className="invalid-feedback">{errors.contactdate}</div>}
        </div>

        <div className={styles.field}>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`${styles.input} form-control ${errors.fullname ? 'is-invalid' : ''}`}
          />
          {errors.fullname && <div className="invalid-feedback">{errors.fullname}</div>}
        </div>

        <div className={styles.field}>
          <label htmlFor="contactno">Contact Number</label>
          <input
            type="text"
            id="contactno"
            name="contactno"
            value={formData.contactno}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`${styles.input} form-control ${errors.contactno ? 'is-invalid' : ''}`}
          />
          {errors.contactno && <div className="invalid-feedback">{errors.contactno}</div>}
        </div>

        <div className={styles.field}>
          <label htmlFor="emailid">Email ID</label>
          <input
            type="email"
            id="emailid"
            name="emailid"
            value={formData.emailid}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`${styles.input} form-control ${errors.emailid ? 'is-invalid' : ''}`}
          />
          {errors.emailid && <div className="invalid-feedback">{errors.emailid}</div>}
        </div>

        <div className={styles.field}>
          <label htmlFor="details">Details</label>
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`${styles.textarea} form-control ${errors.details ? 'is-invalid' : ''}`}
          />
          {errors.details && <div className="invalid-feedback">{errors.details}</div>}
        </div>

        <button type="submit" className={`${styles.submitBtn} btn btn-primary w-100`}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
