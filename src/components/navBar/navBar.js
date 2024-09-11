import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import "./navBar.css";
import ScrollToTop from "../scrollToTop/scrollToTop";
import { authLogOut } from "../../redux/authSlice";
import { HOME, LOGIN, SIGNUP, SAVES } from "../../routes";

export default function NavBar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuStyle, setMenuStyle] = useState({
    opacity: 0,
    visibility: "hidden",
    transform: "translateY(-10px)",
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true" || false;
  });

  const auth = useSelector((state) => state.cookies.JWTToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  const logOutFunction = async () => {
    const resultAction = await dispatch(authLogOut());
    if (authLogOut.fulfilled.match(resultAction)) {
      navigate(LOGIN);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.search.value;
    if (query.length > 0) {
      navigate(`/search/${query}`);
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
                  src={require("../../imgs/logo.png")}
                  width={80}
                  height={80}
                  alt=""
                />
                <h1 className="title">e shop app</h1>
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
                <button className="button" onClick={toggleDarkMode}>
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </button>
                <button className="button">
                  <ScrollToTop>
                    <Link to={SAVES}>
                      <FavoriteBorderIcon />
                    </Link>
                  </ScrollToTop>
                </button>
                <button className="button">
                  <ScrollToTop>
                    <Link to="/">
                      <ShoppingCartCheckoutIcon />
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
                            <Link to="/">
                              <AccountCircleIcon /> profile
                            </Link>
                          </ScrollToTop>
                        </li>
                        <li>
                          <Link onClick={logOutFunction}>
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
                        <Link to="/">
                          <AccountCircleIcon /> profile
                        </Link>
                      </ScrollToTop>
                    </li>
                    <li>
                      <ScrollToTop>
                        <Link to={SAVES}>
                          <FavoriteBorderIcon /> favorites
                        </Link>
                      </ScrollToTop>
                    </li>
                    <li>
                      <ScrollToTop>
                        <Link to="/">
                          <ShoppingCartCheckoutIcon /> shopping cart
                        </Link>
                      </ScrollToTop>
                    </li>
                    <li>
                      <Link onClick={toggleDarkMode}>
                        {darkMode ? (
                          <>
                            <Brightness7Icon /> light mode
                          </>
                        ) : (
                          <>
                            <Brightness4Icon /> dark mode
                          </>
                        )}
                      </Link>
                    </li>
                    <li>
                      <Link onClick={logOutFunction}>
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
                <Link className="button" onClick={toggleDarkMode}>
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
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
                      <Link onClick={toggleDarkMode}>
                        {darkMode ? (
                          <>
                            <Brightness7Icon /> light mode
                          </>
                        ) : (
                          <>
                            <Brightness4Icon /> dark mode
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
