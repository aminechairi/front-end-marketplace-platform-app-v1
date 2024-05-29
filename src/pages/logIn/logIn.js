import "./logIn.css";

import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";

function LogIn() {
  return (
    <>
      <NavBar />
      <div className="sign_in">
        <div className="container">
          <div className="ab">
            <h1 className="title">sign in</h1>
            <form className="form">
              {/* Email input */}
              <div className="ab_inputs">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  id="email"
                />
                <p className="error">
                  Please, first name must be 16 charachter
                </p>
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
                  id="password"
                />
                <p className="error">
                  Please, first name must be 16 charachter
                </p>
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
