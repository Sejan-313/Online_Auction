import React from 'react';

import styles from './Aboutus.module.css';  

const AboutUs = () => {
    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <div className={styles.containerSection}>
                    <div className={styles.title}>
                        <h1>About us</h1>
                    </div>
                    <div className={styles.content}>
                        <h3>Content</h3>
                        <p>
                            Welcome to our online auction platform! We aim to provide a seamless and engaging bidding experience 
                            where users can bid on a variety of products. Our platform is designed to ensure transparency, fairness, 
                            and a user-friendly interface for both sellers and buyers.
                        </p>
                        <div className={styles.button}>
                            <a href="#">Read more</a>
                        </div>
                    </div>
                </div>
                <div className={styles.imageSection}>
                    <img src="" alt="About Us" />
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
