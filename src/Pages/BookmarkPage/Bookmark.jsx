import React, { useContext } from "react";

import Navigation from "../../Component/Navigation/Navigation";
import SuggUsers from "../../Component/SuggUsers/SuggUsers";
import "./Bookmark.css";
import { DataContext } from "../../context/DataContext";
import Post from "../../Component/Posts/Post/Post";
import Header from "../../Component/Header/Header";

const Bookmark = () => {
    const { bookmarks, posts } = useContext(DataContext);

    // useEffect(() => {
    //     console.log("bookmarks from bookmarks page:", bookmarks);
    // }, [bookmarks]);

    const allBookmarks = posts.filter((post) => bookmarks.includes(post._id));

    // console.log(allBookmarks);
    return (
        <div>
            <Header />
            <div className="home-primary-container">
                <Navigation />
                <div className="bookmark-primary-container">
                    {allBookmarks.length === 0 ? (
                        <h2>You have not added any Bookmarks!</h2>
                    ) : (
                        allBookmarks.map((post) => (
                            <Post post={post} key={post._id} />
                        ))
                    )}
                </div>

                <SuggUsers />
            </div>
        </div>
    );
};

export default Bookmark;
