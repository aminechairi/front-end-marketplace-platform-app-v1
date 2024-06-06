import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import "./signUp.css";
import "react-phone-input-2/lib/style.css";

import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import LinearProgress from "@mui/material/LinearProgress";
import PhoneInput from "react-phone-input-2";

import { authSignUp } from "../../redux/authSlice";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required.")
    .min(3, "First name should be at least 3 characters.")
    .max(16, "First name should be at most 16 characters."),

  lastName: Yup.string()
    .required("Last name is required.")
    .min(2, "Last name should be at least 2 characters.")
    .max(16, "Last name should be at most 16 characters."),

  email: Yup.string()
    .required("Email is required.")
    .email("Please provide a valid email address."),

  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password should be at least 8 characters long."),

  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm password does not match password."
    ),
});

function SignUp() {
  const [oneSubmit, setOneSubmit] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const signUp = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (phoneNumber.length > 0) {
        values.phoneNumber = "+" + phoneNumber;
      };
      dispatch(authSignUp(values));
      resetForm({
        values: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
      });
      setPhoneNumber("212");
      setOneSubmit(true);
    },
  });

  useEffect(() => {
    if (signUp.data?.token) {
      window.location.replace("/email-verify");
    }
  }, [signUp.data?.token]);

  return (
    <>
      <NavBar />
      <div className="sign_up">
        <div className="container">
          <div className="ab">
            <div
              className="loading"
              style={{
                display: signUp.status === "loading" ? "block" : "none",
              }}
            >
              <LinearProgress color="inherit" />
            </div>

            <h1 className="title">sign up</h1>

            {signUp.data?.message &&
            signUp.data?.status &&
            signUp.status === "succeeded" &&
            oneSubmit === true ? (
              <div className="alert">
                <p className="error">{signUp.data?.message}</p>
              </div>
            ) : null}

            <form className="form" onSubmit={formik.handleSubmit}>
              <div className="ab_first_name_and_last_name">
                {/* First name input */}
                <div>
                  <label className="label" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    className="input"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    id="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{
                      borderColor:
                        formik.touched.firstName && formik.errors.firstName
                          ? "red"
                          : null,
                    }}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <p className="error">{formik.errors.firstName}</p>
                  ) : null}
                </div>

                {/* Last name input */}
                <div>
                  <label className="label" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    id="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{
                      borderColor:
                        formik.touched.lastName && formik.errors.lastName
                          ? "red"
                          : null,
                    }}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <p className="error">{formik.errors.lastName}</p>
                  ) : null}
                </div>
              </div>

              {/* Email input */}
              <div className="ab_inputs">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    borderColor:
                      formik.touched.email && formik.errors.email
                        ? "red"
                        : null,
                  }}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="error">{formik.errors.email}</p>
                ) : null}
              </div>

              {/* Phone number input */}
              <div className="ab_inputs">
                <label className="label" htmlFor="phone-number">
                  Phone Number (optionals)
                </label>
                <PhoneInput
                  country={"ma"}
                  placeholder="phone number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>

              {/* Password input */}
              <div className="ab_inputs">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    borderColor:
                      formik.touched.password && formik.errors.password
                        ? "red"
                        : null,
                  }}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="error">{formik.errors.password}</p>
                ) : null}
              </div>

              {/* Confirm password input */}
              <div className="ab_inputs">
                <label className="label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  className="input"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    borderColor:
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "red"
                        : null,
                  }}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <p className="error">{formik.errors.confirmPassword}</p>
                ) : null}
              </div>

              <input className="submit" type="submit" defaultValue="Submit" />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
