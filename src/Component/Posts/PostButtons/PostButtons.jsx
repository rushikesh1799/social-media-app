import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import { AuthContext } from "../../../context/AuthContext";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import "./PostButtons.css";

const DotsMenu = ({ post }) => {
    const { handleDelete } = useContext(DataContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={(event) => handleClick(event)}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem>
                    <BasicModal post={post} setAnchorEl={setAnchorEl} />
                </MenuItem>
                <MenuItem>
                    <span
                        className="delete-btn"
                        onClick={() => {
                            handleDelete(post);
                            handleClose();
                        }}
                    >
                        DELETE
                    </span>
                </MenuItem>
            </Menu>
        </div>
    );
};

const BasicModal = ({ setAnchorEl, post }) => {
    const { handleEditPost } = useContext(DataContext);
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

    const [updatedPost, setUpdatedPost] = useState({});

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
        setUpdatedPost(post);
    };
    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    return (
        <div className="DotsMenu__container">
            <span className="edit-btn" onClick={handleOpen}>
                EDIT
            </span>
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
                        Edit Post
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <p>
                            <textarea
                                style={{
                                    width: "90%",
                                    outline: "0",
                                }}
                                type="text"
                                value={updatedPost.content}
                                onChange={(e) =>
                                    setUpdatedPost({
                                        ...updatedPost,
                                        content: e.target.value,
                                    })
                                }
                            />
                        </p>
                    </Typography>
                    <Button onClick={handleClose}>Discard</Button>
                    <Button
                        onClick={() => {
                            handleEditPost(updatedPost);
                            handleClose();
                        }}
                    >
                        Update
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

const PostButtons = ({ post }) => {
    // useEffect(() => {
    //     console.log("updatedPost", updatedPost);
    // }, [updatedPost]);

    const {
        users,
        bookmarks,
        handleEditPost,
        handleLike,
        handleDisLike,
        handleDelete,
        handleBookmark,
        handleRemoveBookmark,
        handleFollowUser,
        handleUnFollowUser,
    } = useContext(DataContext);
    const { user } = useContext(AuthContext);

    // useEffect(() => {
    //     console.log("user", user);
    // }, [user]);

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

    // console.log("getLoggedInUser", );

    // const loggInUser = users?.filter(
    //     (selectedUser) => selectedUser.username === user.username
    // );

    const getFollowedAccDetails = (username) =>
        users.find((user) => user.username === username);

    // console.log(getFollowedAccDetails("pravin1"));
    // const flag = loggInUser[0].following
    //     .map((user) => user.username)
    //     .includes("pravin1");

    // console.log(post);
    // console.log("loggInUser", loggInUser);

    return (
        <div>
            <div className="post-btns">
                {/* Like Button section starts*/}
                {post && (
                    <div className="post-three-btns">
                        {post?.likes.likedBy
                            .map((user) => user.username)
                            .includes(user?.username) ? (
                            <div
                                className="like-btn"
                                onClick={() => handleDisLike(post)}
                            >
                                <i
                                    className="fa fa-heart fa-lg"
                                    aria-hidden="true"
                                ></i>{" "}
                                {post?.likes.likeCount > 0 ? (
                                    <span>{post?.likes.likeCount}</span>
                                ) : (
                                    <React.Fragment></React.Fragment>
                                )}
                            </div>
                        ) : (
                            <div
                                className="like-btn"
                                onClick={() => handleLike(post)}
                            >
                                <i
                                    className="fa fa-heart-o fa-lg"
                                    aria-hidden="true"
                                ></i>{" "}
                                {post?.likes.likeCount > 0 ? (
                                    <span>{post?.likes.likeCount}</span>
                                ) : (
                                    <React.Fragment></React.Fragment>
                                )}
                            </div>
                        )}
                        {/* Like Button section ends*/}
                        {/* Comment Button section starts*/}

                        <div
                            className="comment-btn"
                            // onClick={() => handleAddComment()}
                        >
                            <i
                                className="fa fa-comment-o fa-lg"
                                aria-hidden="true"
                            >
                                {"  "}
                                {post?.comments?.length}
                            </i>
                        </div>
                        {/* Comment Button section ends*/}
                        {/* Bookmark Button section starts*/}
                        {/* {console.log(user?.bookmarks)} */}
                        {bookmarks.includes(post._id) ? (
                            <div
                                className="bookmark-btn"
                                onClick={() => handleRemoveBookmark(post)}
                            >
                                <i
                                    className="fa fa-bookmark fa-lg"
                                    aria-hidden="true"
                                ></i>
                            </div>
                        ) : (
                            <div
                                className="bookmark-btn"
                                onClick={() => handleBookmark(post)}
                            >
                                <i
                                    className="fa fa-bookmark-o fa-lg"
                                    aria-hidden="true"
                                ></i>
                            </div>
                        )}

                        {/* Bookmark Button section ends*/}
                    </div>
                )}

                <div>
                    {user.username === post.username ? (
                        <DotsMenu post={post} />
                    ) : loggedInUser[0]?.following
                          .map((user) => user.username)
                          .includes(post.username) ? (
                        <div>
                            <button
                                onClick={() =>
                                    handleUnFollowUser(
                                        getFollowedAccDetails(post.username)
                                    )
                                }
                            >
                                UnFollow
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button
                                onClick={() =>
                                    handleFollowUser(
                                        getFollowedAccDetails(post.username)
                                    )
                                }
                            >
                                Follow
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostButtons;
