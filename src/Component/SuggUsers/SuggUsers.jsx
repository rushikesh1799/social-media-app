import React, { useContext, useEffect } from "react";
import { DataContext } from "../../context/DataContext";

import "./SuggUsers.css";

const SuggUsers = () => {
    const { users } = useContext(DataContext);

    // console.log(users);

    return (
        <div>
            <h2>Suggested Users</h2>
            {users.map((user) => (
                <div key={user.id} className="sugg-user-container">
                    <div>
                        <img
                            src={user.profilePhoto}
                            alt="profile-pic"
                            className="profile-photo"
                        />
                    </div>
                    <div className="user">
                        <span>{user.firstName + " " + user.lastName}</span>{" "}
                        <span>@{user.username}</span>
                    </div>
                    <span>
                        <button>Follow+</button>
                    </span>
                </div>
            ))}
        </div>
    );
};

export default SuggUsers;
