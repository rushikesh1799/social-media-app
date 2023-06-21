import React, { useContext } from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navigation = () => {
    const { user, setToken, setUser } = useContext(AuthContext);

    const handleLogout = () => {
        // navigate("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        setToken(null);
    };

    return (
        <div className="primary-nav">
            {/* <h2>Hello, {user?.username}</h2> */}
            <nav className="nav-container1">
                <div className="nav-element1">
                    <NavLink to="/home">Home</NavLink>
                </div>
                <div className="nav-element1">
                    <NavLink to="/explore">Explore</NavLink>
                </div>
                <div className="nav-element1">
                    <NavLink to="/bookmark">Bookmark</NavLink>
                </div>
                <div className="nav-element1">
                    <NavLink to="/login" onClick={handleLogout}>
                        Logout
                    </NavLink>
                </div>
            </nav>
            <div>Hello, {user?.username}</div>
        </div>
    );
};

export default Navigation;
