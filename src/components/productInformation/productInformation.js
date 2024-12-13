import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./productInformation.css";

import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CircularProgress from "@mui/material/CircularProgress";

import useFetch from "../../hooks/useFetch";
import baseUrl from "../../config/config";
import cookieManager from "../../utils/cookieManager";
import { currency } from "../../constens/constens";
import { findSmallestPriceSize } from "../../utils/findSmallestPriceSize";
import { LOGIN } from "./../../routes";

function ProductInformation({ productInfo }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeInfo, setSizeInfo] = useState({});
  const [quantity, setQuantity] = useState();
  const { data: cart, fetchData: addProductToCart } = useFetch();
  const navigate = useNavigate();

  const toggleDescription = () => setIsExpanded(!isExpanded);

  const getShortDescription = () => {
    const words = productInfo.description.split(" ");
    return words.slice(0, 32).join(" ") + (words.length > 32 ? "..." : "");
  };

  useEffect(() => {
    if (productInfo.sizes?.length > 0) {
      const minPriceSize = findSmallestPriceSize(productInfo.sizes);
      setSelectedSize(minPriceSize);
      setSizeInfo({
        size: minPriceSize.size,
        quantity: minPriceSize.quantity,
        price: minPriceSize.price,
        priceBeforeDiscount: minPriceSize.priceBeforeDiscount,
        discountPercent: minPriceSize.discountPercent,
      });
    } else {
      setSizeInfo({
        price: productInfo.price,
        priceBeforeDiscount: productInfo.priceBeforeDiscount,
        discountPercent: productInfo.discountPercent,
        quantity: productInfo.quantity,
      });
    }
  }, [productInfo]);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setSizeInfo({
      size: size.size,
      quantity: size.quantity,
      price: size.price,
      priceBeforeDiscount: size.priceBeforeDiscount,
      discountPercent: size.discountPercent,
    });
  };

  const incrementQuantity = () => {
    if (quantity < sizeInfo.quantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const addProductToShoppingCart = () => {
    const JWTToken = `Bearer ${cookieManager("get", "JWTToken")}`;

    if (cookieManager("get", "JWTToken")) {
      if (sizeInfo.quantity && cart.status !== "loading") {
        addProductToCart({
          url: `${baseUrl}/cart`,
          method: "post",
          data: {
            productId: productInfo._id,
            quantity,
            size: sizeInfo.size,
          },
          headers: {
            Authorization: JWTToken,
          },
        });
      }      
    } else {
      navigate(LOGIN);
    }
  };

  useEffect(() => {
    if (cart.status === "succeeded" && cart.data?.data) {
      if (productInfo.sizes.length > 0) {
        productInfo.sizes = productInfo.sizes.map((item) => {
          return {
            ...item,
            quantity: item.size === sizeInfo.size ? sizeInfo.quantity - quantity : item.quantity
          }
        });
      }
      setSizeInfo({
        ...sizeInfo,
        quantity: sizeInfo.quantity - quantity
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.data?.data, cart.status]);

  useEffect(() => {
    setQuantity(sizeInfo.quantity === 0 ? 0 : 1);
  }, [sizeInfo.quantity]);

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

      {productInfo.brand && (
        <p className="relations">
          <span>Brand</span>&nbsp;:&nbsp;<span>{productInfo.brand.name}</span>
        </p>
      )}

      <div className="prices">
        {sizeInfo.priceBeforeDiscount ? (
          <p className="price_1">
            {sizeInfo?.priceBeforeDiscount.toFixed(2).replace(".", ",") +
              " " +
              currency}
          </p>
        ) : null}
        <p className="price_2">
          <span className="price">
            {sizeInfo.price
              ? sizeInfo?.price.toFixed(2).replace(".", ",") + " " + currency
              : null}{" "}
          </span>
          {sizeInfo.discountPercent ? (
            <>
              &nbsp;/&nbsp;
              <span className="discount">-{sizeInfo.discountPercent}%</span>
            </>
          ) : null}
        </p>
      </div>

      <div className="r_rq_s_q">
        <div className="box">
          <h1 className="title">Average Rating</h1>
          <section className="section_of_values">
            <p className="value">{productInfo.ratingsAverage}</p>
            <StarIcon className="ratings_icon" />
          </section>
        </div>
        <div className="box">
          <h1 className="title">Ratings Quantity</h1>
          <section className="section_of_values">
            <PeopleIcon className="ratings_quantity_icon" />
            <p className="value">{productInfo.ratingsQuantity}</p>
          </section>
        </div>
        <div className="box">
          <h1 className="title">Units Sold</h1>
          <section className="section_of_values">
            <ShoppingCartCheckoutIcon className="sold_icon" />
            <p className="value">+{productInfo.sold}</p>
          </section>
        </div>
        <div
          className="box"
          style={
            sizeInfo.quantity === 0
              ? {
                  outline: "1px solid var(--color-of-error)",
                  color: "var(--color-of-error)",
                }
              : {}
          }
        >
          <h1 className="title">In Stock</h1>
          <section className="section_of_values">
            <Inventory2Icon className="quantity_icon" />
            <p className="value">
              {sizeInfo.quantity === 0
                ? "Out of the stock."
                : sizeInfo.quantity}
            </p>
          </section>
        </div>
      </div>

      {productInfo.sizes?.length > 0 && (
        <div className="sizes">
          <h1 className="title">Sizes</h1>
          <div className="size">
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
        </div>
      )}

      {productInfo.group ? (
        <div className="group">
          {productInfo.group.productsIDs.map((item, i) => {
            return (
              <Link
                to={`/product/${item._id}`}
                key={i}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <div
                  className={`img ${
                    item._id === productInfo._id ? "selected" : ""
                  }`}
                >
                  <img
                    src={item.imageCover}
                    alt=""
                    onError={(e) => {
                      e.target.src = require("../../imgs/Product image on error.png");
                    }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      ) : null}

      {cart.data?.status === "fail" ? (
        <p className="error_message">{cart.data?.message}</p>
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
        <button
          className="add_to_cart"
          style={
            sizeInfo.quantity === 0
              ? {
                  backgroundColor: "gray",
                  cursor: "not-allowed",
                }
              : {}
          }
          onClick={addProductToShoppingCart}
        >
          {cart.status === "loading" ? (
            <CircularProgress size="27px" color="inherit" />
          ) : (
            "Add to cart"
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductInformation;
