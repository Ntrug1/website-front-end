import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {Carousel} from "react-responsive-carousel"
import "../styles/Slider.module.css"

const SimpleCarousel = () => {
  return <div>
    <Carousel infiniteLoop autoPlay showThumbs={false} showStatus={false}>
      <div className="image">
        <img src="/images_slider/image1.jpg"/>
      </div>
      <div className="image">
        <img src="/images_slider/image2.jpg"/>
      </div>
      <div className="image">
        <img src="/images_slider/image3.jpg"/>
      </div>
    </Carousel>
  </div>
};

export default SimpleCarousel;