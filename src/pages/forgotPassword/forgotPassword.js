import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import API from "../../config/api";
import { setCookie } from "../../redux/slices/cookiesSlice";
import { HOME } from "../../routes";

import "./forgotPassword.css";
import NavBar from "../../components/navBar/navBar";
import renderInput from "../../utils/renderInput";
import LinearProgress from "@mui/material/LinearProgress";
import Footer from "../../components/footer/footer";

function ForgotPassword() {
  const [responseMessage, setResponseMessage] = useState(null);
  const [currentStep, setCurrentStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkEmailformik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required.")
        .email("Please provide a valid email address."),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const res = await API.post("/auth/forgotPassword", values);
        setResponseMessage(res.data.message);
        setCurrentStep(true);
      } catch (err) {
        const msg = err.response?.data?.message || "Something went wrong, please try again.";
        setErrorMessage(msg);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const resetCodeformik = useFormik({
    initialValues: {
      passwordResetCode: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      passwordResetCode: Yup.string()
        .required("Password reset code is required.")
        .length(6, "Password reset code must be exactly 6 digits."),
      newPassword: Yup.string()
        .required("New password is required.")
        .min(8, "New password must be at least 8 characters."),
      confirmNewPassword: Yup.string()
        .required("Confirm password is required.")
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match."),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const res = await API.put("/auth/passwordResetCode", values);
        dispatch(setCookie({ name: "JWTToken", value: res.data?.token, days: 90 }));
        navigate(HOME);
      } catch (err) {
        const msg = err.response?.data?.message || "Something went wrong, please try again.";
        setErrorMessage(msg);
      } finally {
        setIsLoading(false);
      }
    },
  }); 

  return (
    <>
      <NavBar />
      <div className="forms forgot_password">
        <div className="container">
          <div className="ab">
            {isLoading && (
              <div className="form_loading">
                <LinearProgress color="inherit" />
              </div>
            )}

            <h1 className="title">Forgot Password</h1>

            {errorMessage && !isLoading && (
              <div className="alert_error">
                <p>{errorMessage}</p>
              </div>
            )}

            {responseMessage && !isLoading && !errorMessage && (
              <div className="alert_success">
                <p>{responseMessage}</p>
              </div>
            )}

            {!currentStep ? (
              <form className="form" onSubmit={checkEmailformik.handleSubmit}>
                {renderInput(
                  checkEmailformik,
                  "Email",
                  "email",
                  "email",
                  "Please enter your email address"
                )}

                <input
                  className="submit"
                  type="submit"
                  value={isLoading ? "Sending Code..." : "Send Password Reset Code"}
                  disabled={isLoading}
                />
              </form>
            ) : (
              <form className="form" onSubmit={resetCodeformik.handleSubmit}>
                {renderInput(
                  resetCodeformik,
                  "Password Reset Code",
                  "passwordResetCode",
                  "text",
                  "Password reset code"
                )}

                {resetCodeformik.values.passwordResetCode.length === 6 && (
                  <>
                    {renderInput(
                      resetCodeformik,
                      "New Password",
                      "newPassword",
                      "password",
                      "New password"
                    )}
                    {renderInput(
                      resetCodeformik,
                      "Confirm New Password",
                      "confirmNewPassword",
                      "password",
                      "Confirm new password"
                    )}
                  </>
                )}

                <input
                  className="submit"
                  type="submit"
                  value={isLoading ? "Changing..." : "Change Password"}
                  disabled={isLoading}
                />
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ForgotPassword;
