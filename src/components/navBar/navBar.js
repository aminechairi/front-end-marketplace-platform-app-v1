import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import "./navBar.css";

import { toggleTheme } from "../../redux/slices/themeSlice";
import logOutFunction from "../../utils/logOutFunction";
import ScrollToTop from "../scrollToTop/scrollToTop";
import {
  HOME,
  LOGIN,
  SIGNUP,
  FAVORITES,
  SHOPPING_CART,
  PROFILE,
  ORDERS,
} from "../../routes";

export default function NavBar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuStyle, setMenuStyle] = useState({
    opacity: 0,
    visibility: "hidden",
    transform: "translateY(-10px)",
  });

  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const auth = useSelector((state) => state.cookies.JWTToken);

  const navigate = useNavigate();
  const location = useLocation();
  const { searchValue } = useParams();

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

  const logOut = () => {
    logOutFunction();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchValue = event.target.search.value;
    if (searchValue.length > 0) {
      const queryParams = new URLSearchParams(location.search);
      queryParams.set("page", 1);
      queryParams.delete("category");
      queryParams.delete("subcategory");
      queryParams.delete("undersubcategory");
      queryParams.delete("brand");
      navigate(`/search/${searchValue}?${queryParams.toString()}`);
    }
  };

  return (
    <div className="navBar">
      <div className="container">
        <div className="ab">
          <ScrollToTop>
            <Link to={HOME}>
              <div className="logo">
                <img
                  src={require("../../imgs/logo192.png")}
                  width={80}
                  height={80}
                  alt=""
                  loading="lazy"
                />
                <h1 className="title">shop</h1>
              </div>
            </Link>
          </ScrollToTop>

          <div className="search">
            <form onSubmit={handleSearch}>
              <input
                className="input_search"
                type="search"
                name="search"
                placeholder="Search..."
                defaultValue={searchValue}
              />
              <button className="button_input_search" type="submit">
                <SearchIcon />
              </button>
            </form>
          </div>

          {auth ? (
            <div className="chooses">
              <div className="buttons">
                <button
                  className="button"
                  onClick={() => dispatch(toggleTheme())}
                >
                  {themeMode === "light" ? (
                    <Brightness4Icon />
                  ) : (
                    <Brightness7Icon />
                  )}
                </button>
                <button className="button">
                  <ScrollToTop>
                    <Link to={SHOPPING_CART}>
                      <ShoppingCartCheckoutIcon />
                    </Link>
                  </ScrollToTop>
                </button>
                <button className="button">
                  <ScrollToTop>
                    <Link to={FAVORITES}>
                      <FavoriteBorderIcon />
                    </Link>
                  </ScrollToTop>
                </button>
                <button className="button" onClick={toggleMenu}>
                  <AccountCircleIcon />
                  <div className="ab_menu" style={menuStyle}>
                    <div className="container">
                      <ul className="menu">
                        <li>
                          <ScrollToTop>
                            <Link to={PROFILE}>
                              <AccountCircleIcon /> profile
                            </Link>
                          </ScrollToTop>
                        </li>
                        <li>
                          <ScrollToTop>
                            <Link to={ORDERS}>
                              <ShoppingBasketIcon /> orders
                            </Link>
                          </ScrollToTop>
                        </li>
                        <li className="logout">
                          <Link onClick={logOut}>
                            <LogoutIcon /> log out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </button>
              </div>

              <div className="icon" onClick={toggleMenu}>
                <MenuIcon />
                <div className="ab_menu" style={menuStyle}>
                  <ul className="menu">
                    <li>
                      <ScrollToTop>
                        <Link to={PROFILE}>
                          <AccountCircleIcon /> profile
                        </Link>
                      </ScrollToTop>
                    </li>
                    <li>
                      <ScrollToTop>
                        <Link to={FAVORITES}>
                          <FavoriteBorderIcon /> favorites
                        </Link>
                      </ScrollToTop>
                    </li>
                    <li>
                      <ScrollToTop>
                        <Link to={SHOPPING_CART}>
                          <ShoppingCartCheckoutIcon /> shopping cart
                        </Link>
                      </ScrollToTop>
                    </li>
                    <li>
                      <ScrollToTop>
                        <Link to={ORDERS}>
                          <ShoppingBasketIcon /> orders
                        </Link>
                      </ScrollToTop>
                    </li>
                    <li>
                      <Link onClick={() => dispatch(toggleTheme())}>
                        {themeMode === "light" ? (
                          <>
                            <Brightness4Icon /> dark mode
                          </>
                        ) : (
                          <>
                            <Brightness7Icon /> light mode
                          </>
                        )}
                      </Link>
                    </li>
                    <li className="logout">
                      <Link onClick={logOut}>
                        <LogoutIcon /> log out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="logIn_signIn">
              <div className="buttons">
                <Link
                  className="button"
                  onClick={() => dispatch(toggleTheme())}
                >
                  {themeMode === "light" ? (
                    <Brightness4Icon />
                  ) : (
                    <Brightness7Icon />
                  )}
                </Link>
                <ScrollToTop>
                  <Link to={LOGIN} className="button">
                    log in
                  </Link>
                </ScrollToTop>
                <ScrollToTop>
                  <Link to={SIGNUP} className="button">
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
                        <Link to={LOGIN}>
                          <LoginIcon /> log in
                        </Link>
                      </ScrollToTop>
                    </li>
                    <li>
                      <ScrollToTop>
                        <Link to={SIGNUP}>
                          <ExitToAppIcon /> sign up
                        </Link>
                      </ScrollToTop>
                    </li>
                    <li>
                      <Link onClick={() => dispatch(toggleTheme())}>
                        {themeMode === "light" ? (
                          <>
                            <Brightness4Icon /> dark mode
                          </>
                        ) : (
                          <>
                            <Brightness7Icon /> light mode
                          </>
                        )}
                      </Link>
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
