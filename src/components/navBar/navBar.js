import { Link } from "react-router-dom";

import "./navBar.css";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const auth = false;

export default function NavBar() {
  return (
    <div className="navBar">
      <div className="container">
        <div className="ab">
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
          {auth === true ? (
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
              <div className="icon">
                <MenuIcon />
              </div>
            </div>
          ) : (
            <div className="logIn_signIn">
              <div className="buttons">
                <Link to="/log-in" className="button">
                  log in
                </Link>
                <Link to="/sign-up" className="button">
                  sign up
                </Link>
              </div>
              <div className="icon">
                <MenuIcon />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
