import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import "./logIn.css";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import LinearProgress from "@mui/material/LinearProgress";

import { authLogIn } from "../../redux/authSlice";

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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(authLogIn(values));
      resetForm({
        values: {
          email: "",
          password: "",
        },
      });
      setOneSubmit(true);
    },
  });

  return (
    <>
      <NavBar />
      <div className="sign_in">
        <div className="container">
          <div className="ab">
            <div
              className="loading"
              style={{
                display: logIn.status === "loading" ? "block" : "none",
              }}
            >
              <LinearProgress color="inherit" />
            </div>

            <h1 className="title">log in</h1>

            {logIn.data?.message &&
            logIn.data?.status &&
            logIn.status === "succeeded" &&
            oneSubmit === true ? (
              <div className="alert">
                <p className="error">{logIn.data?.message}</p>
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
                        ? "red"
                        : null,
                  }}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="error">{formik.errors.email}</p>
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
                        ? "red"
                        : null,
                  }}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="error">{formik.errors.password}</p>
                ) : null}
              </div>

              <input className="submit" type="submit" defaultValue="Submit" />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LogIn;
