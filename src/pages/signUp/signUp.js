import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import API from "../../config/api";
import { setCookie } from "../../redux/slices/cookiesSlice";
import { EMAIL_VERIFICATION } from "../../routes";

import "./signUp.css";
import NavBar from "../../components/navBar/navBar";
import renderInput from "../../utils/renderInput";
import Footer from "../../components/footer/footer";
import LinearProgress from "@mui/material/LinearProgress";

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
    .email("Please enter a valid email."),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password should be at least 8 characters."),
  confirmPassword: Yup.string()
    .required("Please confirm your password.")
    .oneOf([Yup.ref("password"), null], "Passwords must match."),
});

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const res = await API.post("/auth/signup", values);
        dispatch(setCookie({ name: "JWTToken", value: res.data?.token, days: 90 }));
        navigate(EMAIL_VERIFICATION);
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
      <div className="forms sign_up">
        <div className="container">
          <div className="ab">
            {isLoading && (
              <div className="form_loading">
                <LinearProgress color="inherit" />
              </div>
            )}

            <h1 className="title">Sign Up</h1>

            {errorMessage && !isLoading && (
              <div className="alert_error">
                <p>{errorMessage}</p>
              </div>
            )}

            <form className="form" onSubmit={formik.handleSubmit}>
              <div className="ab_first_name_and_last_name">
                {renderInput(formik, "First Name", "firstName", "text", "First name")}
                {renderInput(formik, "Last Name", "lastName", "text", "Last name")}
              </div>

              {renderInput(formik, "Email", "email", "email", "Email")}
              {renderInput(formik, "Password", "password", "password", "Password")}
              {renderInput(formik, "Confirm Password", "confirmPassword", "password", "confirm password")}

              <input
                className="submit"
                type="submit"
                value={isLoading ? "Signing up..." : "Sign Up"}
                disabled={isLoading}
              />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
