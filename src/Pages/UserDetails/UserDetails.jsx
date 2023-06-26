import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./UserDetails.css";
import Navigation from "../../Component/Navigation/Navigation";
import SuggUsers from "../../Component/SuggUsers/SuggUsers";
import { getUserDetails } from "../../Services/Services";
import { DataContext } from "../../context/DataContext";
import Post from "../../Component/Posts/Post/Post";
import { AuthContext } from "../../context/AuthContext";

const UserDetails = () => {
    const { posts, users, handleFollowUser, handleUnFollowUser } =
        useContext(DataContext);
    const { userName } = useParams();
    const [userPostsDetails, setUserPostsDetails] = useState([]);

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const fetchUserDetails = async () => {
        const result = await getUserDetails(userName);
        // console.log("fetchUserDetails result", result);
        setUserPostsDetails(result.data.posts);
    };

    // user who is currently logged in
    const getLoggedInUser = () => {
        if (users) {
            try {
                const loggInUser = users.filter(
                    (selectedUser) => selectedUser.username === user.username
                );
                return loggInUser;
            } catch (error) {
                console.log(error);
            }
        }
    };

    const loggedInUser = getLoggedInUser();

    const followingUsers = loggedInUser[0]?.following.map(
        (user) => user.username
    );

    const userObject = users?.find((user) => user.username === userName);

    useEffect(() => {
        fetchUserDetails();
    }, [posts]);

    return (
        <div className="profile__page__container">
            <Navigation />
            <div className="profile__page__main__container">
                <header className="user__header">
                    <i
                        className="fa fa-arrow-left left__arrow"
                        aria-hidden="true"
                        onClick={() => navigate(-1)}
                    ></i>
                    <div className="user__details__heading">
                        <h3 className="user__fullname">
                            {userObject?.fullName}
                        </h3>
                        <span>
                            {userPostsDetails.length === 1
                                ? `${userPostsDetails.length} post`
                                : `${userPostsDetails.length} posts`}{" "}
                        </span>
                    </div>
                </header>

                <section className="user__profile__heading">
                    <div className="user__profile__img">
                        <img
                            src={userObject?.profilePhoto}
                            alt="profile-photo"
                        />
                    </div>
                    <div className="user__profile__texts">
                        <div className="user__1st__sec">
                            <div className="user__fullname__details">
                                <h3 className="user__fullname">
                                    {userObject?.fullName}
                                </h3>
                                <span>@{userObject?.username}</span>
                            </div>

                            {userObject.username === user.username ? (
                                <div>
                                    <button>Edit</button>
                                </div>
                            ) : followingUsers.includes(userObject.username) ? (
                                <div>
                                    <button
                                        onClick={() =>
                                            handleUnFollowUser(userObject)
                                        }
                                    >
                                        UnFollow
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        className="follow_btn"
                                        onClick={() =>
                                            handleFollowUser(userObject)
                                        }
                                    >
                                        Follow
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="user__2st__sec">
                            <span>{userObject?.bio}</span>
                            <div>
                                <span>
                                    <i
                                        className="fa fa-globe"
                                        aria-hidden="true"
                                    ></i>
                                    <a
                                        href={userObject?.website_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {userObject?.website_link}
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div className="user__3st__sec">
                            <span>{`${userObject.following.length} following`}</span>
                            <span>{`${userObject.followers.length} followers`}</span>
                        </div>
                    </div>
                </section>

                {userPostsDetails.map((post) => (
                    <Post post={post} />
                ))}
            </div>

            <SuggUsers />
        </div>
    );
};

export default UserDetails;
