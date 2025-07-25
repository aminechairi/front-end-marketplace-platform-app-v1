import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "./productsSlider.css";

import ProductsCard from "../productsCard/productsCard";
import ProductsCardSkeletion from "../productsCard/productsCardSkeletion";

const checkWindowWidth = () => {
  if (window.innerWidth < 640) {
    return 1;
  } else if (window.innerWidth >= 640 && window.innerWidth < 768) {
    return 2;
  } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
    return 3;
  } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
    return 4;
  } else {
    return 5;
  }
};

export default function ProductsSlider({ title, status, data }) {
  const [columnsNumber, setColumnsNumver] = useState(checkWindowWidth());

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumnsNumver(1);
      } else if (window.innerWidth >= 640 && window.innerWidth < 768) {
        setColumnsNumver(2);
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
    <>
      {status === "loading" ? (
        <div className="products_slider">
          <div className="container">
            <div className="ab">
              {title.length > 0 ? <h1 className="title">{title}</h1> : null}
              <Swiper
                spaceBetween={15}
                slidesPerView={columnsNumber + 0.5}
                slidesPerGroup={columnsNumber}
                navigation={true}
                modules={[Navigation, Pagination]}
                className="mySwiper"
              >
                {Array.from(new Array(columnsNumber + 1)).map((_, i) => {
                  return (
                    <SwiperSlide key={i + 1}>
                      <ProductsCardSkeletion />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      ) : status === "succeeded" && Array.isArray(data.data) ? (
        <div className="products_slider">
          <div className="container">
            <div className="ab">
              {title.length > 0 ? <h1 className="title">{title}</h1> : null}
              <Swiper
                spaceBetween={7.5}
                slidesPerView={columnsNumber + 0.5}
                slidesPerGroup={columnsNumber}
                navigation={true}
                modules={[Navigation, Pagination]}
                className="mySwiper"
              >
                {data.data.map((item, i) => {
                  return (
                    <SwiperSlide key={i + 1}>
                      <ProductsCard
                        _id={item._id}
                        title={item.title}
                        price={item.price}
                        priceBeforeDiscount={item.priceBeforeDiscount}
                        discountPercent={item.discountPercent}
                        imageCover={item.imageCover}
                        size={item.size}
                        quantity={item.quantity}
                        sold={item.sold}
                        ratingsAverage={item.ratingsAverage}
                        ratingsQuantity={item.ratingsQuantity}
                        isFavorite={item.isFavorite}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
