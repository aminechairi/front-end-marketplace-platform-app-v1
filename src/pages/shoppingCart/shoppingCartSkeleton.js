import "./shoppingCartSkeleton.css";

import ProductCardSkeletionOfShoppingCart from "../../components/productCardOfShoppingCart/productCardSkeletionOfShoppingCart";
import { currency } from "../../constens/constens";

const ShoppingCartSkeleton = () => {
  return (
    <div className="shopping_cart_skeleton">
      <div className="container">
        <div className="cart_wrapper">
          <h1 className="cart_title">SHOPPING CART</h1>

          <div className="cart_details">
            <div className="cart_info">
              {/* Order Summary */}
              <div className="checkout_summary">
                <h1 className="summary_title">ORDER SUMMARY</h1>

                <div className="summary_details">
                  <div className="summary_row">
                    <div className="summary_property">Tax Price:</div>
                    <div className="summary_value">00.0 {currency}</div>
                  </div>
                  <div className="summary_row">
                    <div className="summary_property">Shipping Price:</div>
                    <div className="summary_value">00.0 {currency}</div>
                  </div>
                  <div className="summary_row">
                    <div className="summary_property">Total Price:</div>
                    <div className="summary_value">000.0 {currency}</div>
                  </div>
                  <div className="summary_row">
                    <div className="summary_property">
                      Total Price After Discount:
                    </div>
                    <div className="summary_value">000.0 {currency}</div>
                  </div>

                  <div className="line"></div>
                  <div className="summary_row">
                    <div className="summary_property">Coupon Code:</div>
                    <div className="summary_value">loading...</div>
                  </div>
                  <div className="summary_row">
                    <div className="summary_property">Coupon Discount:</div>
                    <div className="summary_value">50%</div>
                  </div>
                  <div className="summary_row">
                    <div className="summary_property">Discounted Amount:</div>
                    <div className="summary_value">000.0 {currency}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="product_cards">
              {/* Product Cards */}
              <ProductCardSkeletionOfShoppingCart />
              <ProductCardSkeletionOfShoppingCart />
              <ProductCardSkeletionOfShoppingCart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartSkeleton;
