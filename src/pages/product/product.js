import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "./product.css";

import NavBar from "../../components/navBar/navBar";
import ImageMagnifier from "../../components/imageMagnifier/imageMagnifier";
import Footer from "../../components/footer/footer";

const images = [
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-a6fdf84b-c777-476b-8b12-d97079cd961a-1722624346168.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240808%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240808T174534Z&X-Amz-Expires=3600&X-Amz-Signature=fb86d2c73f04f8b7c1d12277721c755757e8799ff6d0f41973906a0a797578ee&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-a6fdf84b-c777-476b-8b12-d97079cd961a-1722624346168.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240808%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240808T174534Z&X-Amz-Expires=3600&X-Amz-Signature=fb86d2c73f04f8b7c1d12277721c755757e8799ff6d0f41973906a0a797578ee&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-a6fdf84b-c777-476b-8b12-d97079cd961a-1722624346168.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240808%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240808T174534Z&X-Amz-Expires=3600&X-Amz-Signature=fb86d2c73f04f8b7c1d12277721c755757e8799ff6d0f41973906a0a797578ee&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-a6fdf84b-c777-476b-8b12-d97079cd961a-1722624346168.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240808%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240808T174534Z&X-Amz-Expires=3600&X-Amz-Signature=fb86d2c73f04f8b7c1d12277721c755757e8799ff6d0f41973906a0a797578ee&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-a6fdf84b-c777-476b-8b12-d97079cd961a-1722624346168.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240808%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240808T174534Z&X-Amz-Expires=3600&X-Amz-Signature=fb86d2c73f04f8b7c1d12277721c755757e8799ff6d0f41973906a0a797578ee&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-a6fdf84b-c777-476b-8b12-d97079cd961a-1722624346168.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240808%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240808T174534Z&X-Amz-Expires=3600&X-Amz-Signature=fb86d2c73f04f8b7c1d12277721c755757e8799ff6d0f41973906a0a797578ee&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-a6fdf84b-c777-476b-8b12-d97079cd961a-1722624346168.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240808%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240808T174534Z&X-Amz-Expires=3600&X-Amz-Signature=fb86d2c73f04f8b7c1d12277721c755757e8799ff6d0f41973906a0a797578ee&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-a6fdf84b-c777-476b-8b12-d97079cd961a-1722624346168.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240808%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240808T174534Z&X-Amz-Expires=3600&X-Amz-Signature=fb86d2c73f04f8b7c1d12277721c755757e8799ff6d0f41973906a0a797578ee&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-a6fdf84b-c777-476b-8b12-d97079cd961a-1722624346168.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240808%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240808T174534Z&X-Amz-Expires=3600&X-Amz-Signature=fb86d2c73f04f8b7c1d12277721c755757e8799ff6d0f41973906a0a797578ee&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-a6fdf84b-c777-476b-8b12-d97079cd961a-1722624346168.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240808%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240808T174534Z&X-Amz-Expires=3600&X-Amz-Signature=fb86d2c73f04f8b7c1d12277721c755757e8799ff6d0f41973906a0a797578ee&X-Amz-SignedHeaders=host&x-id=GetObject",
];

function Product() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
    setActiveIndex(index);
  };
  return (
    <>
      <NavBar />
      <div className="product_page">
        <div className="container">
          <div className="ab">
            <section className="section_1">
              <div className="product_images">
                <div className="images">
                  {images.map((src, index) => (
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
                    onSlideChange={(swiper) =>
                      setActiveIndex(swiper.activeIndex)
                    }
                    pagination={{
                      type: "fraction",
                    }}
                    modules={[Pagination]}
                  >
                    {images.map((src, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <ImageMagnifier src={src} />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Product;
