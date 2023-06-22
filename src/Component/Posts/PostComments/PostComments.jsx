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

    const getDateFormat = (inputDate) =>
        new Date(inputDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

    return (
        <div className="comment__container">
            {post.comments.map((comment) => (
                <div className="comment__container" key={comment._id}>
                    <div className="post-user">
                        <div className="sugg-user-photo">
                            <img
                                src={comment.profileAvatar}
                                alt="profile-pic"
                                className="profile-photo"
                            />
                        </div>
                        <div className="post-user-details">
                            <span>{getFullName(comment?.username)}</span>
                            <span>@{comment?.username}</span>
                        </div>
                        <span>{getDateFormat(comment?.createdAt)}</span>
                    </div>
                    <div className="comment__content">{comment.comment}</div>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default PostComments;
