import React, { useContext } from "react";
import "./Navigation.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navigation = () => {
    const { user, setToken, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

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
                    <NavLink to="/home" className="link">
                        <i className="fa fa-home" aria-hidden="true"></i>
                        Home
                    </NavLink>
                </div>
                <div className="nav-element1">
                    <NavLink to="/explore" className="link">
                        <i className="fa fa-compass" aria-hidden="true"></i>
                        Explore
                    </NavLink>
                </div>
                <div className="nav-element1">
                    <NavLink to="/bookmark" className="link">
                        <i className="fa fa-bookmark" aria-hidden="true"></i>
                        Bookmark
                    </NavLink>
                </div>
                <div className="nav-element1">
                    <NavLink
                        to="/login"
                        className="link"
                        onClick={handleLogout}
                    >
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                        Logout
                    </NavLink>
                </div>
                <hr />
            </nav>
            <div
                className="User__details"
                onClick={() => navigate(`/profile/${user?.username}`)}
            >
                <div className="User__details__img">
                    <img
                        src={user?.profilePhoto}
                        alt="profile-pic"
                        className="profile-photo"
                    />
                </div>
                <div className="User__details__text">
                    <p>{user?.fullName}</p>
                    <span>@{user?.username}</span>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
