import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../assets/css/Banner.css'; 
import img1 from '../assets/images/10001.jpg'
import img2 from '../assets/images/10002.jpg'
import img3 from '../assets/images/10003.jpg'
import img4 from '../assets/images/10004.jpg'
import img5 from '../assets/images/10005.jpg'

 function Banner() {
  return (
    <div className="banner-wrapper">
      <Carousel
        autoPlay
        infiniteLoop
        interval={2500}
        showThumbs={false}
        showStatus={false}
        
      >
        <div>
          <img src={img1} alt="Banner 1" />
          
        </div>
        <div>
          <img src={img2} alt="Banner 2" />
        </div>
        <div>
          <img src={img3} alt="Banner 3" />
        </div>
        <div>
          <img src={img4} alt="Banner 4" />
          </div>
          <div>
          <img src={img5} alt="Banner 5" />
        </div>
      
      </Carousel>
    </div>
  );
}
export default Banner