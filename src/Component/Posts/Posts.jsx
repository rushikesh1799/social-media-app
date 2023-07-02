import React, { useContext } from "react";

import "./Posts.css";
import Post from "./Post/Post";
import PostsFilter from "./PostsFilter/PostsFilter";
import { DataContext } from "../../context/DataContext";
import CreateNewPost from "../CreateNewPost/CreateNewPost";

const Posts = ({ posts }) => {
    const { filter, getTrendingPosts } = useContext(DataContext);

    const LatestPosts = [...posts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const olderstPosts = [...posts].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    // console.log("olderstPosts", olderstPosts);

    const postsToRender =
        filter === "latest"
            ? LatestPosts
            : filter === "trending"
            ? getTrendingPosts()
            : olderstPosts;

    // const postsToRender1 = () => {
    //     switch (filter) {
    //         case "all":
    //             return posts;
    //         case "trending":
    //             return posts;
    //         case "oldest":
    //             return olderstPosts;
    //         case "latest":
    //             return LatestPosts;

    //         default:
    //             return posts;
    //     }
    // };

    // useEffect(() => {
    //     console.log("postsToRender", postsToRender);
    // }, [postsToRender]);

    return (
        <div className="posts-primary-container">
            <CreateNewPost />
            <PostsFilter />
            {postsToRender.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    );
};

export default Posts;
