import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import "./shoppingCart.css";
import "react-phone-input-2/lib/style.css";

import CloseIcon from "@mui/icons-material/Close";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AddCardIcon from "@mui/icons-material/AddCard";
import PhoneInput from "react-phone-input-2";
import LinearProgress from "@mui/material/LinearProgress";

import NavBar from "../../components/navBar/navBar";
import ProductCardOfShoppingCart from "../../components/productCardOfShoppingCart/productCardOfShoppingCart";
import ShoppingCartSkeleton from "./shoppingCartSkeleton";
import Footer from "../../components/footer/footer";

import useFetch from "../../hooks/useFetch";
import baseUrl from "../../config/config";
import cookieManager from "../../utils/cookieManager";
import { currency } from "../../constens/constens";
import { HOME } from "../../routes";
import WentWrong from "../../components/wentWrong/wentWrong";

const couponCodeValidationSchema = Yup.object().shape({
  couponCode: Yup.string()
    .min(3, "Coupon code must be at least 3 characters.")
    .max(32, "Coupon code must be at most 32 characters.")
    .required("Coupon code is required."),
});

const checkoutValidationSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Phone number is required.")
    .matches(/^\+?\d{8,15}$/, "Phone number must be between 8 and 15 digits."),
  country: Yup.string()
    .required("Country is required.")
    .min(2, "Country name must be at least 2 characters.")
    .max(50, "Country name cannot exceed 50 characters."),
  state: Yup.string()
    .required("State is required.")
    .min(2, "State name must be at least 2 characters.")
    .max(50, "State name cannot exceed 50 characters."),
  city: Yup.string()
    .required("City is required.")
    .min(2, "City name must be at least 2 characters.")
    .max(50, "City name cannot exceed 50 characters."),
  street: Yup.string()
    .required("Street address is required.")
    .min(5, "Street address must be at least 5 characters.")
    .max(100, "Street address cannot exceed 100 characters."),
  postalCode: Yup.string()
    .required("Postal code is required.")
    .matches(/^\d{4,10}$/, "Postal code must be between 4 and 10 digits."),
});

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);

const ShoppingCart = () => {
  const [products, setProducts] = useState({ data: [] });
  const { data: shoppingCart, fetchData: fetchShoppingCart } = useFetch();

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupStyle, setPopupStyle] = useState({
    opacity: 0,
    visibility: "hidden",
    transform: "translateY(-10px)",
  });

  const { data: user, fetchData: fetchUser } = useFetch();
  const { data: createOrder, fetchData: fetchCreateOrder } = useFetch();

  const navigate = useNavigate();

  useEffect(() => {
    fetchShoppingCart({
      url: `${baseUrl}/customer/shopping-cart`,
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
          price: item.price,
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
    validationSchema: couponCodeValidationSchema,
    onSubmit: async (values) => {
      setProducts({ data: [] });

      fetchShoppingCart({
        url: `${baseUrl}/customer/shopping-cart/apply-coupon`,
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
      url: `${baseUrl}/customer/shopping-cart`,
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
      url: `${baseUrl}/customer/shopping-cart`,
      method: "put",
      data,
      headers: {
        Authorization: `Bearer ${cookieManager("get", "JWTToken")}`,
      },
    });
  };

  useEffect(() => {
    if (popupVisible) {
      setPopupStyle({
        opacity: 1,
        visibility: "visible",
        transform: "translateY(0)",
      });
    } else {
      setPopupStyle({
        opacity: 0,
        visibility: "hidden",
        transform: "translateY(-10px)",
      });
    }
  }, [popupVisible]);

  const toggleMenu = () => {
    setPopupVisible(!popupVisible);
  };

  useEffect(() => {
    fetchUser({
      url: `${baseUrl}/customer`,
      method: "get",
      headers: {
        Authorization: `Bearer ${cookieManager("get", "JWTToken")}`,
      },
    });
  }, [fetchUser]);

  const addresses = user.data?.data?.addressesList || [];

  const formikCheckout = useFormik({
    initialValues: {
      paymentMethod: "credit_card",
      phone: "",
      country: "",
      state: "",
      city: "",
      street: "",
      postalCode: "",
    },
    validationSchema: checkoutValidationSchema,
    onSubmit: async (values) => {
      if (values.paymentMethod === "credit_card") {
        fetchCreateOrder({
          url: `${baseUrl}/customer/orders/stripe-checkout-session`,
          method: "post",
          data: {
            phone: values.phone,
            country: values.country,
            state: values.state,
            city: values.city,
            street: values.street,
            postalCode: values.postalCode,
          },
          headers: {
            Authorization: `Bearer ${cookieManager("get", "JWTToken")}`,
          },
        });
      } else if (values.paymentMethod === "cash_on_delivery") {
        fetchCreateOrder({
          url: `${baseUrl}/customer/orders/cash-on-delivery`,
          method: "post",
          data: {
            phone: values.phone,
            country: values.country,
            state: values.state,
            city: values.city,
            street: values.street,
            postalCode: values.postalCode,
          },
          headers: {
            Authorization: `Bearer ${cookieManager("get", "JWTToken")}`,
          },
        });
      }
    },
  });

  useEffect(() => {
    if (
      createOrder.status === "succeeded" &&
      createOrder.data?.status === "Success"
    ) {
      if (`${createOrder.data?.message}`.startsWith("Stripe")) {
        (async function () {
          const stripe = await stripePromise;

          // Redirect to Stripe
          await stripe.redirectToCheckout({
            sessionId: createOrder.data?.sessionID,
          });
        })();
      } else {
        navigate("/orders");
      }
    } else if (
      createOrder.data?.status === "fail" ||
      createOrder.data?.status === "error"
    ) {
      setPopupVisible(false);

      fetchShoppingCart({
        url: `${baseUrl}/customer/shopping-cart`,
        method: "get",
        headers: {
          Authorization: `Bearer ${cookieManager("get", "JWTToken")}`,
        },
      });
    }
  }, [
    createOrder.status,
    createOrder.data?.status,
    createOrder.data?.message,
    createOrder.data?.sessionID,
    fetchShoppingCart,
    navigate
  ]);

  if (shoppingCart.status === "loading") {
    return (
      <>
        <NavBar />
        <ShoppingCartSkeleton />
        <Footer />
      </>
    );
  }

  if (shoppingCart.status === "succeeded" && products.data?.length === 0) {
    return (
      <>
        <NavBar />
        <WentWrong
          srcImage={require("../../imgs/empty-cart.png")}
          title="Your shopping cart is empty."
          paragraph="Looks like you haven't added any items to your cart yet.\nStart shopping now and fill it with your favorite products!"
          buttonContent="BACK TO HOME PAGE"
          to={HOME}
        />
        <Footer />
      </>
    );
  }

  if (shoppingCart.status === "succeeded" && products.data?.length > 0) {
    return (
      <>
        <NavBar />
        <div className="shopping_cart">
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
                        <div className="summary_value">
                          {shoppingCart.data?.data.pricing.taxPrice
                            .toFixed(2)
                            .replace(".", ",")}{" "}
                          {currency}
                        </div>
                      </div>
                      <div className="summary_row">
                        <div className="summary_property">Shipping Price:</div>
                        <div className="summary_value">
                          {shoppingCart.data?.data.pricing.shippingPrice
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
                            shoppingCart.data?.data.coupon
                              ? {
                                  textDecoration: "line-through",
                                  color: "var(--color-of-error)",
                                }
                              : null
                          }
                        >
                          {shoppingCart.data?.data.pricing.totalPrice
                            .toFixed(2)
                            .replace(".", ",")}{" "}
                          {currency}
                        </div>
                      </div>
                      {shoppingCart.data?.data.coupon ? (
                        <div className="summary_row">
                          <div className="summary_property">
                            Total Price After Discount:
                          </div>
                          <div className="summary_value">
                            {shoppingCart.data?.data.pricing.totalPriceAfterDiscount
                              .toFixed(2)
                              .replace(".", ",")}{" "}
                            {currency}
                          </div>
                        </div>
                      ) : null}
                      {shoppingCart.data?.data.coupon ? (
                        <>
                          <div className="line"></div>
                          <div className="summary_row">
                            <div className="summary_property">Coupon Code:</div>
                            <div className="summary_value">
                              {shoppingCart.data?.data.coupon.couponCode}
                            </div>
                          </div>
                          <div className="summary_row">
                            <div className="summary_property">
                              Coupon Discount:
                            </div>
                            <div className="summary_value">
                              {shoppingCart.data?.data.coupon.couponDiscount}%
                            </div>
                          </div>
                          <div className="summary_row">
                            <div className="summary_property">
                              Discounted Amount:
                            </div>
                            <div className="summary_value">
                              {shoppingCart.data?.data.coupon.discountedAmount
                                .toFixed(2)
                                .replace(".", ",")}{" "}
                              {currency}
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>

                    <button className="submit" onClick={toggleMenu}>
                      Checkout {`(${shoppingCart.data?.numOfCartItems})`}
                    </button>
                  </div>

                  {!shoppingCart.data?.data.coupon ? (
                    <form
                      className="coupon_form"
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="ab_inputs">
                        <input
                          className="input"
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
                            <p className="error_of_input">
                              {formik.errors.couponCode}
                            </p>
                          )}
                      </div>

                      <input className="submit" type="submit" value="Apply" />
                    </form>
                  ) : null}
                </div>

                <div className="product_cards">
                  {products.data.map((item, index) => (
                    <ProductCardOfShoppingCart
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
        <div className="ab_popup" style={popupStyle} onClick={toggleMenu}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup_header">
              <h1 className="title">
                CHECKOUT {`(${shoppingCart.data?.numOfCartItems})`}
              </h1>
              <CloseIcon className="icon" onClick={toggleMenu} />
            </div>
            <form
              className="checkout_form"
              onSubmit={formikCheckout.handleSubmit}
            >
              {createOrder.status === "loading" ? (
                <div className="form_loading">
                  <LinearProgress color="inherit" />
                </div>
              ) : null}

              <div className="payment_methods">
                <label
                  className={`check_payment ${
                    formikCheckout.values.paymentMethod === "credit_card"
                      ? "active"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    onChange={formikCheckout.handleChange}
                    hidden
                  />
                  <CreditCardIcon className="icon" />
                  <span>Credit Card</span>
                </label>

                <label
                  className={`check_payment ${
                    formikCheckout.values.paymentMethod === "cash_on_delivery"
                      ? "active"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    onChange={formikCheckout.handleChange}
                    hidden
                  />
                  <AddCardIcon className="icon" />
                  <span>Cash On Delivery</span>
                </label>
              </div>

              {/* Phone number input */}
              <div className="ab_inputs">
                <label className="label" htmlFor="phone">
                  Phone Number
                </label>
                <PhoneInput
                  country={"ma"}
                  onChange={(value) =>
                    formikCheckout.setFieldValue("phone", value)
                  }
                  onBlur={() => formikCheckout.setFieldTouched("phone", true)}
                  inputProps={{
                    name: "phone",
                    id: "phone",
                    className: "input input_phone",
                    value: `+${formikCheckout.values.phone || "212"}`,
                  }}
                />
                {formikCheckout.touched.phone &&
                  formikCheckout.errors.phone && (
                    <p className="error_of_input">
                      {formikCheckout.errors.phone}
                    </p>
                  )}
              </div>

              <div className="grid">
                {/* Saved address input */}
                <div className="ab_inputs">
                  <label className="label">Choose Saved Address</label>
                  <select
                    disabled={addresses.length === 0}
                    className="input"
                    onChange={(e) => {
                      const id = e.target.value;

                      if (id === "") {
                        formikCheckout.setValues({
                          ...formikCheckout.values,
                          country: "",
                          city: "",
                          state: "",
                          street: "",
                          postalCode: "",
                        });
                      } else {
                        const selected = addresses.find(
                          (addr) => addr._id === id
                        );

                        formikCheckout.setValues({
                          ...formikCheckout.values,
                          country: selected.country,
                          city: selected.city,
                          state: selected.state,
                          street: selected.street,
                          postalCode: selected.postalCode,
                        });
                      }
                    }}
                  >
                    <option value="">
                      {addresses.length === 0
                        ? "-- There no addresses saved --"
                        : "-- Select an address --"}{" "}
                    </option>
                    {addresses.map((addr) => (
                      <option key={addr._id} value={addr._id}>
                        {`${addr.street}, ${addr.city}, ${addr.country}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Country input */}
                <div className="ab_inputs">
                  <label className="label" htmlFor="country">
                    Country
                  </label>
                  <input
                    className="input"
                    type="text"
                    placeholder="EX: United States"
                    name="country"
                    id="country"
                    value={formikCheckout.values.country}
                    onChange={formikCheckout.handleChange}
                    onBlur={formikCheckout.handleBlur}
                    style={{
                      borderColor:
                        formikCheckout.touched.country &&
                        formikCheckout.errors.country
                          ? "var(--color-of-error)"
                          : null,
                    }}
                  />
                  {formikCheckout.touched.country &&
                    formikCheckout.errors.country && (
                      <p className="error_of_input">
                        {formikCheckout.errors.country}
                      </p>
                    )}
                </div>

                {/* City input */}
                <div className="ab_inputs">
                  <label className="label" htmlFor="city">
                    City
                  </label>
                  <input
                    className="input"
                    type="text"
                    placeholder="EX: CA"
                    name="city"
                    id="city"
                    value={formikCheckout.values.city}
                    onChange={formikCheckout.handleChange}
                    onBlur={formikCheckout.handleBlur}
                    style={{
                      borderColor:
                        formikCheckout.touched.city &&
                        formikCheckout.errors.city
                          ? "var(--color-of-error)"
                          : null,
                    }}
                  />
                  {formikCheckout.touched.city &&
                    formikCheckout.errors.city && (
                      <p className="error_of_input">
                        {formikCheckout.errors.city}
                      </p>
                    )}
                </div>

                {/* state input */}
                <div className="ab_inputs">
                  <label className="label" htmlFor="state">
                    State
                  </label>
                  <input
                    className="input"
                    type="text"
                    placeholder="EX: Los Angeles"
                    name="state"
                    id="state"
                    value={formikCheckout.values.state}
                    onChange={formikCheckout.handleChange}
                    onBlur={formikCheckout.handleBlur}
                    style={{
                      borderColor:
                        formikCheckout.touched.state &&
                        formikCheckout.errors.state
                          ? "var(--color-of-error)"
                          : null,
                    }}
                  />
                  {formikCheckout.touched.state &&
                    formikCheckout.errors.state && (
                      <p className="error_of_input">
                        {formikCheckout.errors.state}
                      </p>
                    )}
                </div>

                {/* street input */}
                <div className="ab_inputs">
                  <label className="label" htmlFor="street">
                    Street
                  </label>
                  <input
                    className="input"
                    type="text"
                    placeholder="EX: 1234 Sunset Blvd"
                    name="street"
                    id="street"
                    value={formikCheckout.values.street}
                    onChange={formikCheckout.handleChange}
                    onBlur={formikCheckout.handleBlur}
                    style={{
                      borderColor:
                        formikCheckout.touched.street &&
                        formikCheckout.errors.street
                          ? "var(--color-of-error)"
                          : null,
                    }}
                  />
                  {formikCheckout.touched.street &&
                    formikCheckout.errors.street && (
                      <p className="error_of_input">
                        {formikCheckout.errors.street}
                      </p>
                    )}
                </div>

                {/* Postal code input */}
                <div className="ab_inputs">
                  <label className="label" htmlFor="postal-code">
                    Postal Code
                  </label>
                  <input
                    className="input"
                    type="text"
                    placeholder="EX: 90026"
                    name="postalCode"
                    id="postal-code"
                    value={formikCheckout.values.postalCode}
                    onChange={formikCheckout.handleChange}
                    onBlur={formikCheckout.handleBlur}
                    style={{
                      borderColor:
                        formikCheckout.touched.postalCode &&
                        formikCheckout.errors.postalCode
                          ? "var(--color-of-error)"
                          : null,
                    }}
                  />
                  {formikCheckout.touched.postalCode &&
                    formikCheckout.errors.postalCode && (
                      <p className="error_of_input">
                        {formikCheckout.errors.postalCode}
                      </p>
                    )}
                </div>
              </div>

              <input
                className="submit"
                type="submit"
                value={`Checkout (${shoppingCart.data?.numOfCartItems})`}
              />
            </form>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (shoppingCart.status === "failed") {
    return (
      <>
        <NavBar />
        <WentWrong
          srcImage={require("../../imgs/went wrong.png")}
          title="Something Went Wrong."
          paragraph="We couldn't retrieve your shopping cart.\nPlease try again later."
          buttonContent="TRY AGAIN"
          onClick={() => {
            fetchShoppingCart({
              url: `${baseUrl}/customer/shopping-cart`,
              method: "get",
              headers: {
                Authorization: `Bearer ${cookieManager("get", "JWTToken")}`,
              },
            });
          }}
        />
        <Footer />
      </>
    );
  }
};

export default ShoppingCart;
