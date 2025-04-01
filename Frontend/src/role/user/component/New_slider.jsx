import React, { useState } from 'react';
import styles from './Slider.module.css';

const New_slider = () => {
  // Initial slider images array
  const initialItems = [
    {
      id: 1,
      name: "Switzerland",
      img: "https://i.ibb.co/qCkd9jS/img1.jpg",
      des: "X-Dev, Transforming code into visual poetry..!",
    },
    {
      id: 2,
      name: "Finland",
      img: "https://i.ibb.co/jrRb11q/img2.jpg",
      des: "X-Dev, Transforming code into visual poetry..!",
    },
    {
      id: 3,
      name: "Iceland",
      img: "https://i.ibb.co/NSwVv8D/img3.jpg",
      des: "X-Dev, Transforming code into visual poetry..!",
    },
    {
      id: 4,
      name: "Australia",
      img: "https://i.ibb.co/Bq4Q0M8/img4.jpg",
      des: "X-Dev, Transforming code into visual poetry..!",
    },
    {
      id: 5,
      name: "Netherlands",
      img: "https://i.ibb.co/jTQfmTq/img5.jpg",
      des: "X-Dev, Transforming code into visual poetry..!",
    },
    {
      id: 6,
      name: "Ireland",
      img: "https://i.ibb.co/RNkk6L0/img6.jpg",
      des: "X-Dev, Transforming code into visual poetry..!",
    }
  ];

  // State to manage the order of items
  const [items, setItems] = useState(initialItems);

  const handleNext = () => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const firstItem = newItems.shift(); // Remove the first item
      newItems.push(firstItem); // Add the first item to the end
      return newItems;
    });
  };

  const handlePrev = () => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const lastItem = newItems.pop(); // Remove the last item
      newItems.unshift(lastItem); // Add the last item to the start
      return newItems;
    });
  };

  return (
    <div>
      

      <div className={styles.container}>
        <div className={styles.slide}>
          {items.map((item, index) => (
            <div
              key={item.id}
              className={styles.item}
              style={{ backgroundImage: `url(${item.img})` }}
            >
              <div className={styles.content}>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.des}>{item.des}</div>
                <button className='btn btn-danger'>See More</button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.btn}>
          <button className="btn btn-danger " onClick={handlePrev}>
            Previous
          </button>
          <button className="btn btn-success ml-3" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default New_slider;
