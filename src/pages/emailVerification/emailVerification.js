import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import "./emailVerification.css";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import LinearProgress from "@mui/material/LinearProgress";

import {
  emailVerification,
  emailverificationcode,
} from "../../redux/emailVerificationSlice";

const validationSchema = Yup.object().shape({
  emailVerificationCode: Yup.string().required(
    "Email verification code is required."
  ),
});

function EmailVerification() {
  const emailVrf = useSelector((state) => state.emailVerification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(emailVerification());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      emailVerificationCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(emailverificationcode(values));
      resetForm({
        values: {
          emailVerificationCode: "",
        },
      });
    },
  });

  useEffect(() => {
    if (emailVrf.data?.status === "Verified") {
      window.location.replace("/");
    }
  }, [emailVrf.data?.status]);

  return (
    <>
      <NavBar />
      <div className="email_verification">
        <div className="container">
          <div className="ab">
            {emailVrf.status === "loading" ? (
              <div className="loading">
                <LinearProgress color="inherit" />
              </div>
            ) : null}

            <h1 className="title">email Verification</h1>

            {emailVrf.data?.message &&
            emailVrf.data?.status === "fail" &&
            emailVrf.status === "succeeded" ? (
              <div className="alert_error">
                <p>{emailVrf.data?.message}</p>
              </div>
            ) : null}

            {emailVrf.data?.message &&
            (emailVrf.data?.status === "Code_sent" ||
              emailVrf.data?.status === "Verified") &&
            emailVrf.status === "succeeded" ? (
              <div className="alert_success">
                <p>{emailVrf.data?.message}</p>
              </div>
            ) : null}

            {emailVrf.data?.status !== "Verified" ? (
              <form className="form" onSubmit={formik.handleSubmit}>
                {/* Email verification code input */}
                <div className="ab_inputs">
                  <label className="label" htmlFor="emailVerificationCode">
                    email verification code
                  </label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Email verification code"
                    name="emailVerificationCode"
                    id="emailVerificationCode"
                    value={formik.values.emailVerificationCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{
                      borderColor:
                        formik.touched.emailVerificationCode &&
                        formik.errors.emailVerificationCode
                          ? "#c53030"
                          : null,
                    }}
                  />
                  {formik.touched.emailVerificationCode &&
                  formik.errors.emailVerificationCode ? (
                    <p className="error_of_input">
                      {formik.errors.emailVerificationCode}
                    </p>
                  ) : null}
                </div>

                <input className="submit" type="submit" defaultValue="Submit" />
              </form>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default EmailVerification;
