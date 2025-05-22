import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import "./passwordResetCode.css";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import LinearProgress from "@mui/material/LinearProgress";

import { authPasswordResetCode } from "../../redux/authSlice";
import { setCookie } from "../../redux/cookiesSlice";
import { HOME } from "../../routes";

const validationSchema = Yup.object().shape({
  passwordResetCode: Yup.string().required("Password reset code is required."),
  newPassword: Yup.string()
    .required("New password is required.")
    .min(8, "New Password should be at least 8 characters long."),
  confirmNewPassword: Yup.string()
    .required("Confirm new password is required.")
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Confirm new password does not match new password."
    ),
});

function PasswordResetCode() {
  const [oneSubmit, setOneSubmit] = useState(false);
  const forgotPassword = useSelector((state) => state.auth);
  const passwordResetCode = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      passwordResetCode: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(authPasswordResetCode(values));
      setOneSubmit(true);
    },
  });

  useEffect(() => {
    if (passwordResetCode.data?.token) {
      dispatch(
        setCookie({
          name: "JWTToken",
          value: passwordResetCode.data?.token,
          days: 90,
        })
      );
      navigate(HOME);
    }
  }, [dispatch, passwordResetCode.data?.token, navigate]);

  return (
    <>
      <NavBar />
      <div className="forms password_reset_code">
        <div className="container">
          <div className="ab">
            {passwordResetCode.status === "loading" ? (
              <div className="form_loading">
                <LinearProgress color="inherit" />
              </div>
            ) : null}

            <h1 className="title">password reset coded</h1>

            {passwordResetCode.data?.message &&
            (passwordResetCode.data?.status === "fail" ||
              passwordResetCode.data?.status === "error") &&
            passwordResetCode.status === "succeeded" &&
            oneSubmit === true ? (
              <div className="alert_error">
                <p>{passwordResetCode.data?.message}</p>
              </div>
            ) : null}

            {forgotPassword.data?.message &&
            forgotPassword.data?.status === "Success" &&
            forgotPassword.status === "succeeded" ? (
              <div className="alert_success">
                <p>{forgotPassword.data?.message}</p>
              </div>
            ) : null}

            <form className="form" onSubmit={formik.handleSubmit}>
              {/* Pssword reset code input */}
              <div className="ab_inputs">
                <label className="label" htmlFor="passwordResetCode">
                  Pssword reset code
                </label>
                <input
                  className="input"
                  type="text"
                  placeholder="Pssword reset code"
                  name="passwordResetCode"
                  id="passwordResetCode"
                  value={formik.values.passwordResetCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    borderColor:
                      formik.touched.passwordResetCode &&
                      formik.errors.passwordResetCode
                        ? "var(--color-of-error)"
                        : null,
                  }}
                />
                {formik.touched.passwordResetCode &&
                formik.errors.passwordResetCode ? (
                  <p className="error_of_input">
                    {formik.errors.passwordResetCode}
                  </p>
                ) : null}
              </div>

              {formik.values.passwordResetCode.length >= 6 ? (
                <>
                  {/* New password input */}
                  <div className="ab_inputs">
                    <label className="label" htmlFor="newPassword">
                      New password
                    </label>
                    <input
                      className="input"
                      type="password"
                      placeholder="New password"
                      name="newPassword"
                      id="newPassword"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      style={{
                        borderColor:
                          formik.touched.newPassword &&
                          formik.errors.newPassword
                            ? "var(--color-of-error)"
                            : null,
                      }}
                    />
                    {formik.touched.newPassword && formik.errors.newPassword ? (
                      <p className="error_of_input">
                        {formik.errors.newPassword}
                      </p>
                    ) : null}
                  </div>

                  {/* Confirm new password input */}
                  <div className="ab_inputs">
                    <label className="label" htmlFor="confirmNewPassword">
                      Confirm new Password
                    </label>
                    <input
                      className="input"
                      type="password"
                      placeholder="Confirm new Password"
                      name="confirmNewPassword"
                      id="confirmNewPassword"
                      value={formik.values.confirmNewPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      style={{
                        borderColor:
                          formik.touched.confirmNewPassword &&
                          formik.errors.confirmNewPassword
                            ? "var(--color-of-error)"
                            : null,
                      }}
                    />
                    {formik.touched.confirmNewPassword &&
                    formik.errors.confirmNewPassword ? (
                      <p className="error_of_input">
                        {formik.errors.confirmNewPassword}
                      </p>
                    ) : null}
                  </div>
                </>
              ) : null}

              <input className="submit" type="submit" value="submit" />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PasswordResetCode;
