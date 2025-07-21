import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import API from "../../config/api";
import { HOME } from "../../routes";

import "./emailVerification.css";
import NavBar from "../../components/navBar/navBar";
import renderInput from "../../utils/renderInput";
import LinearProgress from "@mui/material/LinearProgress";
import Footer from "../../components/footer/footer";

function EmailVerification() {
  const [responseMessage, setResponseMessage] = useState(null);
  const [currentStep, setCurrentStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  // Fetch code when component mounts
  useEffect(() => {
    handleRequestCode();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      emailVerificationCode: "",
    },
    validationSchema: Yup.object().shape({
      emailVerificationCode: Yup.string()
        .required("Verification code is required.")
        .length(6, "Verification code must be exactly 6 digits."),
    }),
    onSubmit: handleVerifyCode,
  });

  // Request code from backend
  async function handleRequestCode() {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await API.get("/customer/verify-email");
      if (res.data.status === "Verified") {
        navigate(HOME);
      } else {
        setResponseMessage(res.data.message);
        setCurrentStep(true);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  }

  // Submit verification code
  async function handleVerifyCode(values) {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await API.post("/customer/verify-email", values);
      if (res.data.status === "Verified") {
        navigate(HOME);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <NavBar />
      <div className="forms email_verification">
        <div className="container">
          <div className="ab">
            {isLoading && (
              <div className="form_loading">
                <LinearProgress color="inherit" />
              </div>
            )}

            <h1 className="title">Email Verification</h1>

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

            {!currentStep  ? (
              <button
                className="submit"
                onClick={handleRequestCode}
                disabled={isLoading}
              >
                {isLoading ? "Sending Code..." : "Send Verification Code"}
              </button>
            ) : (
              <form className="form" onSubmit={formik.handleSubmit}>
                {renderInput(
                  formik,
                  "Verification Code",
                  "emailVerificationCode",
                  "text",
                  "Verification code"
                )}

                <input
                  className="submit"
                  type="submit"
                  value={isLoading ? "Verifying..." : "Verify Email"}
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

export default EmailVerification;
