import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./productInformation.css";

import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import calculateDiscountPercentage from "../../utils/calculateDiscountPercentage";

function ProductInformation({ productInfo }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeInfo, setSizeInfo] = useState({});
  const [quantity, setQuantity] = useState(
    productInfo.quantity === 0 || sizeInfo.quantity === 0 ? 0 : 1
  );

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const getShortDescription = () => {
    const words = productInfo.description.split(" ");
    return words.slice(0, 32).join(" ") + (words.length > 32 ? "..." : "");
  };

  useEffect(() => {
    if (productInfo.sizes && productInfo.sizes.length > 0) {
      const minPriceSize = productInfo.sizes.reduce((min, size) =>
        size.price < min.price ? size : min
      );
      setSelectedSize(minPriceSize);
      setSizeInfo({
        size: minPriceSize.size,
        quantity: minPriceSize.quantity,
        price: minPriceSize.price,
        priceAfterDiscount: minPriceSize.priceAfterDiscount,
      });
    } else {
      setSizeInfo({
        price: productInfo.price,
        priceAfterDiscount: productInfo.priceAfterDiscount,
      });
    }
  }, [productInfo]);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setSizeInfo({
      size: size.size,
      quantity: size.quantity,
      price: size.price,
      priceAfterDiscount: size.priceAfterDiscount,
    });
    setQuantity(1);
  };

  const incrementQuantity = () => {
    if (quantity < (productInfo.quantity ?? sizeInfo.quantity)) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="product_information">
      <p className="relations">
        <span>Category</span>&nbsp;:&nbsp;
        <span>{productInfo.category?.name}</span>
      </p>

      <h1 className="title">{productInfo.title}</h1>

      <div className="description_container">
        <p className="description">
          {isExpanded ? productInfo.description : getShortDescription()}
        </p>
        {productInfo.description.split(" ").length > 32 && (
          <button onClick={toggleDescription} className="learn_more_button">
            {isExpanded ? "Show Less" : "Learn More"}
          </button>
        )}
      </div>

      <div className="prices">
        {sizeInfo.priceAfterDiscount !== undefined &&
        sizeInfo.priceAfterDiscount !== null ? (
          <>
            <p className="price_1">
              {sizeInfo.price !== undefined && sizeInfo.price !== null
                ? sizeInfo.price.toFixed(2).replace(".", ",")
                : "N/A"}{" "}
              UDS
            </p>
            <p className="price_2">
              <span className="price">
                {sizeInfo.priceAfterDiscount.toFixed(2).replace(".", ",")} USD
              </span>
              &nbsp;/&nbsp;
              <span className="discount">
                -
                {calculateDiscountPercentage(
                  sizeInfo.price,
                  sizeInfo.priceAfterDiscount
                )}{" "}
                %
              </span>
            </p>
          </>
        ) : (
          <p className="price_2">
            <span className="price">
              {sizeInfo.price !== undefined && sizeInfo.price !== null
                ? sizeInfo.price.toFixed(2).replace(".", ",")
                : "N/A"}{" "}
              USD
            </span>
          </p>
        )}
      </div>

      <div className="r_rq_s_q">
        <div className="box">
          <h1 className="title">Ratings</h1>
          <section className="section_of_values">
            <p className="value">{productInfo.ratingsAverage}</p>
            <StarIcon className="ratings_icon" />
          </section>
        </div>
        <div className="box">
          <h1 className="title">Ratings quantity</h1>
          <section className="section_of_values">
            <PeopleIcon className="ratings_quantity_icon" />
            <p className="value">{productInfo.ratingsQuantity}</p>
          </section>
        </div>
        <div className="box">
          <h1 className="title">Sold</h1>
          <section className="section_of_values">
            <ShoppingCartCheckoutIcon className="sold_icon" />
            <p className="value">{productInfo.sold}</p>
          </section>
        </div>
        <div className="box">
          <h1 className="title">Quantity</h1>
          <section className="section_of_values">
            <Inventory2Icon className="quantity_icon" />
            <p className="value">{productInfo.quantity ?? sizeInfo.quantity}</p>
          </section>
        </div>
      </div>

      {productInfo.brand && (
        <p className="relations">
          <span>Brand</span>&nbsp;:&nbsp;<span>{productInfo.brand.name}</span>
        </p>
      )}

      {productInfo.color && (
        <p className="relations">
          <span>Color</span>&nbsp;:&nbsp;<span>{productInfo.color}</span>
        </p>
      )}

      {productInfo.sizes && (
        <div className="sizes">
          {productInfo.sizes.map((item) => (
            <button
              key={item._id}
              onClick={() => handleSizeClick(item)}
              className={
                selectedSize && selectedSize.size === item.size
                  ? "selected"
                  : ""
              }
            >
              {item.size}
            </button>
          ))}
        </div>
      )}

      {productInfo.group ? (
        <div className="group">
          {productInfo.group.productsIDs.map((item) => {
            return (
              <Link
                to={`/product/${item._id}`}
                key={item._id}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <div
                  className={`img ${
                    item._id === productInfo._id ? "selected" : ""
                  }`}
                  onError={(e) => {
                    e.target.src = require("../../imgs/Product image on error.png");
                  }}
                >
                  <img src={item.imageCover} alt="" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : null}

      <div className="q_a_s">
        <div className="quantity">
          <button className="button" onClick={decrementQuantity}>
            <RemoveIcon className="icon" />
          </button>
          <div className="number">{quantity}</div>
          <button className="button" onClick={incrementQuantity}>
            <AddIcon className="icon" />
          </button>
        </div>
        <button className="add_to_cart">Add to cart</button>
      </div>
    </div>
  );
}

export default ProductInformation;
