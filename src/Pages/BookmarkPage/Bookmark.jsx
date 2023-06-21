import React, { useContext, useEffect } from "react";

import Navigation from "../../Component/Navigation/Navigation";
import SuggUsers from "../../Component/SuggUsers/SuggUsers";
import "./Bookmark.css";
import { DataContext } from "../../context/DataContext";
import Post from "../../Component/Posts/Post/Post";

const Bookmark = () => {
    const { bookmarks, posts } = useContext(DataContext);

    // useEffect(() => {
    //     console.log("bookmarks from bookmarks page:", bookmarks);
    // }, [bookmarks]);

    const allBookmarks = posts.filter((post) => bookmarks.includes(post._id));

    return (
        <div className="home-primary-container">
            <Navigation />
            <div>
                <h1>Bookmark Page</h1>
                {allBookmarks.map((post) => (
                    <Post post={post} key={post._id} />
                ))}
            </div>

            <SuggUsers />
        </div>
    );
};

export default Bookmark;
