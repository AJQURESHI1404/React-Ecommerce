import React, { useState, useEffect } from 'react';
import '../CSS/slideshow.css';
import slide1 from "../Logo/slide1.jpg";
import slide2 from "../Logo/slide2.jpg"

const Slideshow = () => {
  const images = [
    slide1,slide2
    ]
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);  // Change the interval duration (in milliseconds) as needed

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slideshow-container">
  {images.map((image, index) => (
    <img
      key={index}
      src={image}
      className={`slideshow-image ${index === currentImage ? 'active' : 'inactive'}`}
      alt="SlideShow"
    />
  ))}
</div>
  );
};

export default Slideshow;
