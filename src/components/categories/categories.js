import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "./categories.css";

import CategoriesSkeletion from "./categoriesSkeleton";

const checkWindowWidth = () => {
  if (window.innerWidth < 640) {
    return 6;
  } else if (window.innerWidth >= 640 && window.innerWidth < 768) {
    return 5;
  } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
    return 6;
  } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
    return 8;
  } else {
    return 10;
  }
};

export default function Categories({ status, data }) {
  const [columnsNumber, setColumnsNumver] = useState(checkWindowWidth());

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumnsNumver(6);
      } else if (window.innerWidth >= 640 && window.innerWidth < 768) {
        setColumnsNumver(5);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setColumnsNumver(6);
      } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
        setColumnsNumver(8);
      } else {
        setColumnsNumver(10);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const rankedData = [];
  if (Array.isArray(data?.data)) {
    const list = data.data;
    for (let i = 0; i < list.length; i += columnsNumber) {
      const part = list.slice(i, i + columnsNumber);
      rankedData.push(part);
    }
  }

  return status === "idle" || status === "loading" ? (
    <CategoriesSkeletion />
  ) : status === "succeeded" && Array.isArray(data?.data) ? (
    <div className="categories">
      <div className="container">
        <div className="ab">
          <h1 className="title">CATEGORIES</h1>
          <Swiper
            navigation={true}
            pagination={true}
            modules={[Navigation, Pagination]}
            className="mySwiper"
          >
            {rankedData.map((item, i) => {
              return (
                <SwiperSlide key={i + 1}>
                  <div className="ab_cards">
                    {item.map((item, i) => {
                      return (
                        <Link to={`/categories/${item._id}`} key={i + 1}>
                          <div className="card">
                            <img
                              className="img"
                              src={item.image}
                              alt=""
                              onError={(e) => {
                                e.target.src = require("../../imgs/Category image on error.png");
                              }}
                            />
                            <h1 className="h1">{item.name}</h1>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  ) : null;
}
