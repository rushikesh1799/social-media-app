import React, { useContext } from "react";

import Navigation from "../../Component/Navigation/Navigation";
import { DataContext } from "../../context/DataContext";
import "./Explore.css";
import SuggUsers from "../../Component/SuggUsers/SuggUsers";
import Post from "../../Component/Posts/Post/Post";
import { useEffect } from "react";

const Explore = () => {
    const { posts, category, handleCategory } = useContext(DataContext);

    const getCategoryPosts = () => {
        const getPosts = posts?.filter(
            (post) => post?.category.toLowerCase() === category
        );
        return getPosts;
    };

    const getTrendingPosts = () => {
        const newTrendingPostsArray = [...posts].sort(
            (a, b) => b.likes.likeCount - a.likes.likeCount
        );
        return newTrendingPostsArray;
    };

    // console.log(getTrendingPosts());

    const postsToRender =
        category !== "trending"
            ? getCategoryPosts(category)
            : getTrendingPosts();

    useEffect(() => console.log(postsToRender), [postsToRender]);

    // console.log("postsToRender", postsToRender);

    return (
        <div className="home-primary-container">
            <Navigation />
            <div>
                <h1>Explore Page</h1>
                <div onClick={(e) => handleCategory(e)}>
                    <button value="trending" className="btns">
                        Trending
                    </button>
                    <button value="Sports" className="btns">
                        Sports
                    </button>
                    <button value="Technology" className="btns">
                        Technology
                    </button>
                </div>
                {postsToRender.map((post) => (
                    <Post post={post} key={post._id} />
                ))}
            </div>
            <SuggUsers />
        </div>
    );
};

export default Explore;
