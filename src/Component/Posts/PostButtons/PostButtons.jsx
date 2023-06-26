import React from "react";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import { AuthContext } from "../../../context/AuthContext";

const PostButtons = ({ post }) => {
    const {
        users,
        bookmarks,
        handleLike,
        handleDisLike,
        handleDelete,
        handleBookmark,
        handleRemoveBookmark,
        handleFollowUser,
        handleUnFollowUser,
    } = useContext(DataContext);
    const { user } = useContext(AuthContext);

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
                <div>
                    {/* {console.log("bookmarks:", user?.bookmarks)} */}
                    {post?.likes.likedBy
                        .map((user) => user.username)
                        .includes(user?.username) ? (
                        <button onClick={() => handleDisLike(post)}>
                            <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                            {post?.likes.likeCount > 0 ? (
                                <span>{post?.likes.likeCount}</span>
                            ) : (
                                <React.Fragment></React.Fragment>
                            )}
                        </button>
                    ) : (
                        <button
                            className="like-btn"
                            onClick={() => handleLike(post)}
                        >
                            <i className="fa fa-heart-o" aria-hidden="true"></i>{" "}
                            {post?.likes.likeCount > 0 ? (
                                <span>{post?.likes.likeCount}</span>
                            ) : (
                                <React.Fragment></React.Fragment>
                            )}
                        </button>
                    )}
                    {/* Like Button section ends*/}
                    {/* Comment Button section starts*/}

                    <button
                        className="comment-btn"
                        // onClick={() => handleAddComment()}
                    >
                        <i className="fa fa-comment-o" aria-hidden="true">
                            {"  "}
                            {post?.comments?.length}
                        </i>
                    </button>
                    {/* Comment Button section ends*/}
                    {/* Bookmark Button section starts*/}
                    {/* {console.log(user?.bookmarks)} */}
                    {bookmarks.includes(post._id) ? (
                        <button
                            className="bookmark-btn"
                            onClick={() => handleRemoveBookmark(post)}
                        >
                            <i
                                className="fa fa-bookmark"
                                aria-hidden="true"
                            ></i>
                        </button>
                    ) : (
                        <button
                            className="bookmark-btn"
                            onClick={() => handleBookmark(post)}
                        >
                            <i
                                className="fa fa-bookmark-o"
                                aria-hidden="true"
                            ></i>
                        </button>
                    )}

                    {/* Bookmark Button section ends*/}
                </div>
                <div>
                    {user?.username === post.username ? (
                        <div>
                            <button className="edit-btn">Edit</button>
                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(post)}
                            >
                                Delete
                            </button>
                        </div>
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
