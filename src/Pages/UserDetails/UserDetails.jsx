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
import Header from "../../Component/Header/Header";

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

    const [currentEditPhoto, setCurrentEditPhoto] = useState(user.profilePhoto);

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

    // console.log("currentEditPhoto", currentEditPhoto);

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
    }, [posts, userName]);

    const young_man_avatar =
        "https://www.vhv.rs/dpng/d/426-4263064_circle-avatar-png-picture-circle-avatar-image-png.png";
    const young_woman_avatar =
        "https://cdn-icons-png.flaticon.com/512/780/780248.png?w=740&t=st=1688360623~exp=1688361223~hmac=890153032313510d77baa08998bd740659dd73256031a10cd613c0dde79faf32";
    const young__boy__avatar =
        "https://cdn-icons-png.flaticon.com/512/163/163812.png?w=740&t=st=1688360714~exp=1688361314~hmac=98805adc5001adef0666c2abd851fbb9faae44cdd8c51d13266fef95b0447128";
    const young__girl__avatar =
        "https://cdn-icons-png.flaticon.com/512/1154/1154435.png?w=740&t=st=1688360790~exp=1688361390~hmac=60029e2b370aa738f69bfc814a7db6b4ae6b6b09f8cd7d5a8017f25339f81c9c";

    // useEffect(() => {
    //     console.log("updatedUserDetails", updatedUserDetails);
    // }, [updatedUserDetails]);

    return (
        <div>
            <Header />
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
                                {userObject?.firstName} {userObject?.lastName}
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
                                            {userObject?.firstName}{" "}
                                            {userObject?.lastName}
                                        </h3>
                                        <span>@{userObject.username}</span>
                                    </div>

                                    {userObject.username === user.username ? (
                                        <div>
                                            <Button
                                                style={{
                                                    cursor: "pointer",
                                                    border: "none",
                                                    color: "#000",
                                                    fontWeight: "600",
                                                    borderRadius: "1.5rem",
                                                    padding: "0.6rem 1.2rem",
                                                }}
                                                onClick={handleOpen}
                                            >
                                                Edit Profile
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
                                                            <div className="edit__profile__img__container">
                                                                <img
                                                                    className="user__edit__profile__photo"
                                                                    src={
                                                                        currentEditPhoto
                                                                    }
                                                                    alt="user-photo"
                                                                />
                                                            </div>
                                                            <div className="avatars-section">
                                                                <p>
                                                                    Choose a
                                                                    picture from
                                                                    existing
                                                                    avatars
                                                                </p>
                                                                <div class="avatar-container">
                                                                    <div>
                                                                        <img
                                                                            className="avatar-img"
                                                                            src={
                                                                                young_man_avatar
                                                                            }
                                                                            onClick={() => {
                                                                                setCurrentEditPhoto(
                                                                                    young_man_avatar
                                                                                );
                                                                                setUpdatedUserDetails(
                                                                                    (
                                                                                        prev
                                                                                    ) => ({
                                                                                        ...prev,
                                                                                        profilePhoto:
                                                                                            young_man_avatar,
                                                                                    })
                                                                                );
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <img
                                                                            className="avatar-img"
                                                                            src={
                                                                                young_woman_avatar
                                                                            }
                                                                            onClick={() => {
                                                                                setCurrentEditPhoto(
                                                                                    young_woman_avatar
                                                                                );
                                                                                setUpdatedUserDetails(
                                                                                    (
                                                                                        prev
                                                                                    ) => ({
                                                                                        ...prev,
                                                                                        profilePhoto:
                                                                                            young_woman_avatar,
                                                                                    })
                                                                                );
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <img
                                                                            className="avatar-img"
                                                                            src={
                                                                                young__boy__avatar
                                                                            }
                                                                            onClick={() => {
                                                                                setCurrentEditPhoto(
                                                                                    young__boy__avatar
                                                                                );
                                                                                setUpdatedUserDetails(
                                                                                    (
                                                                                        prev
                                                                                    ) => ({
                                                                                        ...prev,
                                                                                        profilePhoto:
                                                                                            young__boy__avatar,
                                                                                    })
                                                                                );
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <img
                                                                            className="avatar-img"
                                                                            src={
                                                                                young__girl__avatar
                                                                            }
                                                                            onClick={() => {
                                                                                setCurrentEditPhoto(
                                                                                    young__girl__avatar
                                                                                );
                                                                                setUpdatedUserDetails(
                                                                                    (
                                                                                        prev
                                                                                    ) => ({
                                                                                        ...prev,
                                                                                        profilePhoto:
                                                                                            young__girl__avatar,
                                                                                    })
                                                                                );
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <label htmlFor="name">
                                                                <div>
                                                                    First Name:
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    id="name"
                                                                    value={
                                                                        updatedUserDetails.firstName
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setUpdatedUserDetails(
                                                                            (
                                                                                prev
                                                                            ) => ({
                                                                                ...prev,
                                                                                firstName:
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                            })
                                                                        )
                                                                    }
                                                                />
                                                            </label>
                                                            <label htmlFor="name">
                                                                <div>
                                                                    Last Name:
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    id="name"
                                                                    value={
                                                                        updatedUserDetails.lastName
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setUpdatedUserDetails(
                                                                            (
                                                                                prev
                                                                            ) => ({
                                                                                ...prev,
                                                                                lastName:
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
                                                                    onChange={(
                                                                        e
                                                                    ) =>
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
                                                                <div>
                                                                    Website
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    id="website"
                                                                    value={
                                                                        updatedUserDetails.website_link
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
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
                                                    <Button
                                                        onClick={handleClose}
                                                    >
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
                                                    handleUnFollowUser(
                                                        userObject
                                                    )
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
        </div>
    );
};

export default UserDetails;
