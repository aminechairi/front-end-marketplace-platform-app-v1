import { Link } from "react-router-dom";

import "./noFound.css";

import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import ScrollToTop from "../../components/common/scrollToTop/scrollToTop";

export default function NoFound() {
  return (
    <>
      <NavBar />
      <div className="noFound">
        <div className="container">
          <div className="ab">
            <img src={require("../../imgs/404.png")} alt="" />
            <p>
              Oops! The page you are looking for seems to be nowhere to be
              found!
            </p>
            <p>Rephrase your search or go to:</p>
            <ScrollToTop>
              <Link to="/">
                <button className="buttom">Home Page</button>
              </Link>
            </ScrollToTop>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
