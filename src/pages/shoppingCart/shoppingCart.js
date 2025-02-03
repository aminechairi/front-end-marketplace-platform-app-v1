import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./shoppingCart.css";

import NavBar from "../../components/navBar/navBar";
import ProductsCardOfShoppingCart from "../../components/productsCardOfShoppingCart/productsCardOfShoppingCart";
import ProductsCardOfShoppingCartSkeletion from "../../components/productsCardOfShoppingCart/productsCardOfShoppingCartSkeletion";
import Footer from "../../components/footer/footer";

import useFetch from "../../hooks/useFetch";
import baseUrl from "../../config/config";
import cookieManager from "../../utils/cookieManager";
import limitOfProducts from "../../utils/limitOfProducts";
import { currency } from "../../constens/constens";

// Set product limits based on screen size
const productLimits = [3, 3, 3, 3, 3, 3];

const validationSchema = Yup.object().shape({
  couponCode: Yup.string()
    .min(3, "Coupon code must be at least 3 characters")
    .max(32, "Coupon code must be at most 32 characters")
    .required("Coupon code is required"),
});

const ShoppingCart = () => {
  const [products, setProducts] = useState({ data: [] });
  const { data: shoppingCart, fetchData: fetchShoppingCart } = useFetch();

  useEffect(() => {
    fetchShoppingCart({
      url: `${baseUrl}/shoppingcart`,
      method: "get",
      headers: {
        Authorization: `Bearer ${cookieManager("get", "JWTToken")}`,
      },
    });
  }, [fetchShoppingCart]);

  useEffect(() => {
    if (shoppingCart.status === "succeeded") {
      const getProductQuantity = (shoppingCartItem) => {
        if (shoppingCartItem.product.sizes.length > 0) {
          const productQuantity = shoppingCartItem.product.sizes.filter(
            (item) => item.size === shoppingCartItem.size
          );

          return productQuantity[0].quantity;
        } else {
          return shoppingCartItem.product.quantity;
        }
      };

      const productsList = shoppingCart.data?.data?.cartItems.map((item) => {
        return {
          _id: item.product._id,
          title: item.product.title,
          imageCover: item.product.imageCover,
          productQuantity: getProductQuantity(item),
          itemQuantity: item.quantity,
          size: item.size,
          color: item.color,
          price: item.product.price,
          totalPrice: item.totalPrice,
        };
      });

      setProducts({ data: productsList });
    }
  }, [shoppingCart.data?.data?.cartItems, shoppingCart.status]);

  const formik = useFormik({
    initialValues: {
      couponCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setProducts({ data: [] });

      fetchShoppingCart({
        url: `${baseUrl}/shoppingcart/applycoupon`,
        method: "put",
        data: {
          couponCode: values.couponCode,
        },
        headers: {
          Authorization: `Bearer ${cookieManager("get", "JWTToken")}`,
        },
      });
    },
  });

  const deleteItem = (data) => {
    setProducts({ data: [] });

    fetchShoppingCart({
      url: `${baseUrl}/shoppingcart`,
      method: "delete",
      data,
      headers: {
        Authorization: `Bearer ${cookieManager("get", "JWTToken")}`,
      },
    });
  };

  const updateItemQuantity = (data) => {
    setProducts({ data: [] });

    fetchShoppingCart({
      url: `${baseUrl}/shoppingcart`,
      method: "put",
      data,
      headers: {
        Authorization: `Bearer ${cookieManager("get", "JWTToken")}`,
      },
    });
  };

  return (
    <>
      <NavBar />
      {shoppingCart.status === "loading" ? (
        <div className="shopping_cart">
          <div className="container">
            <div className="cart_wrapper">
              <h1 className="cart_title">{"SHOPPING CART"}</h1>

              <div className="cart_details">
                <div className="cart_info">
                  <div className="checkout_summary">
                    <h1 className="summary_title">Order Summary</h1>

                    <div className="summary_details">
                      <div className="summary_row">
                        <div className="summary_property">Tax Price:</div>
                        <div className="summary_value_skeletion">
                          0.00 {currency}
                        </div>
                      </div>
                      <div className="summary_row">
                        <div className="summary_property">Shipping Price:</div>
                        <div className="summary_value_skeletion">
                          00.00 {currency}
                        </div>
                      </div>
                      <div className="summary_row">
                        <div className="summary_property">Total Price:</div>
                        <div className="summary_value_skeletion">
                          00.00 {currency}
                        </div>
                      </div>

                      <div className="line"></div>

                      <div className="summary_row">
                        <div className="summary_property">Coupon Name:</div>
                        <div className="summary_value_skeletion">
                          RAMADAN KAREEM
                        </div>
                      </div>
                      <div className="summary_row">
                        <div className="summary_property">Coupon Discount:</div>
                        <div className="summary_value_skeletion">30%</div>
                      </div>
                      <div className="summary_row">
                        <div className="summary_property">
                          Total Price After Discount::
                        </div>
                        <div className="summary_value_skeletion">
                          0000.00 {currency}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="product_cards">
                  {Array.from(new Array(limitOfProducts(productLimits))).map(
                    (_, i) => {
                      return (
                        <ProductsCardOfShoppingCartSkeletion key={i + 1} />
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : shoppingCart.status === "succeeded" && products.data?.length > 0 ? (
        <div className="shopping_cart">
          <div className="container">
            <div className="cart_wrapper">
              <h1 className="cart_title">SHOPPING CART</h1>

              <div className="cart_details">
                <div className="cart_info">
                  {/* Order Summary */}
                  <div className="checkout_summary">
                    <h1 className="summary_title">Order Summary</h1>

                    <div className="summary_details">
                      <div className="summary_row">
                        <div className="summary_property">Tax Price:</div>
                        <div className="summary_value">
                          {shoppingCart.data?.data.taxPrice
                            .toFixed(2)
                            .replace(".", ",")}{" "}
                          {currency}
                        </div>
                      </div>
                      <div className="summary_row">
                        <div className="summary_property">Shipping Price:</div>
                        <div className="summary_value">
                          {shoppingCart.data?.data.shippingPrice
                            .toFixed(2)
                            .replace(".", ",")}{" "}
                          {currency}
                        </div>
                      </div>
                      <div className="summary_row">
                        <div className="summary_property">Total Price:</div>
                        <div
                          className="summary_value"
                          style={
                            shoppingCart.data?.data.couponName
                              ? {
                                  textDecoration: "line-through",
                                  color: "var(--color-of-error)",
                                }
                              : null
                          }
                        >
                          {shoppingCart.data?.data.totalPrice
                            .toFixed(2)
                            .replace(".", ",")}{" "}
                          {currency}
                        </div>
                      </div>
                      {shoppingCart.data?.data.couponName ? (
                        <>
                          <div className="line"></div>

                          <div className="summary_row">
                            <div className="summary_property">Coupon Name:</div>
                            <div className="summary_value">
                              {shoppingCart.data?.data.couponName}
                            </div>
                          </div>
                          <div className="summary_row">
                            <div className="summary_property">
                              Coupon Discount:
                            </div>
                            <div className="summary_value">
                              {shoppingCart.data?.data.couponDiscount}%
                            </div>
                          </div>
                          <div className="summary_row">
                            <div className="summary_property">
                              Total Price After Discount:
                            </div>
                            <div className="summary_value">
                              {shoppingCart.data?.data.totalPriceAfterDiscount
                                .toFixed(2)
                                .replace(".", ",")}{" "}
                              {currency}
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>

                    <button className="checkout_button">Checkout</button>
                  </div>

                  {!shoppingCart.data?.data.couponName ? (
                    <form
                      className="coupon_form"
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="form_inputs">
                        <input
                          className="coupon_input"
                          type="text"
                          placeholder="Coupon code"
                          name="couponCode"
                          id="couponCode"
                          value={formik.values.couponCode}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            borderColor:
                              formik.touched.couponCode &&
                              formik.errors.couponCode
                                ? "var(--color-of-error)"
                                : null,
                          }}
                        />
                        {formik.touched.couponCode &&
                          formik.errors.couponCode && (
                            <p className="input_error">
                              {formik.errors.couponCode}
                            </p>
                          )}
                      </div>

                      <input
                        className="submit_button"
                        type="submit"
                        value="Apply"
                      />
                    </form>
                  ) : null}
                </div>

                <div className="product_cards">
                  {products.data.map((item, index) => (
                    <ProductsCardOfShoppingCart
                      key={index}
                      _id={item._id}
                      title={item.title}
                      imageCover={item.imageCover}
                      productQuantity={item.productQuantity}
                      itemQuantity={item.itemQuantity}
                      size={item.size}
                      color={item.color}
                      price={item.price}
                      totalPrice={item.totalPrice}
                      deleteItem={deleteItem}
                      updateItemQuantity={updateItemQuantity}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : shoppingCart.status === "succeeded" && products.data?.length === 0 ? (
        <div className="noFound">
          <div className="container">
            <div className="ab">
              <img
                src={require("../../imgs/empty-cart.png")}
                alt="Empty shopping cart"
              />
              <h1>Your Cart is Empty</h1>
              <p>
                Looks like you haven't added any items to your cart yet. Start
                shopping now and fill it with your favorite products!
              </p>
            </div>
          </div>
        </div>
      ) : null}
      <Footer />
    </>
  );
};

export default ShoppingCart;
