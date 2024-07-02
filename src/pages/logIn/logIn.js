import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import "./logIn.css";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import LinearProgress from "@mui/material/LinearProgress";

import { authLogIn } from "../../redux/authSlice";
import { setCookie } from "../../redux/cookiesSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required.")
    .email("Please provide a valid email address."),
  password: Yup.string().required("Password is required."),
});

function LogIn() {
  const [oneSubmit, setOneSubmit] = useState(false);

  const logIn = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(authLogIn(values));
      setOneSubmit(true);
    },
  });

  useEffect(() => {
    if (logIn.data?.token) {
      dispatch(
        setCookie({ name: "JWTToken", value: logIn.data?.token, days: 90 })
      );
      navigate("/");
    }
  }, [dispatch, logIn.data?.token, navigate]);

  return (
    <>
      <NavBar />
      <div className="forms log_in">
        <div className="container">
          <div className="ab">
            {logIn.status === "loading" ? (
              <div className="loading">
                <LinearProgress color="inherit" />
              </div>
            ) : null}

            <h1 className="title">log in</h1>

            {logIn.data?.message &&
            logIn.data?.status &&
            logIn.status === "succeeded" &&
            oneSubmit === true ? (
              <div className="alert_error">
                <p>{logIn.data?.message}</p>
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
                  placeholder="Email"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    borderColor:
                      formik.touched.email && formik.errors.email
                        ? "#c53030"
                        : null,
                  }}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="error_of_input">{formik.errors.email}</p>
                ) : null}
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
                        ? "#c53030"
                        : null,
                  }}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="error_of_input">{formik.errors.password}</p>
                ) : null}
              </div>

              <input className="submit" type="submit" value="Log in" />
            </form>
            <Link to="forgot-password">
              <button className="link">forgot password</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LogIn;
