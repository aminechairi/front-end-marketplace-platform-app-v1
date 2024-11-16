import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "./brands.css";

import BrandsSkeletion from "./brandsSkeletion";

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

export default function Brands({ status, data }) {
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

  return status === "loading" ? (
    <BrandsSkeletion />
  ) : status === "succeeded" && Array.isArray(data?.data) ? (
    <>
      <div className="brands">
        <div className="container">
          <div className="ab">
            <h1 className="title">BRANDS</h1>
            <Swiper
              spaceBetween={15}
              slidesPerView={columnsNumber + 0.5}
              slidesPerGroup={columnsNumber}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {data.data.map((item, i) => {
                return (
                  <SwiperSlide key={i + 1}>
                    <Link to={`/search/?page=1&brand=${item._id}`} key={i + 1}>
                      <div className="card">
                        <img
                          className="img"
                          src={item.image}
                          alt=""
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = require("../../imgs/Brand image on error.png");
                          }}
                        />
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  ) : null;
}
