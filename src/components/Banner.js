import React, { useState, useEffect } from 'react';

const Banner = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    
    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const imageSrc = screenWidth > 1250 
    ? `${process.env.PUBLIC_URL}/banner.png`
    : `${process.env.PUBLIC_URL}/banner_portrait.png`;

  return <img className="banner-image" src={imageSrc} alt="" />;
};

export default Banner;