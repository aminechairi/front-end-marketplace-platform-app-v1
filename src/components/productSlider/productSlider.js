import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "./productSlider.css";

import ImageMagnifier from "../../components/imageMagnifier/imageMagnifier";
import ButtonSave from "../../components/buttinSave/buttinSave";

function ProductSlider({ productImages, _id, save }) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
    setActiveIndex(index);
  };

  return (
    <div className="product_slider">
      <div className="images">
        {productImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt=""
            className={`img ${activeIndex === index ? "active" : ""}`}
            onError={(e) => {
              e.target.src = require("../../imgs/no found.jpeg");
            }}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
      <div className="image_cover">
        <Swiper
          ref={swiperRef}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          pagination={{
            type: "fraction",
          }}
          modules={[Pagination]}
        >
          {productImages.map((src, index) => {
            return (
              <SwiperSlide key={index}>
                <ImageMagnifier src={src} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="save">
        <ButtonSave _id={_id} save={save} />
      </div>
    </div>
  );
}

export default ProductSlider;
