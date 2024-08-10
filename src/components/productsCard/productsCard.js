import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./productsCard.css";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import StarIcon from "@mui/icons-material/Star";
import { useSelector, useDispatch } from "react-redux";
import ButtinSave from "../buttinSave/buttinSave";
import calculateDiscountPercentage from "../../utils/calculateDiscountPercentage";

import {
  addProductToSaves,
  removeProductFromSaves,
} from "../../redux/savesSlice";
import { LOGIN } from "./../../routes";


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
          <Link to={`/product/${_id}`}>
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
            <ButtinSave
              _id={_id}
              isSaved={isSaved}
              handleSaveChange={handleSaveChange}
            />
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
      <Link to={`/product/${_id}`}>
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
