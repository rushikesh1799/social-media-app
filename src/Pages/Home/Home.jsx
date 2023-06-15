import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Home.css";
import Navigation from "../../Component/Navigation/Navigation";
import SuggUsers from "../../Component/SuggUsers/SuggUsers";
import Posts from "../../Component/Posts/Posts";

const Home = () => {
    const { user } = useContext(AuthContext);

    // useEffect(() => {
    //     console.log(user);
    // }, [user]);

    const navigate = useNavigate();

    const handleLogout = () => {
        // navigate("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <div>
            <Navigation />
            <h1>Home Page</h1>
            <SuggUsers />
            <hr />
            <Posts />
        </div>
    );
};

export default Home;
