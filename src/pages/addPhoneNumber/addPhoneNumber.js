import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { app } from "../../config/firebaseConfig";

import "./addPhoneNumber.css";

import NavBar from "../../components/navBar/navBar";
import LinearProgress from "@mui/material/LinearProgress";
import PhoneInput from "react-phone-input-2";
import Footer from "../../components/footer/footer";

// Custom hooks and utilities
import baseUrl from "../../config/config";
import cookieManager from "../../utils/cookieManager";

// Helper function to map Firebase error codes to user-friendly messages
function getFirebaseErrorMessage(error) {
  const code = error?.code || "";
  const message = error?.message || "";

  const errorMap = {
    "auth/invalid-verification-code": "The code you entered is incorrect. Please try again.",
    "auth/missing-verification-code": "You must enter a verification code.",
    "auth/code-expired": "The code has expired. Please request a new one.",
    "auth/user-disabled": "This user account has been disabled. Please contact support.",
    "auth/invalid-phone-number": "The phone number is invalid or incorrectly formatted.",
    "auth/too-many-requests": "Too many attempts. Please wait and try again later.",
    "auth/network-request-failed": "Network error. Please check your internet connection.",
    "auth/session-expired": "Your session has expired. Please start again.",
    "auth/internal-error": "An internal error occurred. Please try again.",
    "auth/invalid-verification-id": "Invalid verification ID. Please restart the verification process.",
    "auth/quota-exceeded": "SMS quota exceeded. Try again later.",
    "auth/app-not-authorized": "App not authorized. Check Firebase configuration.",
    "auth/missing-phone-number": "Phone number is required.",
  };

  // If the code is recognized
  if (errorMap[code]) return errorMap[code];

  // Fallback for unknown messages (optional logic for developers or logs)
  console.warn("Unhandled Firebase Error:", code, message);

  // Default fallback message
  return "An unexpected error occurred. Please try again.";
}

const phoneNumberValidationSchema = Yup.object().shape({
  phoneNumber: Yup.string().required("Phone number is required."),
});

const verificationCodeValidationSchema = Yup.object().shape({
  verificationCode: Yup.string()
    .required("Verification Code is required.")
    .max(6, "Verification Code must be 6 digits.")
    .min(6, "Verification Code must be 6 digits.")
});

function AddPhoneNumber() {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState(null);
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [idToken, setIdToken] = useState(null);
  const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(false);

  const auth = getAuth(app);
  const navigate = useNavigate();

  // Initialize reCAPTCHA verifier on component mount
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" }
    );
  }, [auth]);

  const formikPhoneNumber = useFormik({
    initialValues: { phoneNumber: "" },
    validationSchema: phoneNumberValidationSchema,
    onSubmit: async ({ phoneNumber }) => {
      setError(null);
      setIsLoading(true);

      const fullPhoneNumber = `+${phoneNumber}`;
      const token = cookieManager("get", "JWTToken");

      try {
        // Step 1: Fetch existing phone numbers
        const { data } = await axios.get(`${baseUrl}/customer/phone-numbers`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const existingNumbers = data?.data || [];

        // Step 2: Check if phone number already exists
        const alreadyExists = existingNumbers.some(
          (item) => item.phone_number === fullPhoneNumber
        );

        if (alreadyExists) {
          setError("This phone number already exists in your account.");
          return;
        }

        // Step 3: Send verification code via Firebase
        const appVerifier = window.recaptchaVerifier;

        const confirmation = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);
        setConfirmationResult(confirmation);
      } catch (err) {
        const isFirebaseError = err?.code?.startsWith("auth/");
        setError(
          isFirebaseError
            ? getFirebaseErrorMessage(err)
            : "An error occurred while adding the phone number. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  });

  const formikVerificationCode = useFormik({
    initialValues: { verificationCode: "" },
    validationSchema: verificationCodeValidationSchema,
    onSubmit: async ({ verificationCode }) => {
      setError(null);
      setIsLoading(true);

      try {
        // Step 1: Confirm code if not already confirmed
        let finalToken = idToken;

        if (!isCodeConfirmed) {
          const result = await confirmationResult.confirm(verificationCode);
          finalToken = await result.user.getIdToken();
          setIsCodeConfirmed(true);
          setIdToken(finalToken);
        }

        // Step 2: Submit the verified phone number to your backend
        await axios.post(
          `${baseUrl}/customer/phone-numbers`,
          { idToken: finalToken },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookieManager("get", "JWTToken")}`,
            },
          }
        );

        setIsPhoneNumberVerified(true);
      } catch (err) {
        const isFirebaseError = err?.code?.startsWith("auth/");
        setError(
          isFirebaseError
            ? getFirebaseErrorMessage(err)
            : "An error occurred while adding the phone number. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  });

  if (isPhoneNumberVerified) {
    return (
      <>
        <NavBar />
        <div className="forms add_phone_number">
          <div className="container">
            <div className="ab">
              <h1 className="title">Phone Number Verified</h1>
              <div className="alert_success">
                <p>Phone number verified successfully</p>
              </div>
              <button className="submit" onClick={() => navigate(-1)}>
                Go Back
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="forms add_phone_number">
        <div className="container">
          <div className="ab">
            {/* reCAPTCHA container (invisible) */}
            <div id="recaptcha-container"></div>

            {/* Conditional rendering based on verification state */}
            {!confirmationResult ? (
              <h1 className="title">Add Phone Number</h1>
            ) : (
              <h1 className="title">Verify Phone Number</h1>
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div className="form_loading">
                <LinearProgress color="inherit" />
              </div>
            )}

            {/* Error display */}
            {error && (
              <div className="alert_error">
                <p>{error}</p>
              </div>
            )}

            {/* Success message after sending verification code */}
            {confirmationResult && !error && !isLoading && (
              <div className="alert_success">
                <p>Verification code sent to your phone number. Please enter the code below to verify.</p>
              </div>
            )}

            {/* Phone number form */}
            {!confirmationResult ? (
              <form className="form" onSubmit={formikPhoneNumber.handleSubmit}>
                <div className="ab_inputs">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <PhoneInput
                    country={"ma"}
                    onChange={(value) => formikPhoneNumber.setFieldValue("phoneNumber", value)}
                    onBlur={() => formikPhoneNumber.setFieldTouched("phoneNumber", true)}
                    inputProps={{
                      name: "phoneNumber",
                      id: "phoneNumber",
                      className: "input input_phone",
                      value: `+${formikPhoneNumber.values.phoneNumber || "212"}`,
                    }}
                  />
                  {formikPhoneNumber.touched.phoneNumber && formikPhoneNumber.errors.phoneNumber && (
                    <p className="error_of_input">{formikPhoneNumber.errors.phoneNumber}</p>
                  )}
                </div>
                <input className="submit" type="submit" value="Send Verification Code" />
              </form>
            ) : (
              /* Verification code form */
              <form className="form" onSubmit={formikVerificationCode.handleSubmit}>
                <div className="ab_inputs">
                  <label htmlFor="verificationCode">Verification Code</label>
                  <input
                    className="input"
                    type="number"
                    placeholder="123456"
                    name="verificationCode"
                    id="verificationCode"
                    value={formikVerificationCode.values.verificationCode}
                    onChange={formikVerificationCode.handleChange}
                    onBlur={formikVerificationCode.handleBlur}
                    style={{
                      borderColor:
                        formikVerificationCode.touched.verificationCode &&
                        formikVerificationCode.errors.verificationCode
                          ? "var(--color-of-error)"
                          : null,
                    }}
                  />
                  {formikVerificationCode.touched.verificationCode &&
                    formikVerificationCode.errors.verificationCode && (
                      <p className="error_of_input">
                        {formikVerificationCode.errors.verificationCode}
                      </p>
                    )}
                </div>
                <input className="submit" type="submit" value="Verify Phone Number" />
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddPhoneNumber;
