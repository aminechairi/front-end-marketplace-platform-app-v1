import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "./categoriesSkeleton.css";

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

export default function CategoriesSkeletion() {
  const data = [];
  for (let i = 0; i < checkWindowWidth(); i++) {
    data.push({
      name: "full category name & sub",
    });
  }

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
  for (let i = 0; i < data.length; i += columnsNumber) {
    const part = data.slice(i, i + columnsNumber);
    rankedData.push(part);
  };

  return (
    <div className="categories_skeletion">
      <div className="container">
        <div className="ab">
          <h1 className="title">
            <span>CATEGORIES CATEGORIES</span>
          </h1>
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {rankedData.map((item, i) => {
              return (
                <SwiperSlide key={i + 1}>
                  <div className="ab_cards">
                    {item.map((item, i) => {
                      return (
                        <div className="card" key={i + 1}>
                          <div className="ab_img">
                            <div className="img"></div>
                          </div>
                          <h1 className="h1">{item.name}</h1>
                        </div>
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
  );
}
