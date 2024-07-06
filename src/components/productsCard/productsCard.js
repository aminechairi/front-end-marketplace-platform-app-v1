import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./productsCard.css";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import StarIcon from "@mui/icons-material/Star";
import { useSelector, useDispatch } from "react-redux";

import {
  addProductToSaves,
  removeProductFromSaves,
} from "../../redux/savesSlice";
import { LOGIN } from "./../../routes";

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

export default function ProductsCard({
  _id,
  title,
  price,
  priceAfterDiscount,
  imageCover,
  quantity,
  sold,
  ratingsAverage,
  ratingsQuantity,
  save,
}) {
  const [isSaved, setIsSaved] = useState(Boolean(save));
  const JWTToken = useSelector((state) => state.cookies.JWTToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSaveChange = (e, productId) => {
    setIsSaved(e.target.checked);
    if (JWTToken) {
      if (e.target.checked) {
        dispatch(
          addProductToSaves({
            productId: productId,
          })
        );
      } else {
        dispatch(removeProductFromSaves(productId));
      }
    } else {
      navigate(LOGIN);
    }
  };

  return (
    <div className="products_card">
      <section className="sec_1">
        <div className="ab_img">
          <Link to={`/products/${_id}`}>
            <img
              src={imageCover}
              alt=""
              className="img"
              onError={(e) => {
                e.target.src = require("../../imgs/no found.jpeg");
              }}
            />
          </Link>
          <div className="save">
            <div className="heart-container" title="Like">
              <input
                checked={isSaved}
                type="checkbox"
                className="checkbox"
                id="Give-It-An-Id"
                onChange={(e) => handleSaveChange(e, _id)}
              />
              <div className="svg-container">
                <svg
                  viewBox="0 0 24 24"
                  className="svg-outline"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  className="svg-filled"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                </svg>
                <svg
                  className="svg-celebrate"
                  width={100}
                  height={100}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="10,10 20,20" />
                  <polygon points="10,50 20,50" />
                  <polygon points="20,80 30,70" />
                  <polygon points="90,10 80,20" />
                  <polygon points="90,50 80,50" />
                  <polygon points="80,80 70,70" />
                </svg>
              </div>
            </div>
          </div>
          <div className="ratingsAverage_and_ratingsQuantity">
            <div className="ratingsAverage">
              <p className="number">{ratingsAverage}</p>
              <StarIcon className="icon" />
            </div>
            <div className="ratingsQuantity">
              <p className="number">{ratingsQuantity}</p>
            </div>
          </div>
        </div>
      </section>
      <Link to={`/products/${_id}`}>
        <section className="sec_2">
          <h1 className="product_title">{title}</h1>
          <div className="price">
            <p className="currency">usd</p>
            <p className="number">
              {priceAfterDiscount?.toFixed(2).replace(".", ",") ||
                price.toFixed(2).replace(".", ",")}
            </p>
          </div>
          {priceAfterDiscount ? (
            <div className="ab_discount">
              <p className="price">{price.toFixed(2).replace(".", ",")}</p>
              <p className="discount">
                {`-${calculateDiscountPercentage(price, priceAfterDiscount)}%`}
              </p>
            </div>
          ) : null}
          <div className="sold_and_quantity">
            <div className="sold">
              <div className="ab_icon">
                <ShoppingCartCheckoutIcon className="icon" />
              </div>
              <p className="number">{`${sold} sold recently`}</p>
            </div>
            <div className="quantity">
              <div className="ab_icon">
                <Inventory2Icon className="icon" />
              </div>
              <p className="number">{`only ${quantity} left in stock`}</p>
            </div>
          </div>
        </section>
      </Link>
    </div>
  );
}
