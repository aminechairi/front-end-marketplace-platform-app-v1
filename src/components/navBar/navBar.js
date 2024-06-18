import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import "./navBar.css";
import ScrollToTop from "../common/scrollToTop/scrollToTop";
import cookieManager from "../../utils/cookieManager";

const auth = cookieManager("get", "JWTToken");

export default function NavBar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuStyle, setMenuStyle] = useState({
    opacity: 0,
    visibility: "hidden",
    transform: "translateY(-10px)",
  });

  useEffect(() => {
    if (menuVisible) {
      setMenuStyle({
        opacity: 1,
        visibility: "visible",
        transform: "translateY(0)",
      });
    } else {
      setMenuStyle({
        opacity: 0,
        visibility: "hidden",
        transform: "translateY(-10px)",
      });
    }
  }, [menuVisible]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="navBar">
      <div className="container">
        <div className="ab">
          <ScrollToTop>
            <Link to={`/`}>
              <div className="logo">
                <img
                  src={require("../../imgs/logo.png")}
                  width={80}
                  height={80}
                  alt=""
                />
                <h1 className="title">dianomi</h1>
              </div>
            </Link>
          </ScrollToTop>
          <div className="search">
            <form>
              <input
                className="input_search"
                type="text"
                placeholder="Search..."
              />
              <button className="button_input_search" type="submit">
                <SearchIcon />
              </button>
            </form>
          </div>
          {auth ? (
            <div className="cart_profile">
              <div className="buttons">
                <button className="button">
                  <FavoriteBorderIcon />
                </button>
                <button className="button">
                  <ShoppingCartCheckoutIcon />
                </button>
                <button className="button">
                  <AccountCircleIcon />
                </button>
              </div>
              <div className="icon" onClick={toggleMenu}>
                <MenuIcon />
                <div className="ab_menu" style={menuStyle}>
                  <ul className="menu">
                    <li>
                      <ScrollToTop>
                        <Link to="/sign-up">
                          <AccountCircleIcon /> profile
                        </Link>
                      </ScrollToTop>
                    </li>
                    <li>
                      <ScrollToTop>
                        <Link to="/log-in">
                          <FavoriteBorderIcon /> saves
                        </Link>
                      </ScrollToTop>
                    </li>
                    <li>
                      <ScrollToTop>
                        <Link to="/sign-up">
                          <ShoppingCartCheckoutIcon /> shopping cart
                        </Link>
                      </ScrollToTop>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="logIn_signIn">
              <div className="buttons">
                <ScrollToTop>
                  <Link to="/log-in" className="button">
                    log in
                  </Link>
                </ScrollToTop>
                <ScrollToTop>
                  <Link to="/sign-up" className="button">
                    sign up
                  </Link>
                </ScrollToTop>
              </div>
              <div className="icon" onClick={toggleMenu}>
                <MenuIcon />
                <div className="ab_menu" style={menuStyle}>
                  <ul className="menu">
                    <li>
                      <ScrollToTop>
                        <Link to="/log-in">
                          <LoginIcon /> log in
                        </Link>
                      </ScrollToTop>
                    </li>
                    <li>
                      <ScrollToTop>
                        <Link to="/sign-up">
                          <ExitToAppIcon /> sign up
                        </Link>
                      </ScrollToTop>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
