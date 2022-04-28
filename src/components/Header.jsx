import React from "react";
import { Link } from "react-router-dom";
import icon from "../assets/img/icons.svg";
import logo from "../assets/img/logo-white.png";
import axios from "axios";
import { showAlert } from "../utils/utils";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/index";

const Header = () => {
  const dispatch = useDispatch();
  // const isAuth = useSelector((state) => state.authentication.isLoggedIn);
  const user = useSelector((state) => state.authentication.user);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "https://phucnq-natour.herokuapp.com/api/v1/users/logout",
      });
      if ((res.data.status = "success")) {
        dispatch(authActions.logout());
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      }
    } catch (err) {
      showAlert("error", "Error logging out! Try again.");
    }
  };

  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link to="/tours" className="nav__el">
          All tours
        </Link>
        <form className="nav__search">
          <button className="nav__search-btn">
            <svg>
              <use xlinkHref={`${icon}#icon-search`} />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search tours"
            className="nav__search-input"
          />
        </form>
      </nav>
      <div className="header__logo">
        <img src={logo} alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        {!user ? (
          <>
            <Link to="/login" className="nav__el nav__el--cta">
              Log in / Sign up
            </Link>
            {/* <button className="nav__el nav__el--cta">Sign up</button> */}
          </>
        ) : (
          <>
            <button onClick={logoutHandler} className="nav__el">
              Log out
            </button>
            <Link to="/me" className="nav__el">
              <img
                src={`https://natours.s3.ap-southeast-1.amazonaws.com/${user.photo}`}
                alt="User"
                className="nav__user-img"
              />
              <span>{user.name.split(" ")[0]}</span>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
