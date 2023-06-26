import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import "./SuggUsers.css";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const SuggUsers = () => {
    const { users, handleFollowUser, handleGetSelectedUser } =
        useContext(DataContext);

    const { user } = useContext(AuthContext);

    // all users excluding the the user who is logged in
    const filteredUsers = users.filter(
        (selectedUser) => selectedUser.username !== user?.username
    );

    // user who is currently logged in
    const loggInUser = users.filter(
        (selectedUser) => selectedUser.username === user?.username
    );

    // array of all the usernames who are being followed by the user who is logged in
    const followedUsernames = loggInUser[0]?.following.map(
        (user) => user.username
    );

    // array of users who are still not in following array of logged in user
    const moreFilteredUsers = filteredUsers.filter(
        (user) => !followedUsernames?.includes(user.username)
    );

    return (
        <div className="sugg-user-main-container">
            <span className="sugg_users_header">Suggested Users</span>
            <hr />
            {moreFilteredUsers.map((user) => (
                <div key={user.id} className="sugg-user-container">
                    <div
                        className="sugg-user-details"
                        onClick={() => handleGetSelectedUser(user)}
                    >
                        <div className="sugg-user-photo">
                            <img
                                src={user.profilePhoto}
                                alt="profile-pic"
                                className="sugg__users__profile__photo"
                            />
                        </div>
                        <div className="user-info">
                            <span>{user.firstName + " " + user.lastName}</span>{" "}
                            <span>@{user.username}</span>
                        </div>
                    </div>

                    <div>
                        <button
                            className="follow_btn"
                            onClick={() => handleFollowUser(user)}
                        >
                            Follow{" "}
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SuggUsers;
