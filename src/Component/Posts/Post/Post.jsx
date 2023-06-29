import React, { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PostButtons from "../PostButtons/PostButtons";

import "./Post.css";
import { useState } from "react";

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

    const getProfilePhoto = (username) =>
        users
            .filter((user) => user.username === username)
            .reduce((acc, curr) => acc + curr.profilePhoto, "");

    const getDateFormat = (inputDate) =>
        new Date(inputDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

    return (
        <div className="post-container">
            <div
                className="post-user"
                onClick={() => navigate(`/profile/${post?.username}`)}
            >
                <div className="post-user-photo">
                    <img
                        src={getProfilePhoto(post?.username)}
                        alt="profile-pic"
                        className="profile-photo"
                    />
                </div>
                <div className="post-user-details">
                    <span className="post-user-Fullname">
                        {getFullName(post?.username)}
                    </span>
                    <span className="post-user-username">
                        @{post?.username}
                    </span>
                </div>
                <div className="text__date__devider">
                    <span className="dot"> • </span>
                    <span className="post__date">
                        {getDateFormat(post?.createdAt)}
                    </span>
                </div>
            </div>
            <div onClick={() => handlePostClick(post)}>
                <div className="post-content">
                    <p>{post?.content}</p>
                </div>
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
