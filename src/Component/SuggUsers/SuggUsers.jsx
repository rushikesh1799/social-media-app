import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import "./SuggUsers.css";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const SuggUsers = () => {
    const { users, handleFollowUser } = useContext(DataContext);

    const { user } = useContext(AuthContext);

    const filteredUsers = users?.filter(
        (selectedUser) => selectedUser._id !== user._id
    );

    // useEffect(() => {
    //     console.log("users:", users);
    // }, [users]);

    return (
        <div className="sugg-user-main-container">
            <span className="sugg_users_header">Suggested Users</span>
            <hr />
            {filteredUsers.map((user) => (
                <div key={user.id} className="sugg-user-container">
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
