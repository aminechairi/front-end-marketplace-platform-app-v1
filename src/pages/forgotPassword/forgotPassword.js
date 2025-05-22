import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import "./forgotPassword.css";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import LinearProgress from "@mui/material/LinearProgress";

import { authForgotPassword } from "../../redux/authSlice";
import { PASSWORD_RESET_CODE } from "../../routes";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required.")
    .email("Please provide a valid email address."),
});

function ForgotPassword() {
  const [oneSubmit, setOneSubmit] = useState(false);
  const forgotPassword = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(authForgotPassword(values));
      setOneSubmit(true);
    },
  });

  useEffect(() => {
    if (forgotPassword.data?.status === "Success") {
      navigate(PASSWORD_RESET_CODE);
    }
  }, [forgotPassword.data?.status, navigate]);

  return (
    <>
      <NavBar />
      <div className="forms forgot_password">
        <div className="container">
          <div className="ab">
            {forgotPassword.status === "loading" ? (
              <div className="form_loading">
                <LinearProgress color="inherit" />
              </div>
            ) : null}

            <h1 className="title">forgot password</h1>

            {forgotPassword.data?.message &&
            (forgotPassword.data?.status === "fail" ||
              forgotPassword.data?.status === "error") &&
            forgotPassword.status === "succeeded" &&
            oneSubmit === true ? (
              <div className="alert_error">
                <p>{forgotPassword.data?.message}</p>
              </div>
            ) : null}

            <form className="form" onSubmit={formik.handleSubmit}>
              {/* Email input */}
              <div className="ab_inputs">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  className="input"
                  type="email"
                  placeholder="Please enter your email."
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    borderColor:
                      formik.touched.email && formik.errors.email
                        ? "var(--color-of-error)"
                        : null,
                  }}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="error_of_input">{formik.errors.email}</p>
                ) : null}
              </div>

              <input className="submit" type="submit" value="Search" />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ForgotPassword;
