import React from 'react';
import Rules from './Rules'; // Assuming you've saved the Rules component in a separate file

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <div className="about-us-section">
                <h1 className="about-us-title">About Us</h1>
                <p className="about-us-description">
                    Welcome to our online auction platform! We aim to provide a seamless and engaging bidding experience 
                    where users can bid on a variety of products. Our platform is designed to ensure transparency, fairness, 
                    and a user-friendly interface for both sellers and buyers.
                </p>
                <p className="about-us-description">
                    Our team is dedicated to bringing you the best products at competitive prices. Whether you're a seasoned 
                    bidder or new to the auction world, we are here to support you throughout your journey. We believe in the 
                    power of community, and that's why we encourage feedback and open communication on our platform.
                </p>
                <p className="about-us-description">
                    Join us and start bidding today! Discover unique products, engage with sellers, and participate in exciting 
                    auctions from the comfort of your home.
                </p>
            </div>

            <div className="rules-section">
                <Rules />
            </div>
        </div>
    );
};

export default AboutUs;
