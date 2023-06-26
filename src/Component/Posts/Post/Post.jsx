import React, { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PostButtons from "../PostButtons/PostButtons";

import "./Post.css";

const Post = ({ post }) => {
    const { users, handlePostClick } = useContext(DataContext);
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const getFullName = (username) =>
        users
            .filter((user) => user.username === username)
            .reduce(
                (acc, curr) => acc + curr.firstName + " " + curr.lastName,
                ""
            );

    const getDateFormat = (inputDate) =>
        new Date(inputDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

    // const handleDisLike = (post) => {
    //     console.log("Dislike this post", post);
    // };

    return (
        <div className="post-container">
            <div
                className="post-user"
                onClick={() => navigate(`/profile/${post?.username}`)}
            >
                <div className="post-user-photo">
                    <img
                        src={post?.profilePhoto}
                        alt="profile-pic"
                        className="profile-photo"
                    />
                </div>
                <div className="post-user-details">
                    <span>{getFullName(post?.username)}</span>
                    <span>@{post?.username}</span>
                </div>
                <span>{getDateFormat(post?.createdAt)}</span>
            </div>
            <div onClick={() => handlePostClick(post)}>
                <p className="post-content">{post?.content}</p>
                {post?.postImage ? (
                    <img
                        src={post?.postImage}
                        className="post-img"
                        alt="post-img"
                    />
                ) : (
                    <React.Fragment></React.Fragment>
                )}
            </div>
            <PostButtons post={post} />
        </div>
    );
};

export default Post;
