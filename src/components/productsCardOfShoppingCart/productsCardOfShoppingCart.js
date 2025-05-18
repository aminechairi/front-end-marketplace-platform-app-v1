import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import "./productsCardOfShoppingCart.css";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { currency } from "../../constens/constens";

export default function ProductsCardOfShoppingCart({
  _id,
  title,
  imageCover,
  productQuantity,
  itemQuantity,
  size,
  color,
  price,
  totalPrice,
  deleteItem,
  updateItemQuantity,
}) {
  const [quantityControl, setQuantityControl] = useState(itemQuantity);
  const quantityRef = useRef(itemQuantity); // Store the current quantity
  const debounceTimeout = useRef(null); // Reference for timeout

  // Update quantity with debounce
  useEffect(() => {
    if (quantityRef.current !== quantityControl) {
      // Clear previous timeout
      clearTimeout(debounceTimeout.current);

      // Set a new timeout
      debounceTimeout.current = setTimeout(() => {
        updateItemQuantity({
          productId: _id,
          size,
          quantity: quantityControl,
        });
        quantityRef.current = quantityControl; // Update the reference
      }, 500);
    }

    // Cleanup timeout on component unmount or re-render
    return () => clearTimeout(debounceTimeout.current);
  }, [quantityControl, _id, size, updateItemQuantity]);

  const incrementQuantity = () => {
    if (quantityControl < productQuantity + itemQuantity) {
      setQuantityControl((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantityControl > 1) {
      setQuantityControl((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="shopping_cart_card">
      <section className="product_image_section">
        <div className="product_image_wrapper">
          <Link
            to={`/product/${_id}${size ? `?size=${size}` : ``}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src={imageCover}
              alt=""
              loading="lazy"
              className="product_image"
              onError={(e) => {
                e.target.src = require("../../imgs/Product image on error.png");
              }}
            />
          </Link>
        </div>
      </section>

      <section className="product_details_section">
        <Link
          to={`/product/${_id}${size ? `?size=${size}` : ``}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <h1 className="product_title">{title}</h1>
        </Link>

        <p className="product_info">
          {itemQuantity !== undefined && `Quantity: ${itemQuantity} `}
          {totalPrice !== undefined && `/ Total price: ${totalPrice} `}
          {size !== undefined && `/ Size: ${`${size}`.toUpperCase()} `}
          {color !== undefined && `/ Color: ${color} `}
        </p>

        <p className="product_price">
          {price.toFixed(2).replace(".", ",")} {currency}
        </p>

        <div className="quantity_control">
          <button
            className="quantity_button"
            onClick={() => decrementQuantity()}
          >
            <RemoveIcon className="quantity_icon" />
          </button>
          <div className="quantity_value">{quantityControl}</div>
          <button
            className="quantity_button"
            onClick={() => incrementQuantity()}
          >
            <AddIcon className="quantity_icon" />
          </button>
        </div>
      </section>

      <section className="product_action_section">
        <div
          className="delete_product"
          onClick={() => deleteItem({ productId: _id, size })}
        >
          <DeleteIcon className="delete_icon" />
        </div>
      </section>
    </div>
  );
}
