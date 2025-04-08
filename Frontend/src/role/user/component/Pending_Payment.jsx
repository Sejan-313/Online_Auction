import css from "./Pending_Payment.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const Pending_Payment = () => {
    const user_id = localStorage.getItem("user_id");
    const navigate = useNavigate();
    const [amount, setAmount] = useState(350); // Amount is in INR, this is ₹350.
    
    const handlePayment = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/order`, { amount });
            console.log(res.data);  // Log the response data to check if it contains the order data
    
            if (res.data && res.data.data) {
                handlePaymentVerify(res.data.data);  // Pass the order data to the Razorpay modal
            } else {
                console.error("Order data is missing in response:", res);
                toast.error("Failed to get order details");
            }
    
        } catch (error) {
            console.error("Error in payment request:", error);
            toast.error("Failed to create order. Please try again later.");
        }
    };
    const handlePaymentVerify = async (data) => {
        const options = {
            key: "rzp_test_b4iBWY0X70QR2V",  // Ensure this is your actual Razorpay key
            amount: data.amount,  // This should be in paise (data.amount should be passed from the backend)
            currency: data.currency,
            name: "Sejan",
            description: "Test Mode",
            order_id: data.id,  // This should match the order ID sent from the backend
            handler: async (res) => {
                console.log("Response", res);
    
                const obj = {
                    razorpay_order_id: res.razorpay_order_id,
                    razorpay_payment_id: res.razorpay_payment_id,
                    razorpay_signature: res.razorpay_signature
                }
    
                try {
                    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/verify`, { obj });
    
                    if (res) {
                        toast.success(res.message);
                    }
    
                } catch (error) {
                    console.log("Error", error);
                }
            },
            theme: {
                color: "5f63b8"
            }
        };
    
        const rzp1 = new window.Razorpay(options);
        rzp1.open();  // This opens the Razorpay payment modal
    };

    return (
        <div className={css['pending_payment']}>
            <div className={`${css['card']} border-top p-2 mb-3`}>
                <div style={{ height: "100%", width: "150px" }}>
                    <img style={{ objectFit: "contain", height: "100%", width: "100%" }} src="../../../../public/img/ios_product.jpg" alt="" />
                </div>
                <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
                    <span>vinit</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia voluptate assumenda quidem dolorem eos velit in officia quas soluta doloremque. Iusto corporis !</p>
                </div>
                <div style={{ height: "100%", width: "150px" }} className="d-flex justify-content-center align-items-center border-start">
                    <input type="submit" onClick={handlePayment} value="Pay" className="btn btn-success" />
                </div>
            </div>
            <Toaster />
        </div>
    );
}

export default Pending_Payment;
