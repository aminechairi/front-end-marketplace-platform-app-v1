import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "./product.css";

import StarIcon from "@mui/icons-material/Star";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";

// Calculate Discount Percentage
function calculateDiscountPercentage(originalPrice, discountedPrice) {
  // Calculate the discount amount
  var discountAmount = originalPrice - discountedPrice;

  // Calculate the discount percentage
  var discountPercentage = (discountAmount / originalPrice) * 100;

  // Round the result to the nearest whole number
  var roundedDiscountPercentage = Math.round(discountPercentage);

  return roundedDiscountPercentage;
}

const images = [
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-9bbb5c5d-cc18-4ecc-959a-a7d9f1ad03ee-1722624771109.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240806%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240806T171506Z&X-Amz-Expires=3600&X-Amz-Signature=00beec57cea7024faa9d0701fc0a2894e12fa727063d0d5c6eb9c17548390f6c&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-9bbb5c5d-cc18-4ecc-959a-a7d9f1ad03ee-1722624771109.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240806%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240806T171506Z&X-Amz-Expires=3600&X-Amz-Signature=00beec57cea7024faa9d0701fc0a2894e12fa727063d0d5c6eb9c17548390f6c&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-9bbb5c5d-cc18-4ecc-959a-a7d9f1ad03ee-1722624771109.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240806%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240806T171506Z&X-Amz-Expires=3600&X-Amz-Signature=00beec57cea7024faa9d0701fc0a2894e12fa727063d0d5c6eb9c17548390f6c&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-9bbb5c5d-cc18-4ecc-959a-a7d9f1ad03ee-1722624771109.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240806%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240806T171506Z&X-Amz-Expires=3600&X-Amz-Signature=00beec57cea7024faa9d0701fc0a2894e12fa727063d0d5c6eb9c17548390f6c&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-9bbb5c5d-cc18-4ecc-959a-a7d9f1ad03ee-1722624771109.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240806%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240806T171506Z&X-Amz-Expires=3600&X-Amz-Signature=00beec57cea7024faa9d0701fc0a2894e12fa727063d0d5c6eb9c17548390f6c&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-9bbb5c5d-cc18-4ecc-959a-a7d9f1ad03ee-1722624771109.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240806%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240806T171506Z&X-Amz-Expires=3600&X-Amz-Signature=00beec57cea7024faa9d0701fc0a2894e12fa727063d0d5c6eb9c17548390f6c&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-9bbb5c5d-cc18-4ecc-959a-a7d9f1ad03ee-1722624771109.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240806%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240806T171506Z&X-Amz-Expires=3600&X-Amz-Signature=00beec57cea7024faa9d0701fc0a2894e12fa727063d0d5c6eb9c17548390f6c&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-9bbb5c5d-cc18-4ecc-959a-a7d9f1ad03ee-1722624771109.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240806%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240806T171506Z&X-Amz-Expires=3600&X-Amz-Signature=00beec57cea7024faa9d0701fc0a2894e12fa727063d0d5c6eb9c17548390f6c&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-9bbb5c5d-cc18-4ecc-959a-a7d9f1ad03ee-1722624771109.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240806%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240806T171506Z&X-Amz-Expires=3600&X-Amz-Signature=00beec57cea7024faa9d0701fc0a2894e12fa727063d0d5c6eb9c17548390f6c&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-9bbb5c5d-cc18-4ecc-959a-a7d9f1ad03ee-1722624771109.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240806%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240806T171506Z&X-Amz-Expires=3600&X-Amz-Signature=00beec57cea7024faa9d0701fc0a2894e12fa727063d0d5c6eb9c17548390f6c&X-Amz-SignedHeaders=host&x-id=GetObject",
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
                    {images.map((src, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={src}
                          alt=""
                          className="img"
                          onError={(e) => {
                            e.target.src = require("../../imgs/no found.jpeg");
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className="product_informations">
                <h1 className="product_title">
                  PlayStation 5 Slim Console (International Version) Disc
                  Version With Controller - New Model 2023
                </h1>
                <p className="product_description">
                  Experience next-level gaming with the PlayStation 5 Slim
                  Console, the latest 2023 international version. This sleek and
                  refined design retains all the powerful features of the
                  original PS5 while offering a more compact form factor, making
                  it a perfect fit for any entertainment setup.
                </p>
                <div className="ratingsAverage_and_ratingsQuantity">
                  <div className="ratingsAverage">
                    <p className="number">3.2</p>
                    <StarIcon className="icon" />
                  </div>
                  <div className="ratingsQuantity">
                    <p className="number">{"( 1720 )"}</p>
                  </div>
                </div>
                <p className="was">
                  <span>was:</span>
                  <span className="price">189.99 usd</span>
                  <span className="discount">{`-${calculateDiscountPercentage(
                    120.0,
                    99.99
                  )}%`}</span>
                </p>
                <p className="now">
                  <span>now:</span>
                  <span className="priceAfterDiscount">99.99 usd</span>
                </p>
                <div className="sold_and_quantity">
                  <div className="sold">
                    <div className="ab_icon">
                      <ShoppingCartCheckoutIcon className="icon" />
                    </div>
                    <p className="number">{`${214} sold recently`}</p>
                  </div>
                  <div className="quantity">
                    <div className="ab_icon">
                      <Inventory2Icon className="icon" />
                    </div>
                    <p className="number">{`only ${5236} left in stock`}</p>
                  </div>
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
