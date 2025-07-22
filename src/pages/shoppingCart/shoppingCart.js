import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { loadStripe } from "@stripe/stripe-js";

import CloseIcon from "@mui/icons-material/Close";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AddCardIcon from "@mui/icons-material/AddCard";
import LinearProgress from "@mui/material/LinearProgress";

import "./shoppingCart.css";
import NavBar from "../../components/navBar/navBar";
import renderInput from "../../utils/renderInput";
import SuccessConfetti from "../../components/successConfetti/successConfetti";
import ProductCardOfShoppingCart from "../../components/productCardOfShoppingCart/productCardOfShoppingCart";
import ShoppingCartSkeleton from "./shoppingCartSkeleton";
import Footer from "../../components/footer/footer";

import useFetch from "../../hooks/useFetch";
import { currency } from "../../constens/constens";
import { HOME, ADD_PHONE_NUMBER, ORDERS } from "../../routes";
import WentWrong from "../../components/wentWrong/wentWrong";

const checkoutValidationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("Select phone number."),
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

const getProductQuantity = (shoppingCartItem) => {
  if (shoppingCartItem.product.sizes.length > 0) {
    const size = shoppingCartItem.product.sizes.filter(
      (item) => item.size === shoppingCartItem.size
    );

    return size[0].quantity;
  } else {
    return shoppingCartItem.product.quantity;
  }
};

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);

const ShoppingCart = () => {
  const [products, setProducts] = useState({ data: [] });
  const { data: shoppingCart, fetchData: fetchShoppingCart } = useFetch();

  const [popupStyle, setPopupStyle] = useState({
    opacity: 0,
    visibility: "hidden",
    transform: "translateY(-10px)",
  });

  const { data: user, fetchData: fetchUser } = useFetch();
  const { data: createOrder, fetchData: fetchCreateOrder } = useFetch();

  const navigate = useNavigate();

  const phoneNumbers = user.data?.data?.phoneNumbers || [];
  const addresses = user.data?.data?.addressesList || [];

  // Get shopping cart
  useEffect(() => {
    fetchShoppingCart({
      url: `/customer/shopping-cart`,
      method: "get",
    });
  }, [fetchShoppingCart]);

  // Handle products list
  useEffect(() => {
    if (shoppingCart.status === "succeeded") {
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

  // Apply coupon
  const formik = useFormik({
    initialValues: {
      couponCode: "",
    },
    validationSchema: Yup.object().shape({
      couponCode: Yup.string()
        .required("Coupon code is required.")
        .min(3, "Coupon code must be at least 3 characters.")
        .max(32, "Coupon code must be at most 32 characters."),
    }),
    onSubmit: async (values) => {
      setProducts({ data: [] });

      fetchShoppingCart({
        url: `/customer/shopping-cart/apply-coupon`,
        method: "put",
        data: {
          couponCode: values.couponCode,
        },
      });
    },
  });

  // Success toast for apply coupon successfully
  useEffect(() => {
    if (`${shoppingCart.data?.message}`.startsWith("Price discount applied")) {
      toast.success(shoppingCart.data?.message);
    }
  }, [shoppingCart.data?.message]);

  // Remove item from shopping cart
  const removeItem = (data) => {
    setProducts({ data: [] });

    fetchShoppingCart({
      url: `/customer/shopping-cart`,
      method: "delete",
      data,
    });
  };

  // Update item in shopping cart
  const updateItemQuantity = (data) => {
    setProducts({ data: [] });

    fetchShoppingCart({
      url: `/customer/shopping-cart`,
      method: "put",
      data,
    });
  };

  // If the user hasn't added a phone number, redirect to the "Add Phone Number" page.
  // Otherwise, toggle the visibility of the popup to collect user information.
  const toggleMenu = () => {
    if (phoneNumbers.length === 0) {
      navigate(ADD_PHONE_NUMBER);
    } else {
      // Toggle popup visibility
      if (!popupStyle.opacity) {
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
    }
  };

  // Get customer details
  useEffect(() => {
    fetchUser({
      url: `/customer`,
      method: "get",
    });
  }, [fetchUser]);

  // Create order
  const formikCheckout = useFormik({
    initialValues: {
      paymentMethod: "credit_card",
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
          url: `/customer/orders/stripe-checkout-session`,
          method: "post",
          data: {
            phone: values.phoneNumber,
            country: values.country,
            state: values.state,
            city: values.city,
            street: values.street,
            postalCode: values.postalCode,
          },
        });
      } else if (values.paymentMethod === "cash_on_delivery") {
        fetchCreateOrder({
          url: `/customer/orders/cash-on-delivery`,
          method: "post",
          data: {
            phone: values.phoneNumber,
            country: values.country,
            state: values.state,
            city: values.city,
            street: values.street,
            postalCode: values.postalCode,
          },
        });
      }
    },
  });

  // Handle order creation response:
  // - If order is successful and initiated via Stripe, redirect to Stripe checkout.
  // - If order is successful but not Stripe-based, navigate to the orders page.
  // - If order creation fails, close the popup and refetch the shopping cart.
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
        navigate(ORDERS);
      }
    } else if (createOrder.status === "failed") {
      setPopupStyle({
        opacity: 0,
        visibility: "hidden",
        transform: "translateY(-10px)",
      });

      fetchShoppingCart({
        url: `/customer/shopping-cart`,
        method: "get",
      });
    }
  }, [
    createOrder.status,
    createOrder.data?.status,
    createOrder.data?.message,
    createOrder.data?.sessionID,
    fetchShoppingCart,
    navigate,
  ]);

  // loading
  if (
    shoppingCart.status === "loading" ||
    (createOrder.status === "succeeded" &&
      createOrder.data?.status === "Success")
  ) {
    return (
      <>
        <NavBar />
        <ShoppingCartSkeleton />
        <Footer />
      </>
    );
  }

  //  Unexpected error
  if (shoppingCart.status === "failed" || user.status === "failed") {
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
              url: `/customer/shopping-cart`,
              method: "get",
            });
          }}
        />
        <Footer />
      </>
    );
  }

  // If shopping cart empty
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

 // If shopping cart not empty
  if (shoppingCart.status === "succeeded" && products.data?.length > 0) {
    return (
      <>
        <NavBar />
        {/* Success confetti */}
        {`${shoppingCart.data?.message}`.startsWith(
          "Price discount applied"
        ) && <SuccessConfetti />}

        {/* Shopping cart */}
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

                  {!shoppingCart.data?.data.coupon && (
                    <form
                      className="coupon_form"
                      onSubmit={formik.handleSubmit}
                    >
                      {renderInput(
                        formik,
                        "Coupon code",
                        "couponCode",
                        "text",
                        "Coupon code"
                      )}

                      <input className="submit" type="submit" value="Apply" />
                    </form>
                  )}
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
                      removeItem={removeItem}
                      updateItemQuantity={updateItemQuantity}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popup */}
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
              onSubmit={(e) => {
                e.preventDefault();
                formikCheckout.handleSubmit();
                formikCheckout.setTouched({
                  phoneNumber: true,
                  country: true,
                  city: true,
                  state: true,
                  street: true,
                  postalCode: true,
                });
              }}
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
                <label className="label" htmlFor="phoneNumber">
                  Choose Phone Number
                </label>
                <select
                  className="input"
                  name="phoneNumber"
                  id="phoneNumber"
                  disabled={phoneNumbers.length === 0}
                  value={formikCheckout.values.phoneNumber}
                  onChange={formikCheckout.handleChange}
                  onBlur={formikCheckout.handleBlur}
                  style={{
                    borderColor:
                      formikCheckout.touched.phoneNumber &&
                      formikCheckout.errors.phoneNumber
                        ? "var(--color-of-error)"
                        : null,
                  }}
                >
                  <option value="">
                    {addresses.length === 0
                      ? "-- There are no phone numbers saved --"
                      : "-- Select phone number --"}{" "}
                  </option>
                  {phoneNumbers.map((item) => (
                    <option key={item._id} value={item.phoneNumber}>
                      {`${item.phoneNumber}`}
                    </option>
                  ))}
                </select>
                {formikCheckout.touched.phoneNumber &&
                  formikCheckout.errors.phoneNumber && (
                    <p className="error_of_input">
                      {formikCheckout.errors.phoneNumber}
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
                        ? "-- There are no addresses saved --"
                        : "-- Select address --"}{" "}
                    </option>
                    {addresses.map((addr) => (
                      <option key={addr._id} value={addr._id}>
                        {`${addr.street}, ${addr.city}, ${addr.country}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Country input */}
                {renderInput(
                  formikCheckout,
                  "Country",
                  "country",
                  "text",
                  "EX: United States"
                )}

                {/* City input */}
                {renderInput(formikCheckout, "City", "city", "text", "EX: CA")}

                {/* State input */}
                {renderInput(
                  formikCheckout,
                  "State",
                  "state",
                  "text",
                  "EX: Los Angeles"
                )}

                {/* Street input */}
                {renderInput(
                  formikCheckout,
                  "Street",
                  "street",
                  "text",
                  "EX: 1234 Sunset Blvd"
                )}

                {/* Postal Code input */}
                {renderInput(
                  formikCheckout,
                  "Postal Code",
                  "postalCode",
                  "text",
                  "EX: 90026"
                )}
              </div>

              <input
                className="submit"
                type="submit"
                value={
                  createOrder.status === "loading"
                    ? "checking out..."
                    : `Checkout (${shoppingCart.data?.numOfCartItems})`
                }
              />
            </form>
          </div>
        </div>
        <Footer />
      </>
    );
  }
};

export default ShoppingCart;
