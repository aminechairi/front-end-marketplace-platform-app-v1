import "./productsCardSkeletion.css";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

export default function ProductsCardSkeletion () {
  return (
    <div className="products_card_skeletion">
      <section className="sec_1">
        <div className="ab_img">

        </div>
      </section>
      <section className="sec_2">
        <h1 className="product_title">
          Men's Stainless Steel Analog Watch MTP-VD01D-1EVUDF Men's Stainless
          Steel Analog Watch M1D-1EVUDF Watch MTP-VD01D-1EVUDF Men's Steel Antch
          MTP-VD01D-1EVUDF
        </h1>
        <div className="price">
          <p className="currency">usd</p>
          <p className="number">49.00</p>
        </div>
        <div className="ab_discount">
          <p className="price">49.00</p>
          <p className="discount">-29%</p>
        </div>
        <div className="sold_and_quantity">
          <div className="sold">
            <div className="ab_icon">
              <ShoppingCartCheckoutIcon className="icon" />
            </div>
            <p className="number">100+ sold recently</p>
          </div>
        </div>
      </section>
    </div>
  );
};
