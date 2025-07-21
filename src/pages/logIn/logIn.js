import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import API from "../../config/api";
import { setCookie } from "../../redux/slices/cookiesSlice";
import { HOME, FORGOT_PASSWORD } from "../../routes";

import "./logIn.css";
import NavBar from "../../components/navBar/navBar";
import renderInput from "../../utils/renderInput";
import Footer from "../../components/footer/footer";
import LinearProgress from "@mui/material/LinearProgress";

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required.")
    .email("Please enter a valid email."),
  password: Yup.string().required("Password is required."),
});

const LogIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const res = await API.post("/auth/login", values);
        dispatch(setCookie({ name: "JWTToken", value: res.data?.token, days: 90 }));
        navigate(HOME);
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Something went wrong. Please try again.";
        setErrorMessage(errorMsg);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <NavBar />
      <div className="forms log_in">
        <div className="container">
          <div className="ab">
            {isLoading && (
              <div className="form_loading">
                <LinearProgress color="inherit" />
              </div>
            )}

            <h1 className="title">Log In</h1>

            {errorMessage && !isLoading && (
              <div className="alert_error">
                <p>{errorMessage}</p>
              </div>
            )}

            <form className="form" onSubmit={formik.handleSubmit}>
              {renderInput(formik, "Email", "email", "email", "Email")}
              {renderInput(formik, "Password", "password", "password", "Password")}

              <input
                className="submit"
                type="submit"
                value={isLoading ? "Logging in..." : "Log In"}
                disabled={isLoading}
              />
            </form>

            <Link to={FORGOT_PASSWORD}>
              <button className="link">Forgot Password?</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LogIn;
