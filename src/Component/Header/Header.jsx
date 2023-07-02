import React from "react";

import "./Header.css";
import { NavLink } from "react-router-dom/dist";

const Header = () => {
    return (
        <div className="header__container">
            <NavLink to="/home" className="logo">
                My Social Circle
            </NavLink>
        </div>
    );
};

export default Header;
