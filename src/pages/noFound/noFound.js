import { Link } from "react-router-dom";

import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/scrollToTop/scrollToTop";
import { HOME } from "../../routes";

export default function NoFound() {
  return (
    <>
      <NavBar />
      <div className="noFound">
        <div className="container">
          <div className="ab">
            <img src={require("../../imgs/error-404.png")} alt="" />
            <h1>Uh-oh, something went wrong here</h1>
            <p>Just keep browsing to get back on track</p>
            <ScrollToTop>
              <Link to={HOME}>
                <button className="buttom">Back to home page</button>
              </Link>
            </ScrollToTop>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
