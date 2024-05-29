import "./navBar.css";

import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";

function SignUp() {
  return (
    <>
      <NavBar />
      <div className="sign_up">
        <div className="container">
          <div className="ab">
            <h1 className="title">sign up</h1>
            <form className="form">
              <div className="ab_first_name_and_last_name">
                {/* First name input */}
                <div>
                  <label className="label" htmlFor="first-name">First Name</label>
                  <input className="input" type="text" placeholder="First Name" id="first-name" />
                  <p className="error">
                    Please, first name must be 16 charachter
                  </p>
                </div>

                {/* Last name input */}
                <div>
                  <label className="label" htmlFor="last-name">Last Name</label>
                  <input className="input" type="text" placeholder="Last Name" id="last-name" />
                  <p className="error">
                    Please, first name must be 16 charachter
                  </p>
                </div>
              </div>

              {/* Email input */}
              <div className="ab_inputs">
                <label className="label" htmlFor="email">Email</label>
                <input className="input" type="email" placeholder="Email" id="email" />
                <p className="error">
                  Please, first name must be 16 charachter
                </p>
              </div>

              {/* Phone number input */}
              <div className="ab_inputs">
                <label className="label" htmlFor="phone-number">Phone Number</label>
                <input
                  className="input"
                  type="number"
                  placeholder="Phone Number"
                  id="phone-number"
                />
                <p className="error">
                  Please, first name must be 16 charachter
                </p>
              </div>

              {/* Password input */}
              <div className="ab_inputs">
                <label className="label" htmlFor="password">Password</label>
                <input className="input" type="password" placeholder="Password" id="password" />
                <p className="error">
                  Please, first name must be 16 charachter
                </p>
              </div>

              {/* Confirm password input */}
              <div className="ab_inputs">
                <label className="label" htmlFor="confirm-password">Confirm Password</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Confirm Password"
                  id="confirm-password"
                />
                <p className="error">
                  Please, first name must be 16 charachter
                </p>
              </div>

              <input className="submit" type="submit" defaultValue="Submit"/>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
