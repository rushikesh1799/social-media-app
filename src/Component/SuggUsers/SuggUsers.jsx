import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import "./SuggUsers.css";

const SuggUsers = () => {
    const { users, handleFollowUser } = useContext(DataContext);

    return (
        <div className="sugg-user-main-container">
            <h2>Suggested Users</h2>
            {users.map((user) => (
                <div key={user.id} className="sugg-user-container">
                    <div className="sugg-user-photo">
                        <img
                            src={user.profilePhoto}
                            alt="profile-pic"
                            className="profile-photo"
                        />
                    </div>
                    <div className="user-info">
                        <span>{user.firstName + " " + user.lastName}</span>{" "}
                        <span>@{user.username}</span>
                    </div>
                    <span>
                        <button onClick={() => handleFollowUser(user._id)}>
                            Follow+
                        </button>
                    </span>
                </div>
            ))}
        </div>
    );
};

export default SuggUsers;
