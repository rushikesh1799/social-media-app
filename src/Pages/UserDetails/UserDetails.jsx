import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./UserDetails.css";
import Navigation from "../../Component/Navigation/Navigation";
import SuggUsers from "../../Component/SuggUsers/SuggUsers";
import { getUserDetails } from "../../Services/Services";
import { DataContext } from "../../context/DataContext";
import Post from "../../Component/Posts/Post/Post";
import { AuthContext } from "../../context/AuthContext";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const UserDetails = () => {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const {
        posts,
        users,
        handleFollowUser,
        handleUnFollowUser,
        handleEditUserDetails,
    } = useContext(DataContext);
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
                const loggInUser = users.find(
                    (selectedUser) => selectedUser.username === user.username
                );
                return loggInUser;
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getUserObject = () => {
        if (users) {
            try {
                const userObject = users.find(
                    (user) => user.username === userName
                );
                return userObject;
            } catch (error) {
                console.log(error);
            }
        }
    };

    const loggedInUser = getLoggedInUser();

    // console.log(loggedInUser)

    const followingUsers =
        loggedInUser && loggedInUser.following.map((user) => user.username);

    const userObject = getUserObject();

    const [updatedUserDetails, setUpdatedUserDetails] = useState({});

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
        setUpdatedUserDetails(loggedInUser);
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetchUserDetails();
    }, [posts]);

    // useEffect(() => {
    //     console.log("updatedUserDetails", updatedUserDetails);
    // }, [updatedUserDetails]);

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
                    <img
                        className="user__profile__img"
                        src={userObject?.profilePhoto}
                        alt="profile-photo"
                    />
                    {userObject && (
                        <div className="user__profile__texts">
                            <div className="user__1st__sec">
                                <div className="user__fullname__details">
                                    <h3 className="user__fullname">
                                        {userObject.fullName}
                                    </h3>
                                    <span>@{userObject.username}</span>
                                </div>

                                {userObject.username === user.username ? (
                                    <div>
                                        <Button onClick={handleOpen}>
                                            Edit
                                        </Button>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <Typography
                                                    id="modal-modal-title"
                                                    variant="h6"
                                                    component="h2"
                                                >
                                                    Edit Profile
                                                </Typography>
                                                <Typography
                                                    id="modal-modal-description"
                                                    sx={{ mt: 2 }}
                                                    component="div"
                                                >
                                                    <div>
                                                        <label htmlFor="name">
                                                            <div>Name</div>
                                                            <input
                                                                type="text"
                                                                id="name"
                                                                value={
                                                                    updatedUserDetails.fullName
                                                                }
                                                                onChange={(e) =>
                                                                    setUpdatedUserDetails(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            fullName:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        })
                                                                    )
                                                                }
                                                            />
                                                        </label>
                                                        <label htmlFor="bio">
                                                            <div>Bio</div>
                                                            <input
                                                                type="text"
                                                                id="bio"
                                                                value={
                                                                    updatedUserDetails.bio
                                                                }
                                                                onChange={(e) =>
                                                                    setUpdatedUserDetails(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            bio: e
                                                                                .target
                                                                                .value,
                                                                        })
                                                                    )
                                                                }
                                                            />
                                                        </label>
                                                        <label htmlFor="website">
                                                            <div>Website</div>
                                                            <input
                                                                type="text"
                                                                id="website"
                                                                value={
                                                                    updatedUserDetails.website_link
                                                                }
                                                                onChange={(e) =>
                                                                    setUpdatedUserDetails(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            website_link:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        })
                                                                    )
                                                                }
                                                            />
                                                        </label>
                                                    </div>
                                                </Typography>
                                                <Button onClick={handleClose}>
                                                    Discard
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        handleEditUserDetails(
                                                            updatedUserDetails
                                                        );
                                                        handleClose();
                                                    }}
                                                >
                                                    Update
                                                </Button>
                                            </Box>
                                        </Modal>
                                    </div>
                                ) : followingUsers &&
                                  followingUsers.includes(
                                      userObject.username
                                  ) ? (
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
                                <span>
                                    {userPostsDetails.length === 1
                                        ? `${userPostsDetails.length} Post`
                                        : `${userPostsDetails.length} Posts`}{" "}
                                </span>
                                <span>{`${userObject.following.length} Following`}</span>
                                <span>{`${userObject.followers.length} Followers`}</span>
                            </div>
                        </div>
                    )}
                </section>

                {userPostsDetails.map((post) => (
                    <Post post={post} key={post._id} />
                ))}
            </div>

            <SuggUsers />
        </div>
    );
};

export default UserDetails;
