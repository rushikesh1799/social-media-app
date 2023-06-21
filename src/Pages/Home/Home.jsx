import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Home.css";
import Navigation from "../../Component/Navigation/Navigation";
import SuggUsers from "../../Component/SuggUsers/SuggUsers";
import Posts from "../../Component/Posts/Posts";
import { DataContext } from "../../context/DataContext";

const Home = () => {
    const { posts, loading } = useContext(DataContext);

    return (
        <div>
            {loading ? (
                <h1 style={{ backgroundColor: "red" }}>...Loading</h1>
            ) : (
                <div className="home-primary-container">
                    <Navigation />
                    <Posts posts={posts} />
                    <SuggUsers />
                </div>
            )}
        </div>
    );
};

export default Home;
