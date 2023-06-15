import React, { useContext } from "react";
import "./Navigation.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navigation = () => {
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        // navigate("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <div>
            <h2>Hello, {user.firstName}</h2>

            <nav className="nav-container">
                <NavLink to="/home" className="nav-element">
                    Home
                </NavLink>
                <NavLink to="/explore" className="nav-element">
                    Explore
                </NavLink>
                <NavLink to="/bookmark" className="nav-element">
                    Bookmark
                </NavLink>
                <NavLink
                    to="/login"
                    className="nav-element"
                    onClick={handleLogout}
                >
                    Logout
                </NavLink>
            </nav>
        </div>
    );
};

export default Navigation;
