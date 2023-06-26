import React, { useContext } from "react";
import { v4 as uuid } from "uuid";

import "./NewComment.css";
import { useState } from "react";
import { useEffect } from "react";
import { DataContext } from "../../../context/DataContext";

const NewComment = ({ user, CurrentPost }) => {
    const [newCommentText, setNewCommentText] = useState("");

    const { posts, dispatch, handlePostComment } = useContext(DataContext);

    // useEffect(() => {
    //     console.log(newCommentText);
    // }, [newCommentText]);

    const handleNewComment = (e, newComment) => {
        e.preventDefault();
        const newCommentObj = {
            ...user,
            _id: uuid(),
            profileAvatar: user.profilePhoto,
            comment: newComment,
        };
        const UpdatedPosts = posts.map((post) =>
            post._id === CurrentPost._id
                ? {
                      ...post,
                      comments: [...post.comments, { ...newCommentObj }],
                  }
                : post
        );
        console.log(UpdatedPosts);
        dispatch({ type: "ADD_COMMENT", payload: { posts: UpdatedPosts } });
        setNewCommentText("");
    };

    return (
        <div className="new__comment__container">
            <div className="sugg-user-photo">
                <img
                    src={user?.profilePhoto}
                    alt="profile-pic"
                    className="profile-photo"
                />
            </div>
            <form
                // onSubmit={(e) => handlePostComment(e, newCommentText)}

                className="new__comment__form"
            >
                <input
                    type="text"
                    required
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                />
                <button
                    onClick={(e) =>
                        handlePostComment(e, CurrentPost, newCommentText)
                    }
                    disabled={newCommentText.length != 0 ? false : true}
                >
                    Post
                </button>
            </form>
        </div>
    );
};

export default NewComment;
