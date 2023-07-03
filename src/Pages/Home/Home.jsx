import React, { useContext } from "react";
import "./Home.css";
import Navigation from "../../Component/Navigation/Navigation";
import SuggUsers from "../../Component/SuggUsers/SuggUsers";
import Posts from "../../Component/Posts/Posts";
import { DataContext } from "../../context/DataContext";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../Component/Header/Header";

const Home = () => {
    const { users, posts, loading, selectedPosts } = useContext(DataContext);
    const { user } = useContext(AuthContext);

    return (
        <div>
            <Header />
            {loading ? (
                <h1 style={{ backgroundColor: "red" }}>...Loading</h1>
            ) : (
                <div className="home-primary-container">
                    <Navigation />
                    {selectedPosts && <Posts posts={selectedPosts} />}
                    <SuggUsers />
                </div>
            )}
        </div>
    );
};

export default Home;
// https://api.cloudinary.com/v1_1/dwegb6a4s
// bdds7iml