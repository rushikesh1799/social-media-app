import React, { useContext } from "react";

import Navigation from "../../Component/Navigation/Navigation";
import { DataContext } from "../../context/DataContext";
import "./Explore.css";
import SuggUsers from "../../Component/SuggUsers/SuggUsers";
import Post from "../../Component/Posts/Post/Post";
import { useEffect } from "react";
import Header from "../../Component/Header/Header";

const Explore = () => {
    const { posts, category, handleCategory, getCategoryPosts } =
        useContext(DataContext);

    // const getCategoryPosts = () => {
    //     const getPosts = posts?.filter(
    //         (post) => post?.category.toLowerCase() === category
    //     );
    //     return getPosts;
    // };

    const getTrendingPostsOnExplore = () => {
        const newTrendingPostsArray = [...posts].sort(
            (a, b) => b.likes.likeCount - a.likes.likeCount
        );
        return newTrendingPostsArray;
    };

    // console.log(getTrendingPosts());

    const postsToRender =
        category !== "trending"
            ? getCategoryPosts(category)
            : getTrendingPostsOnExplore();

    // useEffect(() => console.log(postsToRender), [postsToRender]);

    // console.log("postsToRender", postsToRender);

    const style1 = {
        color: "white",
        backgroundColor: "black",
    };

    const style2 = {
        padding: "4px 8px",
        margin: "0px 4px",
    };

    return (
        <div>
            <Header />
            <div className="home-primary-container">
                <Navigation />
                <div className="explore-primary-container">
                    <div onClick={(e) => handleCategory(e)}>
                        <button
                            value="trending"
                            className="btns"
                            style={category === "trending" ? style1 : style2}
                        >
                            Trending
                        </button>
                        <button
                            value="sports"
                            className="btns"
                            style={category === "sports" ? style1 : style2}
                        >
                            Sports
                        </button>
                        <button
                            value="technology"
                            className="btns"
                            style={category === "technology" ? style1 : style2}
                        >
                            Technology
                        </button>
                    </div>
                    {postsToRender &&
                        postsToRender.map((post) => (
                            <Post post={post} key={post._id} />
                        ))}
                </div>
                <SuggUsers />
            </div>
        </div>
    );
};

export default Explore;
