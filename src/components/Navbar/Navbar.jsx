import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import SearchIcon from "../../assets/search_icon.svg";
import BellIcon from "../../assets/bell_icon.svg";
import AvatarIcon from "../../assets/profile_img.png";
import CaretIcon from "../../assets/caret_icon.svg";
import { logout } from "../../firebase.js";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const logoutUser = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navbar">

      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />

        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? "show-menu" : ""}`}>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Watch Later</li>
        </ul>
      </div>

      <div className="navbar-right">
        <img src={SearchIcon} alt="Search" />
        <span className="kids-text">KIDS</span>
        <img src={BellIcon} alt="Notifications" />

        <div className="navbar-profile" tabIndex="0">
          <img src={AvatarIcon} alt="Profile" />
          <img src={CaretIcon} alt="Caret" />
          <div className="profile-dropdown">
            <p>Account</p>
            <p>Manage Profiles</p>
            <p>Help Center</p>
            
            <p onClick={logoutUser}>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
