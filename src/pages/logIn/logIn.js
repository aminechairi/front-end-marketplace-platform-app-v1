import { useFormik } from "formik";
import * as Yup from "yup";

import "./logIn.css";

import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required.")
    .email("Please provide a valid email address."),
  password: Yup.string().required("Password is required."),
});

function LogIn() {
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm({
        values: {
          email: "",
          password: "",
        },
      });
    },
  });

  return (
    <>
      <NavBar />
      <div className="sign_in">
        <div className="container">
          <div className="ab">
            <h1 className="title">log in</h1>
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
                    formik.touched.email && formik.errors.email ? "red" : null,
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
                    formik.touched.email && formik.errors.email ? "red" : null,
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
