import "./productsCardOfShoppingCartSkeletion.css";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { currency } from "../../constens/constens";

export default function ProductsCardOfShoppingCartSkeletion() {
  return (
    <div className="shopping_cart_card_skeletion">
      <section className="product_image_section">
        <div className="product_image_wrapper"></div>
      </section>

      <section className="product_details_section">
        <h1 className="product_title">{"Men's Casual"}</h1>

        <p className="product_info">
          {"Quantity: 1 / Total price: 179 / Size: XL / Color: black"}
        </p>

        <p className="product_price">
          {"000.00"} {currency}
        </p>

        <div className="quantity_control">
          <button className="quantity_button">
            <RemoveIcon className="quantity_icon" />
          </button>
          <div className="quantity_value">{"0"}</div>
          <button className="quantity_button">
            <AddIcon className="quantity_icon" />
          </button>
        </div>
      </section>
    </div>
  );
}
