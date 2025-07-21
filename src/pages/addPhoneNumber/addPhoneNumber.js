import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { app } from "../../config/firebaseConfig";
import API from "../../config/api";

import "./addPhoneNumber.css";
import "react-phone-input-2/lib/style.css";

import NavBar from "../../components/navBar/navBar";
import renderInput from "../../utils/renderInput";
import LinearProgress from "@mui/material/LinearProgress";
import PhoneInput from "react-phone-input-2";
import Footer from "../../components/footer/footer";

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

function AddPhoneNumber() {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
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
    validationSchema: Yup.object().shape({
      phoneNumber: Yup.string().required("Phone number is required."),
    }),
    onSubmit: async ({ phoneNumber }) => {
      setErrorMessage(null);
      setIsLoading(true);

      const fullPhoneNumber = `+${phoneNumber}`;

      try {
        // Step 1: Fetch existing phone numbers
        const { data } = await API.get(`/customer/phone-numbers`);

        const existingNumbers = data?.data || [];

        // Step 2: Check if phone number already exists
        const alreadyExists = existingNumbers.some(
          (item) => item.phoneNumber === fullPhoneNumber
        );

        if (alreadyExists) {
          setErrorMessage("This phone number already exists in your account.");
          return;
        }

        // Step 3: Send verification code via Firebase
        const appVerifier = window.recaptchaVerifier;

        const confirmation = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);
        setConfirmationResult(confirmation);
      } catch (err) {
        const isFirebaseError = err?.code?.startsWith("auth/");
        setErrorMessage(
          isFirebaseError
            ? getFirebaseErrorMessage(err)
            : "An error occurred while adding the phone number. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  const formikVerificationCode = useFormik({
    initialValues: { verificationCode: "" },
    validationSchema: Yup.object().shape({
      verificationCode: Yup.string()
        .required("Verification Code is required.")
        .length(6, "Verification code must be exactly 6 digits."),
    }),
    onSubmit: async ({ verificationCode }) => {
      setErrorMessage(null);
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
        await API.post(`/customer/phone-numbers`, {
          idToken: finalToken,
        });

        setIsPhoneNumberVerified(true);
      } catch (err) {
        const isFirebaseError = err?.code?.startsWith("auth/");
        setErrorMessage(
          isFirebaseError
            ? getFirebaseErrorMessage(err)
            : "An error occurred while adding the phone number. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
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
            {errorMessage && (
              <div className="alert_error">
                <p>{errorMessage}</p>
              </div>
            )}

            {/* Success message after sending verification code */}
            {confirmationResult && !errorMessage && !isLoading && (
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

                <input
                  className="submit"
                  type="submit"
                  value={isLoading ? "Sending Code..." : "Send Verification Code"}
                  disabled={isLoading}
                />
              </form>
            ) : (
              /* Verification code form */
              <form className="form" onSubmit={formikVerificationCode.handleSubmit}>
                {renderInput(
                  formikVerificationCode,
                  "Verification Code",
                  "verificationCode",
                  "text",
                  "Verification Code"
                )}

                <input
                  className="submit"
                  type="submit"
                  value={isLoading ? "Verifying..." : "Verify Phone Number"}
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

export default AddPhoneNumber;
