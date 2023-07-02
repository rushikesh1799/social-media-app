import React, { useContext } from "react";
import "./Home.css";
import Navigation from "../../Component/Navigation/Navigation";
import SuggUsers from "../../Component/SuggUsers/SuggUsers";
import Posts from "../../Component/Posts/Posts";
import { DataContext } from "../../context/DataContext";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../Component/Header/Header";

const Home = () => {
    const { users, posts, loading } = useContext(DataContext);
    const { user } = useContext(AuthContext);

    const getSelectedPosts = () => {
        if (users) {
            try {
                const allFollowedUsers1 = users
                    .find(
                        (currentUser) => currentUser.username === user.username
                    )
                    .following.map((user) => user.username);

                const followedUsersPosts = posts.filter((post) =>
                    allFollowedUsers1.includes(post.username)
                );

                return followedUsersPosts;
                // console.log("followedUsersPosts", followedUsersPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const selectedPosts = getSelectedPosts();

    return (
        <div>
            <Header />
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
