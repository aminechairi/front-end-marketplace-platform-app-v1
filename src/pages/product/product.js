import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "./product.css";

import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import NavBar from "../../components/navBar/navBar";
import ImageMagnifier from "../../components/imageMagnifier/imageMagnifier";
import Footer from "../../components/footer/footer";
import ButtinSave from "../../components/buttinSave/buttinSave";

const images = [
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-2d430d11-c0bf-46a8-b0d2-af1fa0976ffe-1722624433116.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240810%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240810T134948Z&X-Amz-Expires=3600&X-Amz-Signature=aaa45b1461a9d27cbc446cda2ea6d29a47b65936deb618914df769a63ffbfda5&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-2d430d11-c0bf-46a8-b0d2-af1fa0976ffe-1722624433116.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240810%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240810T134948Z&X-Amz-Expires=3600&X-Amz-Signature=aaa45b1461a9d27cbc446cda2ea6d29a47b65936deb618914df769a63ffbfda5&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-2d430d11-c0bf-46a8-b0d2-af1fa0976ffe-1722624433116.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240810%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240810T134948Z&X-Amz-Expires=3600&X-Amz-Signature=aaa45b1461a9d27cbc446cda2ea6d29a47b65936deb618914df769a63ffbfda5&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-2d430d11-c0bf-46a8-b0d2-af1fa0976ffe-1722624433116.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240810%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240810T134948Z&X-Amz-Expires=3600&X-Amz-Signature=aaa45b1461a9d27cbc446cda2ea6d29a47b65936deb618914df769a63ffbfda5&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-2d430d11-c0bf-46a8-b0d2-af1fa0976ffe-1722624433116.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240810%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240810T134948Z&X-Amz-Expires=3600&X-Amz-Signature=aaa45b1461a9d27cbc446cda2ea6d29a47b65936deb618914df769a63ffbfda5&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-2d430d11-c0bf-46a8-b0d2-af1fa0976ffe-1722624433116.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240810%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240810T134948Z&X-Amz-Expires=3600&X-Amz-Signature=aaa45b1461a9d27cbc446cda2ea6d29a47b65936deb618914df769a63ffbfda5&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-2d430d11-c0bf-46a8-b0d2-af1fa0976ffe-1722624433116.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240810%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240810T134948Z&X-Amz-Expires=3600&X-Amz-Signature=aaa45b1461a9d27cbc446cda2ea6d29a47b65936deb618914df769a63ffbfda5&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-2d430d11-c0bf-46a8-b0d2-af1fa0976ffe-1722624433116.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240810%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240810T134948Z&X-Amz-Expires=3600&X-Amz-Signature=aaa45b1461a9d27cbc446cda2ea6d29a47b65936deb618914df769a63ffbfda5&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-2d430d11-c0bf-46a8-b0d2-af1fa0976ffe-1722624433116.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240810%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240810T134948Z&X-Amz-Expires=3600&X-Amz-Signature=aaa45b1461a9d27cbc446cda2ea6d29a47b65936deb618914df769a63ffbfda5&X-Amz-SignedHeaders=host&x-id=GetObject",
  "https://eshopapp.s3.eu-central-1.amazonaws.com/products/product-2d430d11-c0bf-46a8-b0d2-af1fa0976ffe-1722624433116.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYJ4SPQHQ2WGHZFS%2F20240810%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240810T134948Z&X-Amz-Expires=3600&X-Amz-Signature=aaa45b1461a9d27cbc446cda2ea6d29a47b65936deb618914df769a63ffbfda5&X-Amz-SignedHeaders=host&x-id=GetObject",
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
              <div className="product_info">
                <p className="relations">
                  <span>Category</span>&nbsp;:&nbsp;<span>Sub category</span>
                </p>
                <h1 className="title">
                  Galaxy S24 Ultra Dual SIM Titanium Yellow 12GB RAM 256GB 5G -
                  Middle East Version
                </h1>
                <div className="prices">
                  <p className="price_1">150.99 USD</p>
                  <p className="price_2">
                    <span className="price">120.99 USD</span>&nbsp;/&nbsp;
                    <span className="discount">-36%</span>
                  </p>
                </div>
                <div className="r_rq_s_q">
                  <div className="box">
                    <h1 className="title">Ratings</h1>
                    <section className="section_of_values">
                      <p className="value">4.9</p>
                      <StarIcon className="ratings_icon" />
                    </section>
                  </div>
                  <div className="box">
                    <h1 className="title">Ratings quantity</h1>
                    <section className="section_of_values">
                      <PeopleIcon className="ratings_quantity_icon" />
                      <p className="value">1251</p>
                    </section>
                  </div>
                  <div className="box">
                    <h1 className="title">Sold</h1>
                    <section className="section_of_values">
                      <ShoppingCartCheckoutIcon className="sold_icon" />
                      <p className="value">125</p>
                    </section>
                  </div>
                  <div className="box">
                    <h1 className="title">Quantity</h1>
                    <section className="section_of_values">
                      <Inventory2Icon className="quantity_icon" />
                      <p className="value">36</p>
                    </section>
                  </div>
                </div>
                <p className="relations">
                  <span>Brand</span>&nbsp;:&nbsp;<span>addedas</span>
                </p>
                <p className="relations">
                  <span>Color name</span>&nbsp;:&nbsp;<span>red</span>
                </p>
                <div className="sizes">
                  <button>s</button>
                  <button>m</button>
                  <button>l</button>
                  <button>xl</button>
                  <button>xxl</button>
                  <button>3xl</button>
                </div>
                <div className="q_a_s">
                  <div className="quantity">
                    <button className="button">
                      <RemoveIcon className="icon" />
                    </button>
                    <div className="number">13</div>
                    <button className="button">
                      <AddIcon className="icon" />
                    </button>
                  </div>
                  <button className="add_to_cart">Add to cart</button>
                  <div className="save">
                    <ButtinSave />
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
