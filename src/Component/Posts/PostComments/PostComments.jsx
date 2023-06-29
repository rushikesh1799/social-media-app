import React from "react";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";

import "./PostComments.css";

const PostComments = ({ post }) => {
    const { users } = useContext(DataContext);

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
        <div className="comment__container">
            {post?.comments?.map((comment) => (
                <div className="comment__container" key={comment._id}>
                    <div className="post-user">
                        <div className="sugg-user-photo">
                            <img
                                src={getProfilePhoto(comment?.username)}
                                alt="profile-pic"
                                className="profile-photo"
                            />
                        </div>
                        <div className="post-user-details">
                            <span className="post-user-Fullname">
                                {getFullName(comment?.username)}
                            </span>
                            <span className="post-user-username">
                                @{comment?.username}
                            </span>
                        </div>
                        <div className="text__date__devider">
                            <span className="dot"> • </span>
                        </div>
                        <span className="comment__date">
                            {getDateFormat(comment?.createdAt)}
                        </span>
                    </div>
                    <div className="comment__content">{comment.comment}</div>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default PostComments;
