import React, { useContext } from "react";
import { v4 as uuid } from "uuid";

import "./NewComment.css";
import { useState } from "react";
import { useEffect } from "react";
import { DataContext } from "../../../context/DataContext";

const NewComment = ({ user, CurrentPost }) => {
    const [newCommentText, setNewCommentText] = useState("");

    const { users, handlePostComment } = useContext(DataContext);

    const getLoggedInUser = () => {
        if (users) {
            try {
                const loggInUser = users.find(
                    (selectedUser) => selectedUser.username === user.username
                );
                return loggInUser;
            } catch (error) {
                console.log(error);
            }
        }
    };

    const loggedInUser = getLoggedInUser();

    return (
        <div className="new__comment__container">
            <div className="sugg-user-photo">
                <img
                    src={loggedInUser?.profilePhoto}
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
                    onClick={(e) => {
                        handlePostComment(e, CurrentPost, newCommentText);
                        setNewCommentText("");
                    }}
                    disabled={newCommentText.length != 0 ? false : true}
                >
                    Post
                </button>
            </form>
        </div>
    );
};

export default NewComment;
