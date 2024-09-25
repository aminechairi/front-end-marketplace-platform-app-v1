import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "./brandsSkeletion.css";

const checkWindowWidth = () => {
  if (window.innerWidth < 640) {
    return 2;
  } else if (window.innerWidth >= 640 && window.innerWidth < 768) {
    return 3;
  } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
    return 3;
  } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
    return 4;
  } else {
    return 5;
  }
};

export default function BrandsSkeletion() {
  const data = [];
  for (let i = 0; i < checkWindowWidth() + 1; i++) {
    data.push(i);
  }

  const [columnsNumber, setColumnsNumver] = useState(checkWindowWidth());

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumnsNumver(2);
      } else if (window.innerWidth >= 640 && window.innerWidth < 768) {
        setColumnsNumver(3);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setColumnsNumver(3);
      } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
        setColumnsNumver(4);
      } else {
        setColumnsNumver(5);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="brands_skeletion">
      <div className="container">
        <div className="ab">
          <h1 className="title">
            <span>BRANDS</span>
          </h1>
          <Swiper
            spaceBetween={15}
            slidesPerView={columnsNumber + 0.5}
            slidesPerGroup={columnsNumber}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            {data.map((_, i) => {
              return (
                <SwiperSlide key={i + 1}>
                  <div className="card" key={i + 1}>
                    <div className="ab_img">
                      <div className="img"></div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
