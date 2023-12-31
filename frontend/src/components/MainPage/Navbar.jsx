import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "./logo.avif";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import { NavLink } from "react-router-dom";
import { logout } from "../../apiCalling/auth";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const {setUserData, setToken} = useContext(AuthContext)
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const goToHomeHandler = () => {
    navigate("/landing");
  };
  const showMediaLinks = () => {
    setShowMediaIcons(!showMediaIcons);
  };
  const logoutHandler = async (e) => {
    e.preventDefault();
    logout(navigate, setUserData, setToken)
  }
  const {token} = useContext(AuthContext);
  return (
    <>
      <nav className="main-nav flex justify-between items-center">
        {/* 1st logo part  */}
        <div className="logo">
          <img src={logo} alt="" onClick={goToHomeHandler} />
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul>
            <li onClick={showMediaLinks}>
              <NavLink to="/landing">Home</NavLink>
            </li>
            <li onClick={showMediaLinks}>
              <NavLink to="/calculator">Calculator</NavLink>
            </li>
            <li onClick={showMediaLinks}>
              <NavLink to="/compare">Compare</NavLink>
            </li>
            <li onClick={showMediaLinks}>
              <NavLink to="/offset">Offset</NavLink>
            </li>
            <li onClick={showMediaLinks}>
              <NavLink to="/contact">contact Us</NavLink>
            </li> 
            {
              token && 
                  (<li onClick={logoutHandler} id="special">
                    <NavLink>LogOut</NavLink>
                  </li>)
            }
            {
              !token && (
                      <li id="special">
                        <NavLink to='/login'>Login</NavLink>
                      </li>
                      )
            }
          </ul>
        </div>

        <div className="social-media">
          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <a href="#" onClick={showMediaLinks}>
              <GiHamburgerMenu />
            </a>
          </div>
        </div>
      </nav>

      {/* hero section  */}
      {/* <section className="hero-section">
        <p>Welcome to </p>
        <h1>Thapa Technical</h1>
      </section> */}
    </>
  );
};

export default Navbar;
